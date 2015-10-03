/**
 * Created by ой on 24.09.2015.
 */

var _ = require('underscore');
var API = require('./api');
var Promise = require('bluebird');
module.exports = function (io) {
    io.on('connection', function (socket) {
        var player = null;

        io.emit('updateRooms', API.getRooms());
        io.emit('updateOnline', API.getUsers());
        io.emit('updateMessages', API.getMessages());

        socket.on('regUser', function (data) {
            player = API.createUser(data.nick, false, socket.id);
            API.addUser(player);
            socket.emit('newUser', {id: player.id});
            io.emit('updateOnline', API.getUsers());
        });

        socket.on('logIn', function (data) {
            player = API.getUserById(data.id);
            if (!player) {
                player = API.createUser(data.nick, data.id, socket.id);
                API.addUser(player);
            }
            var room = API.getRoomById(player.roomId);
            player.connected = true;
            player.socketId = socket.id;
            if (room) {
                socket.join(room.id);
                socket.emit('addUserInRoom', room);
            }
            io.emit('updateOnline', API.getUsers());
        });

        socket.on('disconnect', function () {
            if (player) {
                player.connected = false;
                var room = API.getRoomById(player.roomId);
                setTimeout(function () {
                    if (!player.connected) {
                        API.deleteUserById(player.id);
                        if (room) {
                            API.deleteUserFromRoom(room, player);
                            io.to(room.id).emit('changeRoomState', room)
                        }
                    }
                    io.emit('updateOnline', API.getUsers());
                    player = null;
                }, 10000)
            }
        });

        socket.on('sendMessage', function (message) {
            API.addGlobalMessage(message);
            io.emit('updateMessages', API.getMessages());
        });

        socket.on('createRoom', function (roomData) {
            var room = API.createRoom(roomData, player);
            io.emit('updateRooms', API.getRooms());
            socket.emit('leaderInLobby', room);
            socket.join(room.id);
        });

        socket.on('joinRoom', function (joiner) {
            var room = API.getRoomById(joiner.roomId);
            var player = API.getUserById(joiner.playerId);
            player.roomId = room.id;
            room.players.push(player);
            socket.join(room.id);
            socket.emit('addUserInRoom', room);
            io.to(room.id).emit('changeRoomState', room)
        });

        socket.on('exitOfRoom', function (data) {
            var room = API.getRoomById(data.roomId);
            var player = API.getUserById(data.userId);
            socket.leave(room.id);
            API.deleteUserFromRoom(room, player);
            io.to(room.id).emit('changeRoomState', room)
        });


        var Game = null;
        socket.on('startGame', function (data) {
            API.createGame(data.id)
                .then(function (game) {
                    return new Promise(function (res, rej) {
                        Game = game;
                        io.to(game.id).emit('startGame', {
                            id:game.id,
                            players:game.players,
                            winner:false,
                            currentUser:-1
                        });
                        game.initCards();
                        game.shuffleCards();
                        game.players.forEach(function (player) {
                            game.userWantsCard(player.id, function (card) {
                                io.sockets.connected[player.socketId].emit('addCard', {card:card})
                            })
                        });
                        res(player)
                    })
                }).then(function () {
                    io.to(Game.id).emit('setCurrentPlayer', {userId: player.id})
                })
        });

        socket.on('someoneAddCard', function (data) {
            if(!Game){
                Game = API.getGameById(API.getUserById(data.id).roomId);
            }
            Game.players.forEach(function (player) {
                var cards = player.cards.map(function (card) {
                    if(player.id === data.id){
                        return card;
                    }else{
                        return -1;
                    }
                });
                io.sockets.connected[player.socketId].emit('updateUsersCards',{id:data.id,cards:cards});
            })
        });

        socket.on('currPlayerAddCard', function (data) {
            var playerWhoWantedCard = Game.getPlayerById(data.id);
            Game.userWantsCard(data.id, function () {
                Game.players.forEach(function (player) {
                    var cards = playerWhoWantedCard.cards.map(function (card) {
                        if(player.id === playerWhoWantedCard.id){
                            return card;
                        }else{
                            return -1;
                        }
                    });
                    io.sockets.connected[player.socketId].emit('updateUsersCards',{id:data.id,cards:cards});
                })
            })
        })

    })
};


