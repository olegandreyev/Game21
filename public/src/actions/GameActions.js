/**
 * Created by ой on 03.10.2015.
 */

var AppDispatcher = require('../js/AppDispatcher');
var GameConstants = require('../constants/GameConstants');
var GameActions = {
    addCard: function (card,id) {
        socket.emit('someoneAddCard',{id:id,card:card})
    },
    initGame : function (data) {
        AppDispatcher.dispatch({
            action:GameConstants.INIT_GAME,
            data:data
        })
    },
    wantCard: function (id) {
        socket.emit('currPlayerAddCard',{id:id})
    },
    setBot : function (id) {
      AppDispatcher.dispatch({
          action:GameConstants.SET_BOT,
          data:id
      })
    },
    updateCards : function (data) {
        AppDispatcher.dispatch({
            action:GameConstants.UPDATE_CARDS,
            data:data
        })
    },
    setCurrentPlayer: function (data) {
        AppDispatcher.dispatch({
            action:GameConstants.SET_CURRENT_PLAYER,
            data:data.userId
        })
    },
    nextTurn : function (id) {
        socket.emit('currPlayerMissed',{id:id})
    },
    setWinners: function (data) {
        AppDispatcher.dispatch({
            action:GameConstants.SET_WINNERS,
            data:data
        })
    },
    deletePlayer: function (id) {
        AppDispatcher.dispatch({
            action:GameConstants.DELETE_PLAYER,
            data:id
        })
    }
};

module.exports = GameActions;