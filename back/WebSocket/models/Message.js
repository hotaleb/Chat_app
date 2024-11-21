const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    text: { type: String, required: true, maxlength: 200}, // Message (200 caractères max)
    timestamp: { type: Date, default: Date.now },  // Date et heure d'envoi
});

module.exports = mongoose.model('Message', MessageSchema);