/**
 * Created by ой on 28.09.2015.
 */

var AppDispatcher =require('../js/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;

var messages = [];

var ChatStore = _.extend({},EventEmitter.prototype,{
    getMessages : function () {
        return messages;
    },
    emitChange : function () {
      this.emit('change')
    },
    addChangeListener: function (cb) {
        this.on('change',cb)
    },
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch(action){
        case AppConstants.SET_MESSAGES:
            if(payload.data.length > 0) {
                messages.push(payload.data[payload.data.length - 1]);
            }
            break;
        default:return true
    }
    ChatStore.emitChange();
    return true;
})

module.exports = ChatStore;