const express = require('express');
const bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/** 
// Connecting to the Message Queue system
amqp.connect(mqConfig.url, function(err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'hello';
        var msg = 'Hello World!';

        ch.assertQueue(q, { durable: false });
        ch.sendToQueue(q, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        conn.close();
        process.exit(0)
    }, 500);
});

**/

// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to Contact service. Creating a new contact. Organise and and store cusotmer contact details." });
});

require('./app/routes/contact.routes.js')(app);

// listen for requests
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});