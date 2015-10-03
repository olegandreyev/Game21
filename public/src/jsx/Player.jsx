var Player = React.createClass({
    addCard: function (cb) {
        $(React.findDOMNode(this.refs.player)).makeCard(cb, 500)
    },
    render: function () {
        var self = this;
        var player = this.props.player;
        var pos = this.props.pos;
        var cards = this.props.player.cards.map(function (card, i) {
            return <Card cb={self.addCard} card={card}/>
        });
        return (
            <div ref='player' className={"player spot"+pos}>
                <div className="nick">
                    <span className='glyphicon glyphicon-user'></span>{player.nick}</div>
                <div className="player-cards">
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