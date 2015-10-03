/**
 * Created by ой on 29.09.2015.
 */

var AppDispatcher = require('../js/AppDispatcher');
var RoomConstants = require('../constants/RoomConstants');
var RoomActions = {
    changeRoomState: function (room) {
       AppDispatcher.dispatch({
           action:RoomConstants.CHANGE_STATE,
           data:room
       });
    },
    exitOfRoom : function (roomId) {
        var userId = localStorage.getItem('id');
        socket.emit('exitOfRoom',{userId:userId,roomId:roomId});
        location.hash = '#/mainPage/userList'
    },
    startGame: function (id) {
        socket.emit('startGame',{id:id})
    }
};

module.exports = RoomActions;