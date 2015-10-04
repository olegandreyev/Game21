var GameStore = require('../stores/GameStore');

var Player = React.createClass({
    getInitialState: function () {
        return {showCards: 'player-card'}
    },
    componentDidMount : function () {
        var self = this;
        GameStore.addChangeListener(function () {
            if(GameStore.getGame().cards){
                self.setState({showCards:''})
            }else{
                self.setState({showCards:'player-card'})
            }
        })
    },
    addCard: function (cb,card) {
        $(React.findDOMNode(this.refs.player)).makeCard(cb,card, 100)
    },
    render: function () {
        var self = this;
        var player = this.props.player;
        var pos = this.props.pos;
        var cards = this.props.player.cards.map(function (card, i) {
            return <Card show={self.state.showCards} cb={self.addCard} card={card}/>
        });

        var points = player.points;
        var style ={};
        var pointSpan = '';
        if(points != -1 && points !=0){
            if(points > 21){
                points += " Перебор";
                style['color'] = 'red';
            }else if(points == 21){
                points+=" BlackJack";
                style['color'] = 'gold';
            }else{
                style['color'] = 'lightgrey';
            }
            pointSpan =  <span style={style}>{points}</span>;
        }

        return (
            <div ref='player' className={"player spot"+pos}>
                <div className="nick">
                    <span className='glyphicon glyphicon-user'></span>{player.nick} {pointSpan}</div>
                <div className={"player-cards "+(this.props.currentPlayer == player.id ? 'your-turn' :'')}>
                    {cards}
                </div>
            </div>
        )
    }
});

var Card = React.createClass({
    getCard: function () {
        var self = this;
        this.props.cb(function () {
            $(React.findDOMNode(self.refs.card)).removeClass('player-card');
            $('.actions').removeClass('no-click');
        }, this.getCardClass(this.props.card))
    },
    componentDidMount : function () {
        if(!GameStore.getGame().cards) {
            this.getCard();
        }
    },
    componentWillReceiveProps: function (props) {
        if(this.props.card!= props.card && !GameStore.getGame().cards) {
           this.getCard();
        }
    },
    getCardClass: function (cardCode) {
        var objCards = {
            0: 'club',
            1: 'diamond',
            2: 'heart',
            3: 'spade'
        };
        var mod = GameStore.getGame().cardsCount == 36 ? 9 : 13;
        return objCards[Math.floor(cardCode / mod)] + "_" + cardCode % mod;
    },
    render: function () {
        var card = this.props.card;
            return <div ref='card' className={this.props.show+" card "+(card !== -1 ? this.getCardClass(card): '')}></div>

    }
});

module.exports = Player;