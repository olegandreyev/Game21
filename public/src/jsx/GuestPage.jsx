var GuestPage = React.createClass({
    getInitialState: function () {
        return {nick: ''}
    },
    handleChange: function (e) {
        var nick = e.target.value;
        this.setState({nick: nick})
    },
    regUser: function (e) {
        if(e){
            e.preventDefault();
        }
        var nick = this.state.nick;
        if(nick) {
            localStorage.setItem('nick', nick);
            socket.emit('regUser', {nick: nick});
            location.hash = "#/mainPage/userList"
        }
    },
    render: function () {
        return (
            <div className='auth-wrapper'>
                <div className='auth-img'></div>
                <form onSubmit={this.regUser} className='form'>
                    <input className='form-control' value={this.state.nick} onChange={this.handleChange} type="text"
                           placeholder="Введите имя" required/>
                </form>
                <button type='submit' className='btn btn-primary' onClick={this.regUser}>Зайти в игру</button>
            </div>
        )
    }
})
module.exports = GuestPage;