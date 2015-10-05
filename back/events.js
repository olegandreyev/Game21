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
                if(Game)
                Game.removePlayerById(player.id).then(function () {
                    io.to(Game.id).emit('leavePlayer',{id:player.id});
                });
                var room = API.getRoomById(player.roomId);
                setTimeout(function () {
                    if (!player.connected) {
                        if (room) {
                            API.deleteUserFromRoom(room, player);
                            room.leader = room.players[0].id;
                            io.to(room.id).emit('changeRoomState', room)
                        }
                        API.deleteUserById(player.id);
                    }
                    io.emit('updateOnline', API.getUsers());
                    player = null;
                    Game = null;
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

        socket.on('sendRoomMessage', function (message) {
            var room = API.getRoomById(player.roomId) || API.getGameById(player.roomId);
            message.date = Date.now();
            room.chat.push(message);
            io.to(room.id).emit('updateRoomMessages', room.chat);
        });
        socket.on('joinRoom', function (joiner) {
            var room = API.getRoomById(joiner.roomId);
            player.roomId = room.id;
            room.players.push(player);
            socket.join(room.id);
            socket.emit('addUserInRoom', room);
            io.to(room.id).emit('changeRoomState', room);
            io.emit('updateRooms', API.getRooms());
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
                    Game = game;
                    emitNewGame(Game);
                    Game.initCards();
                    Game.shuffleCards();
                    initStartCards();
                })
        });

        socket.on('someoneAddCard', function (data) {
            if (!Game) {
                Game = API.getGameById(API.getUserById(data.id).roomId);
            }
            Game.players.forEach(function (player) {
                var cards = player.cards.map(function (card) {
                    if (player.id === data.id) {
                        return card;
                    } else {
                        return -1;
                    }
                });
                var points = player.id == data.id ? player.points : -1;
                io.sockets.connected[player.socketId].emit('updateUsersCards', {
                    id: data.id,
                    points: points,
                    cards: cards
                });
            })
        });

        socket.on('currPlayerAddCard', function (data) {
            var playerWhoTurn = Game.getPlayerById(data.id);
            Game.userWantsCard(data.id)
                .then(function (card) {
                    emitChangeCards(playerWhoTurn);
                }, function (card) {
                    emitChangeCards(playerWhoTurn)
                        .then(function () {
                            nextTurnOrEnd(playerWhoTurn);
                        })
                })
        });

        socket.on('currPlayerMissed', function (data) {
            var playerWhoTurn = Game.getPlayerById(data.id);

            nextTurnOrEnd(playerWhoTurn)
        });

        function nextTurnOrEnd(playerWhoTurn) {
            var thisPlayer = _.findIndex(Game.players, function (player) {
                return player.id == playerWhoTurn.id;
            });

            console.log(API.getGames());
            //bug here
            if (thisPlayer < Game.players.length - 1) {
                io.to(Game.id).emit('setCurrentPlayer', {userId: Game.players[++thisPlayer].id})
            } else {
                setTimeout(function () {
                    endGame();
                }, 1500)
            }
        }

        function endGame() {
            Game.setWinner()
                .then(function (winners) {
                    return new Promise(function (res, rej) {
                        io.to(Game.id).emit('setWinners', {winners: winners, game: Game})
                        setTimeout(function () {
                            res();
                        }, 8000)
                    })
                }, function (failAll) {
                    return new Promise(function (res, rej) {
                        io.to(Game.id).emit('setWinners', {winners: 'noWinners', game: Game});
                        setTimeout(function () {
                            res();
                        }, 8000)
                    })
                }).then(function () {
                    if (Game.handsCount == Game.currentHand) {
                        io.to(Game.id).emit('closeGame');
                        API.deleteGame(Game.id);
                        Game = null;
                    } else {
                        Game.newHand().then(function () {
                            return new Promise(function (res, rej) {
                                emitNewGame(Game);
                                res();
                            })
                        }).then(function () {
                            initStartCards();
                        })
                    }
                })
        }

        function emitNewGame(game){
            io.to(game.id).emit('startGame', {
                id: game.id,
                players: game.players,
                winners: false,
                maxPlayers:game.maxPlayers,
                currentPlayer: game.players[0].id,
                cardsCount: game.cardsCount
            });
        }

        function initStartCards() {
            Game.players.forEach(function (player) {
                Game.userWantsCard(player.id).then(function (card) {
                    io.sockets.connected[player.socketId].emit('addCard', {card: card})
                })
            });
        }

        function emitChangeCards(playerWhoTurn) {
            return new Promise(function (res, rej) {
                Game.players.forEach(function (player) {
                    var cards = playerWhoTurn.cards.map(function (card) {
                        if (player.id === playerWhoTurn.id) {
                            return card;
                        } else {
                            return -1;
                        }
                    });
                    var points = playerWhoTurn.id == player.id ? playerWhoTurn.points : -1;
                    io.sockets.connected[player.socketId].emit('updateUsersCards', {
                        id: playerWhoTurn.id,
                        points: points,
                        cards: cards
                    });
                });
                res();
            })
        }

    })
};


