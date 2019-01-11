
function parse(date) {
    year = ((date - (date%10000)) / 10000).toString()
    month = (((date%10000) - (date%100)) / 100).toString()
    day = (date%100).toString()
    if (month.length < 2) {
        month = "0" + month
    }
    if (day.length < 2) {
        day = "0" + day
    }
    result = year + "-" + month + "-" + day
    return (new Date(result) / 1000).toString()
}


function translateDate(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }


module.exports = {
    parse: parse,
    translateDate: translateDate
}
