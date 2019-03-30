const Contact = require('../models/contact.model.js');
const statusUpdate = require('../Enums/enum.js');

var amqp = require('amqplib/callback_api');

var rest = require('rest-facade');

// Create and Save a new Contact
exports.create = (req, res) => {
    // Validate request
    if (!req.body.message) {
        return res.status(400).send({
            message: "Contact content can not be empty"
        });
    }
    res.status(201);

    // Create a Contact
    var contact = new Contact({
        firstName: req.body.firstName || "Unknown firstName",
        lastName: req.body.lastName,
        message: req.body.message,
        email: req.body.email,
        number: req.body.number,
        consultation: req.body.consultation,
        service: req.body.service,
        status: statusUpdate.createRequest

    });

    // Save Contact in the database
    contact.save()
        .then(data => {
            res.send(data);
            //res.end("Test");
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Contact."
            });
        });

    //Connect to Rabbit MQ and publish msg onto the queue
    amqp.connect('amqp://localhost', function(err, conn) {
        conn.createChannel(function(err, ch) {
            var mq = 'ContactService_audit';
            ch.assertQueue(mq, { durable: false });
            ch.sendToQueue(mq, Buffer.from(contact._id.toString()));
            //console.log(" [x] Sent %s", contact._id.toString());
        });
        setTimeout(function() {
            conn.close();
        }, 500);
    });

    // var OutboundMsg = new rest.Client('http://localhost:3002/communications');
    // OutboundMsg
    //     .create({
    //         firstName: req.body.firstName,
    //         lastName: req.body.lastName,
    //         message: req.body.message,
    //         email: req.body.email,
    //         service: req.body.service,
    //         status: statusUpdate.createRequest
    //     })
    //     .then(function(user) {
    //         console.log('OutboundMsg created');
    //     });
    var request = require("request");

    var options = {
        method: 'POST',
        url: 'http://localhost:3002/communications',
        body: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            message: req.body.message,
            email: req.body.email,
            service: req.body.service,
            status: statusUpdate.createRequest
        },
        json: true

    };

    console.log(options);

    request(options, function(error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

};

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.send(contacts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving contacts."
            });
        });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
    Contact.findById(req.params.contactId)
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            res.send(contact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            return res.status(500).send({
                message: "Error retrieving contact with id " + req.params.contactId
            });
        });
};

// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Contact content can not be empty"
        });
    }

    // Find contact and update it with the request body
    Contact.findByIdAndUpdate(req.params.contactId, {
            //title: req.body.title || "Untitled Contact",
            //content: req.body.content
            firstName: req.body.firstName || "Unknown firstName",
            lastName: req.body.lastName,
            message: req.body.message,
            email: req.body.email,
            number: req.body.number,
            consultation: req.body.consultation,
            service: req.body.service

        }, { new: true })
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            res.send(contact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            return res.status(500).send({
                message: "Error updating contact with id " + req.params.contactId
            });
        });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
    Contact.findByIdAndRemove(req.params.contactId)
        .then(contact => {
            if (!contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            res.send({ message: "Contact deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.contactId
                });
            }
            return res.status(500).send({
                message: "Could not delete contact with id " + req.params.contactId
            });
        });
};