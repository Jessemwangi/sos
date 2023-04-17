import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GeoCodes, Signal } from '../app/model'
import { GoogleMap, Marker, useJsApiLoader } from
    '@react-google-maps/api'
import axios from 'axios';

export interface MapOptions {
    zoom: number,
    center: GeoCodes,
    mapId: string | undefined
}

const SOS = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS!
    })

    //const mapRef = useRef<google.maps.Map>(null)

    const { signalId } = useParams();
    console.log(signalId);
const server_dev_url = `http://localhost:3002/sms/${signalId}`
const server_prod_url = `https://twilio-node-server.onrender.com/sms/${signalId}`

    useEffect(() => {
        axios.get(server_dev_url)
        .then(function (response) {
            console.log(response);
          })

//eslint-disable-next-line
    }, [])

    const center = {
        lat: 61,
        lng: 23
    }

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
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <div style={{margin: '2rem'}}><GoogleMap
                mapContainerStyle={styles}
                center={center}
                zoom={18}
                options={options as google.maps.MapOptions}

            />


            </div>


        </div >
    );

};

export default SOS;



