const axios = require('axios');

const _BASE_URL = 'https://hacker-news.firebaseio.com/v0/';
const JOB_URL = _BASE_URL + '/item/';

var JOBS = new Array();

var fetchJob = (urls) => {
    return new Promise( (resolve, reject) => {
        axios.all(urls).
        then((jobs) => {
            jobs.forEach((job) => {
                JOBS.push(job['data']);
            });
            resolve();
        }).
        catch((error) => {
            console.log(error);
            reject('Server error');
        });
    })
};


var createJobRequest = (id) => {
    var url = JOB_URL + id + '.json';
    return axios.get(url, {
        params: {
            print: 'pretty'
        }
    });
};


var fetchJobIDs = () => {
    return new Promise ((resolve, reject) => {
        var jobIDs;
        axios.get(_BASE_URL + 'jobstories.json', {
            params: {
                print: 'pretty'
            }
        }).

        then((response) => {
            var jobs_urls = new Array();
            jobIDs = response['data'];

            for (var i = 0; i < jobIDs.length; i++) {
                jobs_urls.push(createJobRequest(jobIDs[i]));
            }

            fetchJob(jobs_urls).then(() => {
                resolve({JOBS});
            });
        }).

        catch((error) => {
            console.log(error);
            reject('Server error');
        });
    });
};


module.exports = {
    fetchJobIDs
}
