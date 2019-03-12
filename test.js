var request = require('request');
var express = require("express");
var validation = require("validator");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/emailForm2.html');
});


/* Form will redirect here with Input data */
app.post('/', function(req, res) {


    // Set the headers
    var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    var data = {
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'message': req.body.message,
            'email': req.body.email,
            'number': req.body.number,
            'consultation': true,
            'service': req.body.service
        }
        // Configure the request
    var options = {
        url: 'http://localhost:5000/contacts',
        method: 'POST',
        headers: headers,
        form: data
    }

    // Start the request
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        }
    })

});



app.listen(5100, function() {
    console.log("Listening at PORT 5100");
});