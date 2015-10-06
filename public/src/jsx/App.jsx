var Router = require('react-router');

var EndGamePopup = require('./Popups.jsx').EndPopup;

var App = React.createClass({
    componentDidMount: function () {
        if (!localStorage.getItem('nick') || !localStorage.getItem('id')) {
            location.hash = '#/noReg'
        }
        $(window).off('beforeunload');
    },
    render: function () {
        return <div id="content">
            <EndGamePopup />
            <Router.RouteHandler />
        </div>
    }
})
module.exports = App;