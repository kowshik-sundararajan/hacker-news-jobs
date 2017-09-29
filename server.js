const express = require('express');

const jobs = require(__dirname + '/jobs.js');
const middleware = require(__dirname + '/middleware.js');

const PORT = process.env.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));


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

