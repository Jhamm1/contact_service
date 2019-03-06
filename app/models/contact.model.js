const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    message: String,
    email: String,
    number: String,
    consultation: Boolean,
    service: String,
    status: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContactSchema);