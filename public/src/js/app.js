/**
 * Created by ой on 23.09.2015.
 */
window.React = require('react');
window.jQuery = window.$ = require('jquery');
window._ = require('underscore');

require('bootstrap');
window.Helpers = require('./helpers');
window.Router = require('react-router');
window.Route = Router.Route;
window.io = require('socket.io-client');
window.socket = io();
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


var App = require('../jsx/App.jsx');
var MainComponent = require('../jsx/MainComponent.jsx');
var GuestPage = require('../jsx/GuestPage.jsx');
var UserList = require('../jsx/UserList.jsx');
var RoomList = require('../jsx/RoomList.jsx');
var CreateRoom = require('../jsx/CreateRoom.jsx');
var Lobby = require('../jsx/Lobby.jsx');
var PlayingTable = require('../jsx/PlayingTable.jsx');

var routes = (
    <Route path='/' handler={App}>
        <Route path='noReg' handler={GuestPage}/>
        <Route path="mainPage" handler={MainComponent}>
            <Route path='userList' handler={UserList}/>
            <Route path='roomList' handler={RoomList}/>
            <Route path='createRoom' handler={CreateRoom}/>
        </Route>
        <Route path='lobby' handler={Lobby}/>
        <Route path='game' handler={PlayingTable}/>
    </Route>
);


$(document).ready(function () {
    Router.run(routes, Router.HashLocation, function (Root) {
        React.render(<Root/>, document.body);
    });
})


$.fn.makeCard = function (cb, delay) {
    $('.actions').addClass('no-click');
    var left = parseInt(this.css('left'));
    var top = parseInt(this.css('top'));
    if(this.get(0)) {
        var width = this.get(0).offsetWidth / 2;
        var height = this.get(0).offsetHeight / 2;
        var x = left + width;
        var y = top + height;

        var div = document.createElement('div');
        div = $(div);
        $('.table-game').append(div);
        div.addClass('fly');
        setTimeout(function () {
            div.css('left', x).css('top', y);
            setTimeout(function () {
                div.remove();
                cb();
            }, 1000)
        }, delay || 500)
    }
};