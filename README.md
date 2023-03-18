[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=Jessemwangi_sos)

## About SOS

SOS is a mobile-first web application built with Typescript and a Firebase Firestore backend. The app's purpose is to provide a very simple and rapid way to send a distress signal via SMS to a pre-defined list of contacts. 

### How to use

#### Setup

To use the system, the user must first authenticate their identity with OAuth and then create a profile containing their personal details. At least one emergency contact must also be provided at the time of registration. Optionally the user can also customise the signal types, ie emergency category, and content of the text message that will be sent. These can also be modifed at any time.

#### Sending a distress signal / SOS

The application dashboard contains a single large 'SOS' button. When pressed, the SOS distress is activated with a two-minute countdown timer. During this time the user has the option of defining their emergency type according to a maximum of five pre-defined categories. Each category has an associated list of contacts (maximum of five) who will be notified of the emergency. The recipients when will then recieve an SMS message notifiying them of the emergency type, or the user's custom text,  and the user's location. 
If no emergency category is selected within two minutes, a 'generic emergency' will be issued. The user can define whether this signal will activate a call to emergency services (112 in Europe) or broadcast to a list of private contacts.
The user may also cancel the signal before the count-down ends.  


#### Receiving a distress signal

When a recipient receives an SMS notification from the SOS service, they are requested to indicate their response. A link in the SMS message will display the location of the person in distress. A second link will direct the recipient to a simple response form in which they may indicate if or how they will respond to the emergency. The sender of the SOS will be notified of the recipient's response. 

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

    {
      "rcpId": 2304958,
      "uid": "34i99jhjni87893",
      "name": "Summer Robers",
      "phone": "+3584562378944",
      "email": "endlessSummer@gmail.com"
    },
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
    {
      "signalId": 2,
      "uid": "34i99jhjni87893",
      "name": "Hiking Disaster",
      "recipient": ["1230280", "2304958"],
      "presetMsg": "Locate me, I need help",
      "cstTextId": 2,
      "createdAt": "timestamp"
    }
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
    {
      "signalsId": 2,
      "uid": "34i99jhjnkhjhji87893",
      "createdAt": "timestamp",
      "geoLocation": {
        "lat": "2-3445",
        "lng": "2-3445"
      }
    }
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
      },{
        "trackId": 3,
        "uid": "34i99jhjni87893",
        "signalsId": 2,
        "statusCode": 3,
        "dateCreated": "timestamp",
        "transactedBy": "34i99jhjnkhjhji87893"
      }
  ]
}
```

## Application Pages
### Profile

Stores individual profile and account information, fetched from google authenticator data. 

### Recipients
Contains a list of all recipients the user has added to their application data. The recipient list is stored in firebase according the user uid. 

### Status Codes

Indicates the status of a sent distress signal. For example
1 =  signal dispatched, 
2 =  signal received,
3 =  request resolved (call for help accepted or rejectd by recipient)

### Signals List

A preset list of messages and recipients for each emergency category.  
A maximum of five signals list buttons will be displayed on the dashboard.  This signals/categories can be set in the user profile.  When a distress signal is sent, the send event is logged in the "signalsStatus" list, which records the trackId of all signals from (signals , signalsId).

### Signals

A list of sent signals with geographic coordinates and time sent.  To retrieve a list of sent signals for a particular user, the list can be filtered by uid and then used to query signals list by signals id to retrieve
recipients and signalsStatus (signalsId).

### Custom Text

Allows the user to customise the text of the SMS that will be sent to their nominated recipients for each emergency category. The Signals List should have either cstTextId or typed text when sending a distress signal, when selected it will replace the "presetMsg", and also cstTextId. If the message is directly typed it replaces "cstTextId".

### Signal Status

Used to keep a state log of all sent distress signals. 