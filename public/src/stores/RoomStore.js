/**
 * Created by ПК on 27.09.2015.
 */
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var RoomConstants = require('../constants/RoomConstants');
var AppDispatcher = require('../js/AppDispatcher');


var createdRoom = {};
function createNewRoom(roomData) {
    createdRoom = roomData
}
var RoomStore = _.extend({},EventEmitter.prototype,{
    getRoom: function () {
        return createdRoom;
    },
    getMessages: function () {
      return createdRoom.chat;
    },
    setRoom : function (room) {
      createdRoom = room;
    },
    emitChange: function () {
        this.emit('change')
    },
    addChangeListener: function (cb) {
        this.on('change',cb)
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action) {
        case  AppConstants.CREATE_ROOM:
            createNewRoom(payload.data);
            break;
        case  RoomConstants.CHANGE_STATE:
            createNewRoom(payload.data);
            break;
        case RoomConstants.NEW_MESSAGE:
            if(payload.data.length > 0) {
                createdRoom.chat.push(payload.data[payload.data.length - 1]);
            }
            break;
        default:
            return true;
    }
    RoomStore.emitChange();
    return true;

});

module.exports = RoomStore;