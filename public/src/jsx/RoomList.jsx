
var AllRoomsStore = require('../stores/AllRoomsStore');
var MainPageActions = require('../actions/MainPageActions');

var RoomList = React.createClass({
    getInitialState: function () {
      return {rooms:AllRoomsStore.getRooms(),selectedRoom:0}
    },
    componentDidMount: function () {
        var self = this;
        AllRoomsStore.addChangeListener(function () {
            self.setState({rooms:AllRoomsStore.getRooms()})
        })
    },
    joinRoom : function (room) {
        if(room.players.length !== room.playersMaxCount) {
            var playerId = localStorage.getItem('id');
            var joiner = {
                playerId: playerId,
                roomId: room.id
            };
            MainPageActions.joinToRoom(joiner)
        }
    },
    render : function () {
        var self = this;
        var roomList = this.state.rooms.map(function (room, index) {
            var cls = index === self.state.selectedRoom? 'active':''
          return <tr onClick={self.joinRoom.bind(self, room)} key={room.id} className={cls}>
              <td>{room.title}</td>
              <td>{room.cards}</td>
              <td>{room.handsCount}</td>
              <td>{room.players.length}/{room.playersMaxCount}</td>
          </tr>
        });
       return (
               <div className='col-md-6 col-lg-6 col-sm-6'>
               <table className="table">
                   <thead>
                    <tr>
                        <th>Название</th>
                        <th>Кол-во карт</th>
                        <th>Кол-во раздач</th>
                        <th>Игроки</th>
                    </tr>
                   </thead>
                <tbody>
                {roomList}
                </tbody>
               </table>
                   </div>
       )
    }
})

module.exports = RoomList;