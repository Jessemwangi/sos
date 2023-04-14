
const client = require("twilio")(
    process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    process.env.REACT_APP_TWILIO_AUTH_TOKEN
  );

 async function sendSms (req, res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
  
    client.messages
      .create({
        from: process.env.REACT_APP_TWILIO_NUMBER,
        to: process.env.REACT_APP_MY_NUMBER,
        body: req.body.body,
      })
      .then(() => {
        res.send(JSON.stringify({ success: true }));
      })
      .catch((err) => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
      });
  };

  export default sendSms