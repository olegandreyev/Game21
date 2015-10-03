var UsersStore = require('../stores/UsersStore');
var UserList = React.createClass({
    getInitialState: function () {
        return {users:UsersStore.getUsers()}
    },
    componentDidMount : function () {
        var self = this;
        UsersStore.addChangeListener(function () {
            self.setState({users:UsersStore.getUsers()})
        })
    },
    render: function () {
        var users = this.state.users;
        var userList = users.map(function (user,i) {
            var status = user.connected ?'online':'offline';
            return (
                <li key={i} className="list-group-item">{i+1+".    "+user.nick} <div className={"status "+status}></div></li>
            )
        });
        return (
                <div className='col-lg-6 col-md-6 col-sm-6'>
                    <ul className="list-group">
                        {userList}
                    </ul>
                </div>
        )
    }
})

module.exports = UserList;