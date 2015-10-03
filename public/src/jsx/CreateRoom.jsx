
var MainPageActions = require('../actions/MainPageActions');

var CreateRoom = React.createClass({
    getInitialState : function () {
      return {title:'',cards:36}
    },
    handleSelect : function (e) {
      this.setState({cards:+e.target.value})
    },
    handleTitle : function (e) {
        this.setState({title:e.target.value})
    },
    createRoom: function (e) {
        e.preventDefault();
       var room = {};
        room.title = this.state.title;
        room.cards = this.state.cards;
        room.leader = localStorage.getItem('id');
        MainPageActions.createRoom(room)
    },
    render: function () {
        return (
                    <div className="col-md-6 col-lg-6 col-sm-6">
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Название комнаты:</label>
                        <input onChange={this.handleTitle}
                               value={this.state.title}
                               type="text" className="form-control" id="title"
                               placeholder="Название комнаты"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardsCnt">Колода карт: </label>
                        <select value={this.state.value} onChange={this.handleSelect} className='form-control' id="cardsCnt">
                            <option default value="36">36</option>
                            <option value="54">54</option>
                        </select>
                    </div>
                    <button onClick={this.createRoom} className="btn btn-default">Создать комнату</button>
                </form>
                    </div>
        )
    }
});
module.exports = CreateRoom;