/**
 * Created by �� on 03.10.2015.
 */

var keyMirror = require('react/lib/keyMirror');

var GameConstants = keyMirror({
    ADD_CARD : null,
    INIT_GAME:null,
    UPDATE_CARDS:null,
    SET_CURRENT_PLAYER:null,
    SET_WINNERS:null,
    SET_BOT:null,
    DELETE_PLAYER:null
});

module.exports = GameConstants;