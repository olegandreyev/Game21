var Player = React.createClass({
    addCard: function (cb) {
        $(React.findDOMNode(this.refs.player)).makeCard(cb, 100)
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
    componentWillReceiveProps: function (props) {
        var self = this;
        if(this.props.card!= props.card) {
            this.props.cb(function () {
                $(React.findDOMNode(self.refs.card)).removeClass('player-card');
                $('.actions').removeClass('no-click');
            })
        }
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