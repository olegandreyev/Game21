/**
 * Created by ой on 27.09.2015.
 */

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../js/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var rooms = [];
var AllRoomsStore = _.extend({},EventEmitter.prototype,{
    getRooms : function () {
        return rooms
    },
    filterRooms : function (filter) {
        rooms = rooms.filter(filter)
    },
    getRoomById : function (id) {
        return _.where(rooms, {id: id})[0]
    },
    emitChange : function () {
        this.emit('change')
    },
    addChangeListener : function (cb) {
        this.on('change',cb)
    }
});

AppDispatcher.register(function (payload) {
        var action = payload.action;
    switch (action){
            case AppConstants.SET_ROOMS:
                rooms = payload.data;
                break;
            default : return true;
        }
    AllRoomsStore.emitChange();
    return true;
})

module.exports = AllRoomsStore;