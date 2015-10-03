/**
 * Created by ой on 28.09.2015.
 */
var Helpers = {
    formatDate: function (ms) {
        var date = new Date(ms),
            day = date.getDate(),
            month = date.getMonth() + 1,
            hours = date.getHours(),
            minutes = date.getMinutes();

        if(day < 10){
            day = '0'+day
        }
        if(month < 10){
            month = "0"+month
        }
        if(minutes < 10){
            minutes = "0"+minutes
        }
        if(hours < 10) {
            hours = "0"+hours
        }

        return day+"."+month+" "+hours+":"+minutes
    }
};

module.exports = Helpers;