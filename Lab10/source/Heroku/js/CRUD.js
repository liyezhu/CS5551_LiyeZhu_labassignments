
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://liyezhu:caliburian@ds125255.mlab.com:25255/aselab9';
var findUser = function(db, callback) {
    var cursor =db.collection('usertable').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    });
};
var findUserwithName = function(db,callback) {
    var cursor = db.collection('uertable').find({"fname":"Sidrah"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name:" + doc.fname);
            console.log("Last Name:" + doc.lname);
            console.log("city:" + doc.address.city);
        }
    });
}
var findUserwithUniversity = function(db, callback) {
    var cursor = db.collection('usertable').find({"education.university":"UMKC"});
    cursor.each(function(err,doc){
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name:" + doc.fname);
            console.log("University:" + doc.education.university);
            console.log("Degree:" + doc.education.degree);
            console.log("Major:" + doc.education.major);
            console.log("mail:" + doc.mail);
        }
    });
}

var findUserwithMajor = function(db, callback) {
    var cursor = db.collection('usertable').find({"education.degree":"Master of Science","education.major":"Computer Science"});
    cursor.each(function(err,doc){
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name:" + doc.fname);
            console.log("Last Name:" + doc.lname);

        }
    });
}

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findUserwithMajor(db, function() {
        db.close();
    });
});