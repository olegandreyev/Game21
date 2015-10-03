/**
 * Created by ПК on 28.09.2015.
 */
var ChatActions = require('../actions/ChatActions');
var ChatStore = require('../stores/GlobalChatStore');
var Chat = React.createClass({
    getInitialState: function () {
        return {messages: ChatStore.getMessages(), message: ''}
    },
    handleChange: function (e) {
        this.setState({message: e.target.value})
    },
    sendMessage: function (e) {
        e.preventDefault();
        if(this.state.message) {
            ChatActions.sendMessage(this.state.message);
            this.setState({message: ''})
        }
    },
    componentDidMount: function () {
        var self = this;
            ChatStore.on('change', function () {
                self.setState({messages: ChatStore.getMessages()});
                var chat = $('#chat').get(0);
                if(localStorage.getItem('id') && chat) {
                    chat.scrollTop = chat.scrollHeight;
                }
            });

    },
    render: function () {
        var userID = localStorage.getItem('id');
        var messages = this.state.messages.map(function (message,i) {
            var yourMessageStyle = message.id === userID ? 'alert-info your-message' :'alert-success';
            return <div key={i} className={"alert message "+yourMessageStyle} role="alert">
                <strong>{message.nick+"  "}</strong> <span className='time'>[{Helpers.formatDate(message.date)}]</span>
                <br/>
                {message.message}
            </div>
        });
        return (
            <div className='col-md-6 col-lg-6 col-sm-6'>
                <div id='chat' className="messages">{messages}</div>
                <div className="row input">
                    <div className='col-md-9 col-lg-9 col-sm-9'>
                        <form className="form" onSubmit={this.sendMessage}>
                            <div className="form-group">
                                <input value={this.state.message} onChange={this.handleChange} type="text"
                                       className="form-control" placeholder="Введите сообщение"/>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-3 col-lg-3 col-sm-3'>
                        <button onClick={this.sendMessage} className='btn btn-primary'>Отправить</button>
                    </div>
                </div>

            </div>
        )
    }
});

module.exports = Chat;