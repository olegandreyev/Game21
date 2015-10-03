/**
 * Created by ой on 28.09.2015.
 */
var AppDispatcher = require('../js/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ChatActions = {
  sendMessage: function (text) {
      var message = {
          id:localStorage.getItem('id'),
          nick:localStorage.getItem('nick'),
          message:text
      };
      socket.emit('sendMessage',message);
  },
    setMessages : function (messages) {
        AppDispatcher.dispatch({
            action :AppConstants.SET_MESSAGES,
            data:messages
        })
    }
};
module.exports = ChatActions;