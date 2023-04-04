'use strict';
require('dotenv').config();


const secrets = {

    api_key: process.env.REACT_APP_API_KEY,
    auth_domain: process.env.REACT_APP_AUTHDOMAIN,
    project_id: process.env.PROJECTID,
    storage_bucket: process.env.REACT_APP_STORAGEBUCKET,
    messaging_sender_id: process.env.REACT_APP_MESSAGINGSENDERID,
    app_id: process.env.REACT_APP_APPID,
    google_client_id: process.env.REACT_APP_GOOGLE_CLIENTID,

    twilio_sid: process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    twilio_auth_token: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
    authToken: process.env.REACT_APP_TWILIO_AUTH_TOKEN,
    my_number: process.env.REACT_APP_MY_NUMBER,
    twilio_number: process.env.REACT_APP_TWILIO_NUMBER
}

module.exports = secrets;