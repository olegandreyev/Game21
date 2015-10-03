/**
 * Created by ой on 30.09.2015.
 */
var AppDispatcher = require('../js/AppDispatcher');
var EventEmitter = require('events').EventEmitter;


var roomMessages = [];

var RoomChatStore = _.extend({},EventEmitter.prototype,{
    getMessages : function () {
        return roomMessages;
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

module.exports = RoomChatStore;
