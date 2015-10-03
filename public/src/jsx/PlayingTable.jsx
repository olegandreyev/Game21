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
            return <Player player={player} pos={i}/>
        });
        return (
            <div>
                <div className="table-game size2">
                    <div className="cards"></div>
                    {players}
                </div>
                <div className="actions">
                    <div hidden={thisPlayer != currentPlayer} onClick={this.wantCard} className="btn btn-info btn-lg">ЕЩЕ</div>
                    <div hidden={thisPlayer != currentPlayer} className="btn btn-danger btn-lg">ХВАТИТ</div>
                    <div hidden={thisPlayer == currentPlayer} >Ходит игрок:{currentPlayerNick}</div>
                </div>
            </div>

        )
    }
});

module.exports = PlayingTable;