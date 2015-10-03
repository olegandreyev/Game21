/**
 * Created by ой on 27.09.2015.
 */

var AppDispatcher = require('../js/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');

var users = [];

function setList(list) {
    users = list;
}
var UsersStore = _.extend({}, EventEmitter.prototype, {
    getUsers : function () {
        return users;
    },
    getUserById : function (id) {
        return _.where(users,{id:id})[0]
    },
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }

});


AppDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action) {
        case  AppConstants.ONLINE_CHANGE:
            setList(payload.data);
            break;
        default:
            return true;
    }

    UsersStore.emitChange();
    return true;

});


module.exports = UsersStore;