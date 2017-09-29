const express = require('express');
const hbs = require('hbs');

const jobs = require(__dirname + '/jobs.js');

const PORT = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));

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


app.get('/', (request, response) => {
    jobs.fetchJobIDs().then((all_jobs) => {
        response.render('index.hbs', {
            all_jobs: all_jobs.JOBS
        });
    });
});


app.listen(PORT, () => {
    console.log(`* app started on ${PORT}`);
});

