
var RoomStore = require('../stores/RoomStore');
var RoomActions = require('../actions/RoomActions');
var Chat = require('./Chat.jsx');
var AskToStartPopup = require('./Popups.jsx').AskToStartPopup;
var Lobby = React.createClass({
    getInitialState: function () {
      return {room: RoomStore.getRoom()}
    },
    confirmToStart: function (yes) {
        if(yes){
            RoomActions.startGame(this.state.room.id);
        }
        $('#answerPopup1').modal('hide');
    },
    startGame: function () {
        var room = this.state.room;

        var thisUserId = localStorage.getItem('id');
        if(thisUserId == room.leader){
            if(room.players.length !== room.playersMaxCount){
                $('#answerPopup1').modal('show');
            }else{
                RoomActions.startGame(room.id);
            }
        }
    },
    componentDidMount : function () {
        var self = this;
        RoomStore.addChangeListener( function () {
            self.setState({room:RoomStore.getRoom()})
        })
    },
    exit: function () {
        RoomActions.exitOfRoom(this.state.room.id);
    },
    render : function () {
        var room = this.state.room;
        var titleGame = room.cards == 36 ?"Очко":"Black Jack";
        var thisUserId = localStorage.getItem('id');
        if(room.players) {
            var players = room.players.map(function (player,i) {
                var isLeader = player.id == room.leader;
                return <li key={i} className={"list-group-item"}>{player.nick} {isLeader ?
                    <div className='leader'></div> : ''}</li>
            });
        }
        return (
            <div className="container-fluid">
                <AskToStartPopup cb={this.confirmToStart} />
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">
                                Добро пожаловать в комнату
                                <span className='room-title'>"{room.title}"  </span>
                                Раздачи: <span className='room-title'> {room.handsCount}</span>
                                Игра:<span className='room-title'>{titleGame}</span>
                                </a>
                            </div>
                        </div>
                    </nav>
                <p className="navbar-text navbar-right">Чатик комнаты<span className='glyphicon glyphicon-comment'></span></p>
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                        <p>Игроки {room.players.length}/{room.playersMaxCount}</p>
                        <ul className="list-group users-lobby">
                            {players}
                        </ul>
                    </div>
                        <Chat actions={RoomActions} store={RoomStore} />
                </div>
                <div className="row actions-lobby">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                        <div onClick={this.exit} className="btn btn-danger"><span className='glyphicon glyphicon-arrow-left'></span> Выйти из комнаты</div>
                        <div onClick={this.startGame} className={"btn btn-success "+(thisUserId !== room.leader ? 'disabled':'')}>
                            Начать игру
                            <span className='glyphicon glyphicon-thumbs-up'></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

module.exports = Lobby;