var GameStore = require('../stores/GameStore');
var Player = require('./Player.jsx');
var GameActions = require('../actions/GameActions');
var RoomStore = require('../stores/RoomStore');
var RoomActions = require('../actions/RoomActions');
var Chat = require('./Chat.jsx');
var PlayingTable = React.createClass({
    getInitialState: function () {
        $(window).on('beforeunload', function () {
            return "Если вы обновите страницу вас выкенет из комнаты и ваше место займет бот";
        });
        return {
            game: GameStore.getGame(),
            thisPlayer: localStorage.getItem('id')
        }
    },
    wantCard: function () {
        GameActions.wantCard(this.state.thisPlayer);
    },
    nextTurn: function () {
        GameActions.nextTurn(this.state.thisPlayer);
    },
    componentWillUnmount: function () {
        $(window).off('beforeunload');
    },
    componentDidMount: function () {
        var self = this;
        GameStore.addChangeListener(function () {
            self.setState({game: GameStore.getGame()})
        })
    },
    toggleChat: function () {
        $('.chat').toggleClass('show');
    },
    render: function () {
        var game = this.state.game;
        var cardsCount = game.cardsCount || 36;
        var thisPlayer = this.state.thisPlayer;
        var currentPlayer = game.currentPlayer;
        if (currentPlayer != -1) {
            try {
                var currentPlayerNick = _.findWhere(this.state.game.players, {id: currentPlayer}).nick || '';
            } catch (e) {
                location.hash = '#/mainPage/userList'
            }
        }

        var players = game.players.map(function (player, i) {
            return <Player currentPlayer={currentPlayer} player={player} pos={i}/>
        });


        var actions;
        if (thisPlayer == currentPlayer) {
            actions = (
                <div className="actions">
                    <div className='no-turn'>Ваш ход <strong>{currentPlayerNick}!</strong></div>
                    <div onClick={this.wantCard} className="btn btn-info btn-lg">ЕЩЕ</div>
                    <div onClick={this.nextTurn} className="btn btn-danger btn-lg">ХВАТИТ</div>
                </div>
            )
        } else if (currentPlayer != -1) {
            actions = (
                <div className="actions">
                    <div className='no-turn'>Ход игрока: <strong>{currentPlayerNick}!</strong></div>
                </div>
            )
        } else if (game.winners == 'noWinners') {
            actions = (
                <div className="actions">
                    <div className='no-turn'>Все проиграли!</div>
                </div>
            )
        } else {
            var winners = game.winners.map(function (player) {
                return <div className='winner'>{player.nick}</div>
            });
            actions = <div className='actions'>
                <div className='no-turn'>Победители:</div>
                {winners}
            </div>
        }

        return (
            <div className={'cardsCount'+cardsCount}>
                <div className="table-game size2">
                    <div className="cards"></div>
                    {players}
                </div>
                {actions}
                <div className='chat-wrapper'>
                   <div className='btn btn-info chat-shower' onClick={this.toggleChat}>
                       <span className='glyphicon glyphicon-comment'>
                   </span>
                   </div>
                    <Chat size='5' actions={RoomActions} store={RoomStore}/>
                </div>
            </div>

        )
    }
});

module.exports = PlayingTable;