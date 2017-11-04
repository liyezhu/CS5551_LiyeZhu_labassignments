
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://liyezhu:caliburian@ds125255.mlab.com:25255/aselab9';
//var url = 'mongodb://marmik:2621@ds051923.mlab.com:51923/demo';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/add', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})

app.post('/view', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        find(db, req.body, function() {
            res.write("Successfully found");

            res.end();
        });
    });
})

app.post('/remove', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        remove(db, req.body, function() {
            res.write("Successfully removed");
            res.end();
        });
    });
})

var insertDocument = function(db, data, callback) {
        console.log(data)

        db.collection('lab9').insertOne(data, function (err, result) {
            if (err) {
                res.write("error");
                res.end();
            }
            console.log("Inserted a document into the collection.");
            callback();
        });

};

var find = function(db,data,callback) {
    var cursor = db.collection('lab9').find(data);
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("name:" + doc.name);
            console.log("address:" + doc.address);
            console.log("phone:" + doc.phone);

        }

    });
}

var remove = function(db,data,callback) {
    db.collection('lab9').remove(data, function (err, result) {
        if (err) {
            res.write("error");
            res.end();
        }
        console.log("removed successfully");
        callback();
    });
}

var server = app.listen(8081,function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})