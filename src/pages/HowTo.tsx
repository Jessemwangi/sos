import React from "react";
import { Typography } from "@mui/material";
import "../styles/HowTo.css";

const HowTo = () => {
  return (
    <div className="howTo" style={{ padding: "2rem" }}>
      <Typography
        component="h2"
        variant="h4"
        color="primary"
        gutterBottom={true}
      >
        Help and Documentation
      </Typography>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={true}
      >
        About SOS
      </Typography>
      <p style={{ margin: "1rem" }}>
        SOS Service provides a rapid and simple way of contacting multiple
        people with a predefined message in case of distress or emergency.
      </p>

      <Typography
        variant="h5"
        component="h3"
        gutterBottom={true}
        color="primary"
      >
        How to use SOS
      </Typography>
      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={true}
      >
        Setting up your service
      </Typography>
      <ol style={{ margin: "1rem" }}>
        <li>
          <p>
            First, register with the service by filling in your profile with the
            necessary information. Alternatively you can register with your
            Google Account.
          </p>
        </li>
        <li>
          {" "}
          <p>
            Next, manage your emergency contacts. Add up to five, but a minimum
            of two persons. These people will be notified by text message in the
            event of your distress. Your nominated contacts will then be alerted
            of your location, and may be able to respond in person and/or
            contact emergency services on your behalf.
          </p>
        </li>
        <li>
          {" "}
          <p>
            You have the option of customising your emergency types. A template
            is provided. 'Generic SOS' is included by default and cannot be
            changed. It is triggered in the event that no emergency type is
            selected after a timeout of thirty seconds.{" "}
          </p>
        </li>
        <li>
          {" "}
          <p>
            You may also custom the message fields that are sent to your
            contacts for each emergency type. A template is provided.
          </p>
        </li>
      </ol>

      <Typography
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom={true}
      >
        Sending an Emergency Signal
      </Typography>
      <p>
        The SOS button is accessible from main page of the application, the
        dashboard. Click on it in case of emergency. When you do this, the
        following will happen:
      </p>
      <ol>
        <li>
          A thirty-second timer will begin to count down. During this time you
          have the option to select the specific emergency type, or cancel the
          SOS.
        </li>
        <li>
          If a specific emergency type is selected, the custom message you have
          set for this emergency type and your location will then be dispatched
          to your nominated contacts by text message. You will be notified of
          their response.
        </li>
        <li>
          If no emergency type is selected, and the SOS is not cancelled, a
          generic emergency message will be sent to your contact list with your
          location.
        </li>
      </ol>
    </div>
  );
};

export default HowTo;
