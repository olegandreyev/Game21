
var GameStore = require('../stores/GameStore');
var Player = require('./Player.jsx');
var GameActions = require('../actions/GameActions');
var PlayingTable = React.createClass({
    getInitialState: function () {
        return {
            game:GameStore.getGame()
        }
    },
    wantCard: function() {
        GameActions.wantCard();
    },
    componentDidMount : function () {
        var self = this;
        GameStore.addChangeListener(function () {
            self.setState({game:GameStore.getGame()})
        })
    },
    render : function () {
        var players = this.state.game.players.map(function (player, i) {
            return <Player player={player} pos={i}/>
        });
        return(
            <div>
           <div className="table-game size2">
            <div className="cards"></div>
               {players}
           </div>
        <div className="row">
            <div className="actions">
                <div onClick={this.wantCard} className="btn btn-info btn-lg">ЕЩЕ</div>
                <div  className="btn btn-danger btn-lg">ХВАТИТ</div>
            </div>

        </div>
            </div>

        )
    }
});

module.exports = PlayingTable;