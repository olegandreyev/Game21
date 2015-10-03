
var RoomStore = require('../stores/RoomStore');
var RoomActions = require('../actions/RoomActions');

var Lobby = React.createClass({
    getInitialState: function () {
      return {room: RoomStore.getRoom()}
    },
    startGame: function () {
        var thisUserId = localStorage.getItem('id');
        var room = this.state.room;
        if(thisUserId == room.leader){
            RoomActions.startGame(room.id);
        }
    },
    componentDidMount : function () {
        var self = this;
        RoomStore.on('change', function () {
            self.setState({room:RoomStore.getRoom()})
        })
    },
    exit: function () {
        RoomActions.exitOfRoom(this.state.room.id);
    },
    render : function () {
        var room = this.state.room;
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
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">
                                Добро пожаловать в комнату <span className='room-title'>"{room.title}"</span>
                                </a>
                            </div>
                        </div>
                    </nav>
                <div className="row">
                    <div className="col-md-6 col-lg-6 col-sm-6">
                        <ul className="list-group users-lobby">
                            {players}
                        </ul>
                    </div>
                    <div className="col-md-6 col-lg-6 col-sm-6">
                    </div>
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