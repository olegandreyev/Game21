/**
 * Created by ой on 02.10.2015.
 */
    var _ = require('underscore');
var Promise = require('bluebird');
var Game = function (id, players, cardsCount) {
    this.id = id;
    this.players = players;
    this.cards = [];
    this.cardsCount = cardsCount;
};

Game.prototype.initCards54 = function () {
    var arrCards = this.cards;
    for(var i = 0; i< 52;i++){
        arrCards.push(i);
    }
    return arrCards;
};
Game.prototype.initCards36 =  function () {
    var arrCards = this.cards;
    for(var i = 0;i<36;i++){
        arrCards.push(i);
    }
    return arrCards;
};
Game.prototype.shuffleCards = function () {
   this.cards = this.cards.sort(function () {
        return Math.random()*100 - Math.random()*100
    })
};
Game.prototype.getCard = function () {
    return this.cards.pop();
};
Game.prototype.initCards = function () {
    if(this.cardsCount == 36) {
        this.initCards36();
    }else{
        this.initCards54();
    }
};
Game.prototype.userWantsCard = function (id, cb) {
    var player = _.findWhere(this.players,{id:id});
    var card = this.getCard();
    player.points += card;
    player.cards.push(card);
    cb(card)
};
Game.prototype.getPlayerById = function (id) {
    return _.findWhere(this.players,{id:id})
};
module.exports = Game;