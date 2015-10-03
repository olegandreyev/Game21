/**
 * Created by ой on 27.09.2015.
 */
var AppDispatcher = require('../js/AppDispatcher');
var AppConstants = require('../constants/AppConstants')

var MainPageActions = {
    changeOnline: function(userList){
        AppDispatcher.dispatch({
            action: AppConstants.ONLINE_CHANGE,
            data: userList
        });
    },
    createRoom : function (roomData) {
        socket.emit('createRoom',{room:roomData});
    },
    joinToRoom : function (joiner) {
        socket.emit('joinRoom',joiner);
    },
    redirectToRoom: function (room) {
        AppDispatcher.dispatch({
            action: AppConstants.CREATE_ROOM,
            data:room
        });
        location.hash ='#/lobby'
    },
    setRooms : function (rooms) {
        AppDispatcher.dispatch({
            action: AppConstants.SET_ROOMS,
            data:rooms
        })
    }
};


module.exports = MainPageActions;