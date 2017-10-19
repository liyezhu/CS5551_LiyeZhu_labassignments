
var express = require('express');
var app = express();
var request = require('request');
app.get('/getVideo', function (req, res) {
    var result={
        'venue': []
    };

    request('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBRXn4UDfXu2OT7OnshOvc1NRoBhO7fzLY&part=snippet&maxResults=5&q=kansas city', function (error, response, body) {
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
        var ven = body.items;
        for(var i=0;i<5;i++)
        {
            result.venue.push({
                'videoId': ven[i].id.videoId,
                'title': ven[i].snippet.title,
                'description': ven[i].snippet.description
            });
        }
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