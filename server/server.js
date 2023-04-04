'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port, host } = require('./config.js')
const secrets = require('./secrets.js');

const twilio_number = secrets.twilio_number;
const twilio_sid = secrets.twilio_sid;
const authToken = secrets.authToken;
const my_number = secrets.my_number; //for testing


const app = express();

const client = require('twilio')(twilio_sid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors);

app.get('/', (req, res) => {
    res.send('Serving home page');
})

app.post('/sms', (req, res) => {
    res.header('Content-Type', 'application/json');
    try {
        client.messages
            .create({
                body: req.body.body,
                from: `${twilio_number}`,
                to: `${my_number}` //req.body.recipients
            }).then(message => console.log(message.sid))
            .then(() => { res.send(JSON.stringify({ success: true })) })

    }
    catch (err) {
        console.log(err);
        res.send(JSON.stringify({ success: false }))
    }



})

app.listen((port, host, () => { console.log(`Server listening on ${host}:${port}`) }))