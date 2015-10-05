/**
 * Created by ой on 30.09.2015.
 */


var onlineUsers = [];
var globalMessages = [];
var rooms = [];
var games = [];
var _ = require('underscore');
var Game= require('./game');
var Promise = require('bluebird');

var API = {
    getUserById : function (id) {
        return _.findWhere(onlineUsers, {id: id});
    },
    createUser : function (nick, id, sId) {
        return {
            socketId:sId,
            nick: nick,
            id: id || Date.now() + Math.random().toString(36),
            connected: true
        };
    },
    addUser: function (player) {
        onlineUsers.push(player);
    },
    getUsers : function () {
        return onlineUsers;
    },
    getRoomById : function (id) {
        return _.findWhere(rooms, {id: id});
    },
    deleteUserById : function (id) {
        onlineUsers = _.filter(onlineUsers, function (user) {
            return user.id !== id;
        });
    },
    deleteUserFromRoom : function (room, player) {
        room.players = _.filter(room.players, function (onlinePlayer) {
            return player.id != onlinePlayer.id;
        });
       return delete player.roomId;
    },
    addGlobalMessage : function (message) {
        message.date = Date.now();
        globalMessages.push(message);
    },
    getMessages : function () {
        return globalMessages;
    },
    createRoom : function (roomData, leader) {
       var room = roomData.room;
        room.id = Date.now() + (room.cards / Math.random() * 33).toFixed();
        leader.roomId = room.id;
        room.players = [leader];
        room.chat = [];
        rooms.push(room);
        return room;
    },
    getRooms : function () {
        return rooms;
    },
    deleteRoomById : function (id) {
      rooms = _.filter(rooms, function (room) {
          return room.id != id;
      })
    },
    createGame: function (id) {
        var self = this;
        return new Promise(function (resolve, reject) {
            var room = self.getRoomById(id);
            self.deleteRoomById(id);
            room.players = room.players.map(function (player) {
                player.points = 0;
                player.cards = [];
                player.isBot = false;
                return player;
            });
            var createdGame = new Game(room.id, room.players, room.cards, room.chat, room.handsCount,room.playersMaxCount);
            games.push(createdGame);
            resolve(createdGame);
        })
    },
    getGameById : function (id) {
        return _.findWhere(games,{id:id})
    }
};

module.exports = API;