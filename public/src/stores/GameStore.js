/**
 * Created by ой on 03.10.2015.
 */

var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../js/AppDispatcher');
var GameConstants = require('../constants/GameConstants');

var game = {};

function setGameState(state){
    game = state;
}


var GameStore = _.extend({}, EventEmitter.prototype, {
    addChangeListener: function (cb) {
        this.on('change', cb)
    },
    removeChangeListener: function (cb) {
        this.removeListener('change', cb)
    },
    emitChange : function () {
        this.emit('change')
    },
    getGame: function () {
        return game;
    }

});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch(action){
        case GameConstants.INIT_GAME:
            setGameState(payload.data);
            break;
        case GameConstants.UPDATE_CARDS:
            var id = payload.data.id;
            var cards = payload.data.cards;
            var points = payload.data.points;
            var player = _.findWhere(game.players,{id:id});
            player.cards = cards;
            player.points = points;
            break;
        case GameConstants.SET_CURRENT_PLAYER:
            game.currentPlayer = payload.data;
            break;
        case GameConstants.SET_WINNERS:
            game = payload.data.game;
            game.winners = payload.data.winners;
            game.currentPlayer = -1;
            break;
        case GameConstants.SET_BOT:
           id = payload.data;
           player = _.findWhere(game.players,{id:id});
            player.isBot = true;
            break;
        default : return true;
    }
    GameStore.emitChange();
    return true;
});

module.exports = GameStore;