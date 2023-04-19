import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getDoc, doc, setDoc } from "@firebase/firestore";
import { GeoCodes } from "../app/model";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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

const server_prod_url: string = "https://twilio-node-server.onrender.com/sms";

const SOS = () => {
  const { id } = useParams(); //auto decodes URI components
  const queryParams = new URLSearchParams(window.location.search);
  const rsp = queryParams.get("rsp") as string;
  console.log("recipient substring", rsp);
  const [center, setCenter] = useState<GeoCodes>({ lat: 0, lng: 0 });
  const [readySend, setReadySend] = useState(false);
  const [sosResponse, setSosResponse] = useState<SosResponse>({
    code: "",
    msg: "",
    responder: rsp,
  });

  //const server_prod_url = `https://twilio-node-server.onrender.com/sms/${id}`;

  const { isLoaded, loadError } = useJsApiLoader({
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

  /*   const twilioMessage = async (response: SosResponse) => {
    try {
      axios
        .post(server_prod_url, {
          message: response.msg,
        })
        .then((res: any) => {
          console.log(res);
        });
    } catch (err: any) {
      alert(err.message);
    }
  }; */

  function handleChange(e: any) {
    console.log(e.target.value);
    let responseObject = { [e.target.name]: e.target.value };
    console.log(responseObject);
    setSosResponse((response) => ({ ...response, ...responseObject }));
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    /*  console.log("signal id:", id);
    const signalId = id as string; */
    setReadySend(true);
  }

  async function sendResponseToDb() {
    console.log("signal id:", id);
    const signalId = id as string;
    try {
      await setDoc(
        doc(db, "signals", signalId),
        {
          reponse: sosResponse?.code,
        },
        { merge: true }
      ).then(() => console.log("data submitted"));

      /*   if (sosResponse.msg !== "") {
        twilioMessage(sosResponse);
      }
       */
    } catch (error: any) {
      alert(error);
    }
  }

  /* when page loads get signal from database */
  useEffect(() => {
    getSignal(id);
    console.log("getting signal with id: ", id); //debugging
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(sosResponse); //debugging
    //eslint-disable-next-line
  }, [sosResponse]);

  useEffect(() => {
    if (readySend === true) {
      console.log("readysend true, sending to db");
      sendResponseToDb();
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
        {loadError ? (
          <div>Error loading Google Maps API</div>
        ) : !isLoaded ? (
          <div>
            <LinearProgress />
          </div>
        ) : (
          <>
            <GoogleMap
              mapContainerStyle={styles}
              center={center}
              zoom={18}
              options={options as google.maps.MapOptions}
            />
            <Marker position={center}></Marker>
          </>
        )}

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
          <Grid item xs={12}>
            <TextField
              required
              id="msg"
              name="msg"
              label="Optional Message (max-length: 160 characters)"
              inputProps={{ maxLength: "160" }}
              fullWidth
              autoComplete="cc-Message"
              variant="standard"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={(e) => handleSubmit(e)}
              sx={{ mt: 3, ml: 1 }}
            >
              Send
            </Button>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default SOS;
