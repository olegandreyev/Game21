var Player = React.createClass({
    getInitialState: function () {
      return {player:this.props.player,pos:this.props.pos}
    },
    addCard: function (cb) {
        $(React.findDOMNode(this.refs.player)).makeCard(cb, 500)
    },
    componentWillReceiveProps: function (props) {
        this.setState({player:props.player,pos:props.pos})
    },
    render: function () {
        var self = this;
        var player = this.state.player;
        var pos = this.state.pos;
        var cards = this.state.player.cards.map(function (card, i) {
            return <Card key={i} cb={self.addCard} card={card}/>
        });
        return (
            <div ref='player' className={"player spot"+pos}>
                <div className="nick">
                    <span className='glyphicon glyphicon-user'></span>{player.nick}</div>
                <div className={"player-cards "+(this.props.currentPlayer == player.id ? 'your-turn' :'')}>
                    {cards}
                </div>
            </div>
        )
    }
});

var Card = React.createClass({
    componentDidMount : function () {
        var self = this;
        this.props.cb(function () {
            $(React.findDOMNode(self.refs.card)).removeClass('player-card');
            $('.actions').removeClass('no-click');
        })
    },
    getCardClass: function (cardCode) {
        var objCards = {
            0: 'club',
            1: 'diamond',
            2: 'heart',
            3: 'spade'
        };
        return objCards[Math.floor(cardCode / 13)] + "_" + cardCode % 13;
    },
    render: function () {
        var card = this.props.card;
            return <div ref='card' className={"player-card card "+(card !== -1 ? this.getCardClass(card): '')}></div>

    }
});

module.exports = Player;