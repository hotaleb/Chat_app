const express = require('express');
const http = require('http');	
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const { prototype } = require('events');
const Message = require('./models/Message');


const app = express();
const server = http.createServer(app);

const io = new Server(server);

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

mongoose.connect ('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB : successfull')).catch((err) => console.log('Error : ', err));  


//Gérer les connexions WebSocket :


io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté.');

    // Écouteur pour l’envoi de message
    socket.on('send_message', async (data) => {
        const { sender, recipient, text } = data;

        // Vérifier que le texte n'est pas vide et ne dépasse pas 200 caractères
        if (!text || text.trim() === '' || text.length > 200) {
            socket.emit('error', { message: 'Le message est invalide.' });
            return;
        }

        // Enregistrer le message dans MongoDB
        const message = new Message({ sender, recipient, text });
        await message.save();

        // Notifier le destinataire en temps réel
        io.emit('receive_message', {
            sender,
            recipient,
            text,
            timestamp: message.timestamp,
        });

        console.log(`Message envoyé de ${sender} à ${recipient}`);
    });

    // Écouteur pour la déconnexion
    socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté.');
    });
});
// Lancer le serveur :
server.listen(PORT, () => {
    console.log(`Serveur WebSocket lancé sur le port ${PORT}`);
});