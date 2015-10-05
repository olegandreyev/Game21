/**
 * Created by ой on 02.10.2015.
 */
    var _ = require('underscore');
var Promise = require('bluebird');
var Game = function (id, players, cardsCount, chat, handsCount,maxPlayers) {
    this.id = id;
    this.players = players;
    this.maxPlayers = maxPlayers;
    this.cards = [];
    this.cardsCount = cardsCount;
    this.chat = chat;
    this.handsCount = handsCount;
    this.currentHand = 0;
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
   this.cards = _.shuffle(this.cards)
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
Game.prototype.userWantsCard = function (id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        var player = _.findWhere(self.players,{id:id});
        var card = self.getCard();
        player.points += self.getPoints(card);
        player.cards.push(card);
        if(player.points < 21) {
            resolve(card)
        }else{
            if(player.points == 22 && player.cards.length == 2){
                player.points--;
            }
            reject(card)
        }
    })

};

Game.prototype.removePlayerById = function (id) {
    var self = this;
    return new Promise(function (resolve, reject) {
        self.players = _.filter(self.players, function (player) {
            return  player.id != id;
        })
        resolve();
    })

};
Game.prototype.getPoints = function (card) {
    if(this.cardsCount === 36){
        card = card % 9;
        return this.points36[card];
    }else {
        card = card % 13;
        return this.points54[card];
    }
};

Game.prototype.points36 = {
    0:6, 1:7, 2:8, 3:9, 4:10, 5:2, 6:3, 7:4, 8:11
};
Game.prototype.points54 = {
    0:2,1:3,2:4,3:5,4:6,5:7,6:8,7:9,8:10,9:2,10:3,11:4,12:11
};

Game.prototype.setWinner = function () {
    var self = this;
    return new Promise(function (res, rej) {
        var winners = [];
        self.currentHand++;
        var filteredPlayers = self.players.filter(function (player) {
            return player.points <= 21;
        });
        if(filteredPlayers.length == 0){
            rej(false);
        }else {
            filteredPlayers = filteredPlayers.sort(function (player1, player2) {
                return player1.points - player2.points;
            });
            var max = filteredPlayers[filteredPlayers.length - 1].points;
            filteredPlayers.forEach(function (player) {
                if (player.points == max) {
                    winners.push(player)
                }
            });
            res(winners)
        }
    });
};
Game.prototype.clearCards = function () {
    this.cards = [];
};
Game.prototype.newHand = function () {
    var self = this;
    return new Promise(function (res, rej) {
        self.clearCards();
        self.initCards();
        self.shuffleCards();
        self.players = self.players.map(function (player) {
            player.cards = [];
            player.points = 0;
            return player;
        });
        self.winners = false;

        res()
    })
}


Game.prototype.getPlayerById = function (id) {
    return _.findWhere(this.players,{id:id})
};
module.exports = Game;