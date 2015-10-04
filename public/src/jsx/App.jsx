var Router = require('react-router');

var App = React.createClass({
    componentDidMount : function () {
        if(!localStorage.getItem('nick') || !localStorage.getItem('id')){
            location.hash='#/noReg'
        }
        $(window).off('beforeunload');
    },
    render : function () {
      return  <div id="content">
            <Router.RouteHandler />
        </div>
    }
})
module.exports = App;