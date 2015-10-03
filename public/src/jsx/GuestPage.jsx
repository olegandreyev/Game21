var GuestPage = React.createClass({
    getInitialState: function () {
      return {nick:''}
    },
    handleChange: function (e) {
        var nick = e.target.value;
        this.setState({nick:nick})
    },
    regUser : function () {
        var nick = this.state.nick;
        localStorage.setItem('nick',nick);
        socket.emit('regUser',{nick:nick});
        location.hash ="#/mainPage/userList"
    },
    render : function () {
        return (
            <div>
                <input value={this.state.nick} onChange={this.handleChange} type="text" placeholder="Введите имя" className="enterName"/>
                <button onClick={this.regUser}>Зайти в игру</button>
            </div>
        )
    }
})
module.exports = GuestPage;