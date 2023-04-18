import React, { useRef, useEffect, useState } from 'react';
import { Typography, Grid, TextField, Button, FormControl, FormControlLabel, Checkbox, Select, InputLabel, MenuItem, FormGroup } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GeoCodes, Signal } from '../app/model'
import { GoogleMap, Marker, useJsApiLoader } from
    '@react-google-maps/api'
    import JesseGoogleMap from '../components/GoogleMap';
import axios from 'axios';
import { db } from '../dataLayer/FirestoreInit';
import { getDoc, doc } from "@firebase/firestore";
import { CheckBox } from '@mui/icons-material';

//can filter db for signalId matching params  - but can a user who is not logged in see it? 
// need to change firebase rules to allow anyone access to signals collection

export interface MapOptions {
    zoom: number,
    center: GeoCodes,
    mapId: string | undefined
}

const SOS = () => {


 const { isLoaded } = useJsApiLoader({
        // id: 'google-map',
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS!
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS!,
        libraries:['places'],
        id:'google-map'
    }) 
const [center, setCenter] = useState<GeoCodes>({lat: 0, lng: 0})
    //const mapRef = useRef<google.maps.Map>(null)
    const [readySent, setReadySend] = useState()

    const { id } = useParams();
   
const server_dev_url = `http://localhost:3002/sms/${id}`
const server_prod_url = `https://twilio-node-server.onrender.com/sms/${id}`;

async function getSignal(para:string | undefined){
    let stringId = para as string;
    try {
        const docRef = doc(db, "signals", stringId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setCenter(docSnap.data().geolocation);
        } else { 
            console.log("No document found");
        }
    } catch (error: any) {
        return { error: error.message };
    }
}

function handleChange (e:any){
    const response = e.target.value;
    console.log(response);
}

    useEffect(() => {
        getSignal(id);

      /*   axios.get(server_dev_url)
        .then(function (response) {
            console.log(response);
          }) */
          
          //eslint-disable-next-line
    }, [])

    const options = {

    }

    const styles = {
        width: '400px',
        height: '550px'
    }

    /*   const apiKey = process.env.REACT_APP_GOOGLE_CLIENTID as string;
   */

    if (!isLoaded) return (<>Nothing</>)

    return (
        <div style={{margin: '2rem'}}>
            <div>   
                <Typography component="h2" variant="h5" color="primary" gutterBottom={true}>Showing Sender's location</Typography>
                </div>
            
            <div style={{margin: '2rem', display: 'flex', justifyContent: 'center'}}>
            <JesseGoogleMap latlng={center}/>
                
              {/*   <GoogleMap
                mapContainerStyle={styles}
                center={center}
                zoom={18}
                options={options as google.maps.MapOptions}

            /> */}
            
            <Marker position={center}  icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
      }}></Marker>


            </div>
<div>
    <Typography component="h2" variant="h5" color="primary" gutterBottom={true}>Please indicate your response</Typography>

    <Grid item xs={12} md={6}>
              
                <FormGroup>
                  
                        <FormControlLabel control={
                            <Checkbox
                                id={'1'}
                                name='no'
                                value={'1'}
                                onChange={(e: any) => handleChange(e)} />
                         } label={'Unable to assist'} />
                         <FormControlLabel control={
                        <Checkbox
                              id={'2'}
                              name='yes'
                              value={'2'}
                              onChange={(e: any) => handleChange(e)} />
                      } label={'Coming immediately'} />
                    
                </FormGroup>
            </Grid>
</div>


        </div >
    );
};

export default SOS;



