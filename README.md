[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=Jessemwangi_sos)

## About SOS

SOS is intended as a mobile-first web application, developed using Typescript and a Firebase Firestore backend. Its primary objective is to provide a quick and easy way to send a distress signal via SMS and email to a predefined list of contacts. The application is designed with simplicity in mind and optimized for use on mobile devices, making it easy to use even in high-stress situations. With SOS, users can quickly notify their contacts and seek help in emergencies with just a few taps on their phone.

### Starting the application

In development mode, the Node Twilio server and React frontend can be started simultaneously with the commmand
```shell
npm run all
```
which uses the <a href="https://github.com/mysticatea/npm-run-all">npm-run-all</a> package.

To test the frontend only, use the standard react scripts startup command:
```shell
npm start
```

The server can be run with the command:
```shell
npm run server
```
By default, the server runs on port 3004. This can be changed from the server config file.
Note that if running in development mode you will need a Twilio account and authToken to use the SMS functionality. These variables should be added to the .env file.

### How to use the application

#### Setup

To use the system, the user must first authenticate their identity with Firebase Auth and then create a profile containing their personal details. At least one emergency contact must also be provided at the time of registration. Optionally the user can also customise the signal types, ie emergency category, and content of the text message that will be sent. These can also be modifed at any time.

#### Sending a distress signal / SOS

The UI dashboard contains a single large 'SOS' button. When pressed, the SOS distress is activated with a 30-second countdown timer. During this time the user has the option of defining their emergency type according to a maximum of five pre-defined categories. Each category has an associated list of contacts (maximum of five) who will be notified of the emergency. The recipients will then recieve a SMS message notifiying them of the emergency type, with the user's custom text, and a link to a webpage displaying the sender's location. 
If no emergency category is selected within 30 seconds, a 'generic emergency' will be issued. The user can define whether this signal will activate a call to emergency services (112 in Europe) or broadcast to a list of private contacts.
The user may also cancel the signal before the count-down ends.  


#### Receiving a distress signal

When a recipient receives an SMS notification from the SOS service, they are requested to navigate to the linked webpage and indicate their response via a simple form. The webpage will also display the location of the person in distress. The sender of the SOS will be notified of the recipient's response. 

### Resource permissions

The following  device capabilities and permissions are required:
*Allow notification
*Allow location
*Internet connectivity
*Click to call

#### Storage

This project stores json data in Firebase Firestore.  
Sample data:

```json
{
  "profile": [
    {
      "uid": "34i99jhjni87893",
      "email": "jcousteau@gmail.com",
      "userName": "Jaques Cousteau",
      "DOB": "1910-06-11",
      "contact": "144334845",
      "streetAddress": "12 Marine Parade",
      "occupation": "oceanographer"
    },
  ],

  "recipients": [
    { "rcpId": 1230280, 
    "uid": "34i99jhjni87893",
     "name": "John Moreau",
     "phone": "+358987234567",
     "email" },
  ],

  "statusCode": [
    {
      "name": "draft",
      "code": 0
    },
    {
      "name": "sent",
      "code": 1
    },
    {
      "name": "pending",
      "code": 2
    },
    {
      "name": "resolve",
      "code": 3
    }
  ],

  "signalsList": [
    {
      "signalId": 1,
      "uid": "34i99jhjni87893",
      "name": "Mental Breakdown",
      "recipient": ["1230280", "2304958"],
      "presetMsg": "In need of urgent emotional support",
      "cstTextId": "",
      "createdAt": "timestamp"
    },
  ],

  "signals": [
    {
      "signalsId": 1,
      "uid": "34i99jhjni87893",
      "createdAt": "timestamp",
      "geoLocation": {
        "lat": "2-3445",
        "lng": "2-3445"
      }
    },
  ],
  "customText": [
    {
      "cstTextId": 19897323,
      "uid": "34i99jhjni87893",
      "message": "Call me now"
    },
    {
      "cstTextId": 20923648,
      "uid": "34i99jhjni87893",
      "message": "I have had an accident",
    }
  ],
  "signalsStatus": [
    {
      "trackId": 1,
      "uid": "34i99jhjni87893",
      "signalsId": 2,
      "statusCode": 1,
      "dateCreated": "timestamp",
      "transactedBy": "34i99jhjnkhjhji87893"
    },{
        "trackId": 2,
        "uid": "34i99jhjni87893",
        "signalsId": 2,
        "statusCode": 2,
        "dateCreated": "timestamp",
        "transactedBy": "34i99jhjnkhjhji87893"
      }
  ]
}
```

## Application Pages
### Profile

Stores individual profile and account information.
Future implementation: also fetched from google authenticator data. 

### Recipients
Contains a list of all recipients the user has added to their application data. The recipient list is stored in firebase according the user uid. 

### Status Codes

Indicates the status of a sent distress signal. For example
1 =  signal dispatched, 
2 =  signal received,
3 =  request resolved (call for help accepted or rejectd by recipient)

### Signals List

A preset list of messages and recipients for each emergency category.  
A maximum of five signals list buttons will be displayed on the dashboard.  This signals/categories can be set in the Manage Signal Types page.  When a distress signal is sent, the send event is logged in the "signalsStatus" list, which records the trackId of all signals from (signals , signalsId).

### Signals

A list of sent signals with geographic coordinates and time sent.  To retrieve a list of sent signals for a particular user, the list can be filtered by uid and then used to query signals list by signals id to retrieve
recipients and signalsStatus (signalsId).

### Custom Text

Allows the user to customise the text of the SMS that will be sent to their nominated recipients for each emergency category. The Signals List should have either cstTextId or typed text when sending a distress signal, when selected it will replace the "presetMsg", and also cstTextId. If the message is directly typed it replaces "cstTextId".

### Signal Status

Used to keep a state log of all sent distress signals. 


### Project Sample Screenshot

#### Dashboard

![screenshot](https://github.com/andorjamb/sos/blob/master/screenshot_sos.png)

