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
    },
    sendMessage: function (text) {
        var message = {
            id:localStorage.getItem('id'),
            nick:localStorage.getItem('nick'),
            message:text
        };
        socket.emit('sendRoomMessage',message);
    },
    setMessages: function (messages) {
        AppDispatcher.dispatch({
            action:RoomConstants.NEW_MESSAGE,
            data:messages
        });
    }
};

module.exports = RoomActions;