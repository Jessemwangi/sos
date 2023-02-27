[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=Jessemwangi_sos)

## What SOS

SOS is a responsive web application build with typscript language and uses firestore as the database, the app is used to sent a distress signal when in need by pressing a button, then it broadcast the distress to the individual prioritized receipients,

### How to use

The user of this system first create an account, the goes to profile and create a list of people who can receive distress, and the type of distress each can recieve.

### how to sent a distress

The system has a buttons that is visible and easly pressed for preset SOS, one can have a maximum of 4 preset SOS and one custome sos that allows selecting individuals who will will receive the distress and also allows the creation of custom text, or pick text from a list of pre configured (max 5 text per individual)

### distress signal

this signal is sent from distress person seeking aid to selected individuals, the recipient will accept the signal and do neccessary action, they can notify the sender or just act based on the signal type. an option / checkbox will be there as an option to notify the sender or not.

### resource permission

Allow notification
allow location
internet connetctivity
click to call

#### Storage

this project will store data in database - cloud firestore in json format, a sample data will look like this

```json
{
  "profile": [
    {
      "uid": "34i99jhjni87893",
      "email": "jesse@gmail.com",
      "userName": "Jesse",
      "DOB": "1990-03-21",
      "contact": "12233445",
      "streetAddress": "",
      "occupation": "student"
    },
    {
      "uid": "34i99jhjnkhjhji87893",
      "email": "faith@gmail.com",
      "userName": "faith",
      "DOB": "1992-03-21",
      "image": "path to image"
    }
  ],
  "recipients": [
    { "rcpId": 1, "uid": "34i99jhjni87893", "name": "john" },

    {
      "rcpId": 2,
      "uid": "34i99jhjni87893",
      "name": "doe",
      "email": "doe@gmail.com"
    },

    {
      "rcpId": 3,
      "uid": "34i99jhjni87893",
      "name": "Mary",
      "email": "rcpfaith@gmail.com"
    },

    { "rcpId": 4, "uid": "34i99jhjni87893", "name": "Mom" }
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
      "name": "finances",
      "recipient": ["john", "doe", "Mary", "Mom"],
      "presetMsg": "in need of financial situation",
      "cstTextId": "",
      "createdAt": "timestamp"
    },
    {
      "signalId": 2,
      "uid": "34i99jhjni87893",
      "name": "rescues",
      "recipient": ["john", "doe", "Mom"],
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
  "custometext": [
    {
      "cstTextId": 1,
      "uid": "34i99jhjni87893",
      "message": "call me"
    },
    {
      "cstTextId": 2,
      "uid": "34i99jhjni87893",
      "message": "call me",
      "otherDetails": "1234 1234"
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

#### profile

will store individual profile and account information as fetched from google authenticator, user can enter as many field as possible,  for mvp we will use google authenticator, then afterward add others.

#### recipients
contains a list of all recipients,  to get for an individual a filter of where uid ="individual", users can have an endless list of Receiptients.

#### statusCode

distress signal code based on the delivery, sent, signal dispatched by a distressed person, 2 signal sent successful, resolved signal period completed, resolved can be done by the sender

#### signalsList

A preset list of message and the number of recipient per pre defined message, that can be send quickly with a press of a button, only four signalsList button will be display, this can be set in the user profile, once a distress is send its is log in the "signalsStatus" which keep trackId of all signals from (signals , signalsId).

for custome message it will create a new signalsList for you so that incase in future you can re-use it. all sent signals should have a signalsList created

#### signals

A list of sent signals with coordinates and time sent, to get a list of sent signal for an individual , filter by uid and then fetch signals signalsList(signalsId) to get recipients and signalsStatus (signalsId)

#### custometext

text message that will be sent to recipient, signalsList should have either cstTextId or typed text when sending a distress signal, when select it will replace the "presetMsg", and also cstTextId, if message is directly typed it replaces "cstTextId"

#### signalsStatus

keeps statelog of all sent distress Signals ,transactedBy keeps changing based on recipients and sender. 