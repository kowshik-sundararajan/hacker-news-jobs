const hbs = require('hbs');

hbs.registerHelper('list', function(size, items) {
    var out = '';
    for(var i = 0; i < size; i++)
        out += items.fn(i);
    console.log(items)
    return out;
});

hbs.registerHelper('inc', function(num) {
    return parseInt(num + 1);
});

hbs.registerHelper('convert', function(time) {
    var date = new Date(time * 1000);
    console.log(time);
    var datestring = date.getDate()  + "/" + (date.getMonth()+1);
    return datestring;
});
