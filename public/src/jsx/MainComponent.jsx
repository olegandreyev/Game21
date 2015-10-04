var Router = require('react-router');
var Chat = require('./Chat.jsx');
var ChatActions = require('../actions/ChatActions');
var ChatStore = require('../stores/GlobalChatStore');
var MainComponent = React.createClass({
    getInitialState: function () {
        return {activeTab: 0}
    },
    selectTab: function (index) {
        this.setState({activeTab: index})
    },
    render: function () {
        return (
            <div>
                <div className="jumbotron header">
                    <div className="container">
                        <h1>Black Jack</h1>

                        <p>Создай комнату и начни играть уже сейчас!!</p>

                        <p><a className="btn btn-primary btn-lg" href="#/mainPage/createRoom" role="button">Начать играть!</a></p>
                    </div>
                </div>
                <div className='navbar'>
                    <ul className="nav navbar-nav">
                        <li role="presentation" onClick={this.selectTab.bind(this,0)}
                            className={this.state.activeTab == 0?'active':''}>
                            <a href="#/mainPage/userList">Игроки на сайте</a>
                        </li>
                        <li role="presentation" onClick={this.selectTab.bind(this,1)}
                            className={this.state.activeTab == 1?'active':''}>
                            <a href="#/mainPage/roomList">Свободные комнаты</a>
                        </li>
                        <li role="presentation" onClick={this.selectTab.bind(this,2)}
                            className={this.state.activeTab == 2?'active':''}>
                            <a href="#/mainPage/createRoom">Создать комнату</a>
                        </li>
                    </ul>
                    <p className="navbar-text navbar-right global-chat">Чатик <span className='glyphicon glyphicon-comment'></span></p>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <Router.RouteHandler/>
                        <Chat actions={ChatActions} store={ChatStore}/>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = MainComponent;