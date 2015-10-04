var GameStore = require('../stores/GameStore');
var Player = require('./Player.jsx');
var GameActions = require('../actions/GameActions');
var PlayingTable = React.createClass({
    getInitialState: function () {
        return {
            game: GameStore.getGame(),
            thisPlayer: localStorage.getItem('id')
        }
    },
    wantCard: function () {
        GameActions.wantCard();
    },
    componentDidMount: function () {
        var self = this;
        GameStore.addChangeListener(function () {
            self.setState({game: GameStore.getGame()})
        })
    },
    render: function () {
        var thisPlayer = this.state.thisPlayer;
        var currentPlayer = GameStore.getGame().currentPlayer;
        var currentPlayerNick = _.findWhere(this.state.game.players,{id:currentPlayer}).nick || '';
        var players = this.state.game.players.map(function (player, i) {
            return <Player currentPlayer={currentPlayer} player={player} pos={i}/>
        });

        var actions = thisPlayer == currentPlayer ? (
            <div className="actions">
                <div className='no-turn'>Ваш ход <strong>{currentPlayerNick}!</strong></div>
                <div  onClick={this.wantCard} className="btn btn-info btn-lg">ЕЩЕ</div>
                <div className="btn btn-danger btn-lg">ХВАТИТ</div>
            </div>
        ):(
            <div className="actions">
                <div className='no-turn'>Ход игрока: <strong>{currentPlayerNick}!</strong></div>
            </div>
        );

        return (
            <div>
                <div className="table-game size2">
                    <div className="cards"></div>
                    {players}
                </div>
                {actions}
            </div>

        )
    }
});

module.exports = PlayingTable;