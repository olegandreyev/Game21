
var MainPageActions = require('../actions/MainPageActions');

var CreateRoom = React.createClass({
    getInitialState : function () {
      return {title:'',cards:36,playersCount:2,handsCount:1}
    },
    handleSelect : function (e) {
      this.setState({cards:+e.target.value})
    },
    handleSelect2 : function (e) {
        this.setState({playersCount:+e.target.value})
    },
    handleSelect3 : function (e) {
        this.setState({handsCount:+e.target.value})
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
        room.playersMaxCount = this.state.playersCount;
        room.handsCount = this.state.handsCount;
        MainPageActions.createRoom(room)
    },
    render: function () {
        return (
                    <div  className="col-md-6 col-lg-6 col-sm-6 create-room-form">
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
                        <select value={this.state.cards} onChange={this.handleSelect} className='form-control' id="cardsCnt">
                            <option default value="36">36</option>
                            <option value="54">54</option>
                        </select>
                        <label htmlFor="playersCnt">Количество игроков: </label>
                        <select value={this.state.playersCount} onChange={this.handleSelect2} className='form-control' id="playersCnt">
                            <option default value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <label htmlFor="handsCnt">Кол-во раздач: </label>
                        <select value={this.state.handsCount} onChange={this.handleSelect3} className='form-control' id="handsCnt">
                            <option default value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="100500">Безлимит</option>
                        </select>
                    </div>
                    <button onClick={this.createRoom} className="btn btn-default">Создать комнату</button>
                </form>
                    </div>
        )
    }
});
module.exports = CreateRoom;