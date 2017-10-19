
var express = require('express');
var app = express();
var request = require('request');
app.get('/getClassify', function (req, res) {
    var result={
        'venue': []
    };

    request('https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=RiI5dO1glGLc&text=today is a happy day.', function (error, response, body) {
        //Check for error
        if(error){
            return console.log('Error:', error);
        }

        //Check for right status code
        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        //All is good. Print the body
        body = JSON.parse(body);
        result.venue.push({
            'negative': body.negative,
            'positive':body.positive
        });
        res.contentType('application/json');
        res.write(JSON.stringify(result));
        res.end();
    });
    console.log(result);


})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})