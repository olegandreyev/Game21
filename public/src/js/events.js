/**
 * Created by ой on 08.10.2015.
 */

var MainPageActions = require('../actions/MainPageActions');
var ChatActions = require('../actions/ChatActions');
var RoomActions = require('../actions/RoomActions');
var GameActions = require('../actions/GameActions');

socket.on('connect', function () {
    var id = localStorage.getItem('id');
    var nick = localStorage.getItem('nick');
    if (id && nick) {
        socket.emit('logIn', {id: id, nick: nick});
    }
});

socket.on('newUser', function (data) {
    localStorage.setItem('id', data.id)
});

socket.on('updateOnline', function (users) {
    MainPageActions.changeOnline(users)
});

socket.on('updateMessages', function (messages) {
    ChatActions.setMessages(messages)
});

socket.on('updateRooms', function (rooms) {
    MainPageActions.setRooms(rooms)
});

socket.on('leaderInLobby', function (room) {
    MainPageActions.redirectToRoom(room);
});
socket.on('addUserInRoom', function (room) {
    MainPageActions.redirectToRoom(room);
});
socket.on('changeRoomState', function (room) {
    RoomActions.changeRoomState(room);
});

socket.on('startGame', function (game) {
    location.hash = '#/game';
    GameActions.initGame(game);
});

socket.on('addCard', function (data) {
    var id = localStorage.getItem('id');
    GameActions.addCard(data.card, id);
});

socket.on('setCurrentPlayer', function (user) {
    GameActions.setCurrentPlayer(user);
})

socket.on('updateUsersCards', function (data) {
    GameActions.updateCards(data)
});

socket.on('setWinners', function (data) {
    GameActions.setWinners(data);
});
socket.on('updateRoomMessages', function (messages) {
    console.log(messages,'fdfdf');
    RoomActions.setMessages(messages);
})
socket.on('playerBot', function (data) {
    GameActions.setBot(data.id);
})

socket.on('closeGame', function () {
    $('#myModal').modal('show');
});

socket.on('leavePlayer', function (data) {
    GameActions.deletePlayer(data.id)
})
