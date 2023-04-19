import React, { useRef, useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getDoc, doc, setDoc } from "@firebase/firestore";
import { GeoCodes, Signal } from "../app/model";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { db } from "../dataLayer/FirestoreInit";

export interface MapOptions {
  zoom: number;
  center: GeoCodes;
  mapId: string | undefined;
}

export interface SosResponse {
  code: string;
  msg: string;
  responder: string;
}

const SOS = () => {
  const { id } = useParams(); //auto decodes URI components
  const queryParams = new URLSearchParams(window.location.search);
  const rsp = queryParams.get("rsp");
  console.log("recipient substring", rsp);
  const [center, setCenter] = useState<GeoCodes>({ lat: 0, lng: 0 });
  const [readySend, setReadySend] = useState(false);
  const [sosResponse, setSosResponse] = useState<SosResponse>({
    code: "",
    msg: "",
    responder: "",
  });

  //const server_prod_url = `https://twilio-node-server.onrender.com/sms/${id}`;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS!,
    id: "google-map",
  });
  const styles = {
    width: "98vw",
    height: "40vh",
  };
  const options = {};

  async function getSignal(para: string | undefined) {
    let stringId = para as string;
    console.log(stringId);
    try {
      const docRef = doc(db, "signals", stringId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Firebase signal data:", docSnap.data());
        setCenter(docSnap.data().geolocation);
      } else {
        console.log("No such document found");
      }
    } catch (error: any) {
      return { error: error.message };
    }
  }

  function handleChange(e: any) {
    console.log(e.target.value);
    let responseObject = { [e.target.name]: e.target.value };
    console.log(responseObject);
    setSosResponse((response) => ({ ...response, ...responseObject }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("signal id:", id);
    const signalId = id as string;
    try {
      await setDoc(
        doc(db, "signals", signalId),
        {
          reponse: sosResponse?.code,
        },
        { merge: true }
      ).then(() => console.log("data subtmitted"));
    } catch (error: any) {
      alert(error);
    }
    setReadySend(true);
  }

  useEffect(() => {
    getSignal(id);

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setReadySend(true);
    //eslint-disable-next-line
  }, [sosResponse]);

  useEffect(() => {
    if (readySend === true) {
      console.log("readysend true");
    }
    //eslint-disable-next-line
  }, [readySend]);

  return (
    <div style={{ margin: "2rem" }}>
      <div>
        <Typography
          component="h2"
          variant="h5"
          color="primary"
          gutterBottom={true}
        >
          Showing Sender's location
        </Typography>
      </div>

      <div
        style={{ margin: "2rem", display: "flex", justifyContent: "center" }}
      >
        <GoogleMap
          mapContainerStyle={styles}
          center={center}
          zoom={18}
          options={options as google.maps.MapOptions}
        />

        <Marker
          position={center}
          icon={{ path: google.maps.SymbolPath.CIRCLE, scale: 7 }}
        ></Marker>

        <div>
          <Typography
            component="h2"
            variant="h5"
            color="primary"
            gutterBottom={true}
          >
            Please indicate your response
          </Typography>

          <Grid item xs={12} md={6}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    id={"1"}
                    name="no"
                    value={"1"}
                    onChange={(e: any) => handleChange(e)}
                  />
                }
                label={"Unable to assist"}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    id={"2"}
                    name="yes"
                    value={"2"}
                    onChange={(e: any) => handleChange(e)}
                  />
                }
                label={"Coming immediately"}
              />
            </FormGroup>
          </Grid>
          <Grid>
            <Button type="submit" onSubmit={(e: any) => handleSubmit(e)}>
              Send
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SOS;
