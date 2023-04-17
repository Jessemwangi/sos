import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GeoCodes, Signal } from '../app/model'
import { GoogleMap, Marker, useJsApiLoader } from
    '@react-google-maps/api'
import axios from 'axios';

export interface mapOptions {
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


    useEffect(() => {
        axios.get('http://localhost:3002/sms/:signalId')
        //

    }, [])

    const center = {
        lat: 61,
        lng: 23
    }

    const options = {

    }

    const styles = {
        width: '400px',
        height: '450px'
    }



    if (navigator.geolocation) { console.log('geolocation ok') }
    /*   const apiKey = process.env.REACT_APP_GOOGLE_CLIENTID as string;
   */

    const { signalId } = useParams();

    /*   const position: GeoCodes = {
          lat: 65,
          lng: 23
      }
   */
    if (!isLoaded) return (<>Nothing</>)


    return (
        <div style={{ display: 'flex', justifyContent: "center" }}>
            <div><GoogleMap
                mapContainerStyle={styles}
                center={center}
                zoom={16}
                options={options as google.maps.MapOptions}

            />


            </div>


        </div >
    );

};

export default SOS;



