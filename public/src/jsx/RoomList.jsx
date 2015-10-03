
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
    joinRoom : function (roomId) {
        var playerId = localStorage.getItem('id');
        var joiner = {
            playerId:playerId,
            roomId:roomId
        };
        MainPageActions.joinToRoom(joiner)
    },
    render : function () {
        var self = this;
        var roomList = this.state.rooms.map(function (room, index) {
            var cls = index === self.state.selectedRoom? 'active':''
          return <tr onClick={self.joinRoom.bind(self, room.id)} key={index} className={cls}>
              <td>{room.title}</td>
              <td>{room.cards}</td>
          </tr>
        });
       return (
               <div className='col-md-6 col-lg-6 col-sm-6'>
               <table className="table">
                   <thead>
                    <tr><th>Название</th><th>Кол-во карт</th></tr>
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