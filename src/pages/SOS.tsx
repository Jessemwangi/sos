import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GeoCodes, Signal } from '../app/model'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'


/* The getCurrentPosition() method launches an asynchronous request that tries to find the location (latitude and longitude) of the current browser. This initial position uses efficient lookups like IP routing and may not be the most accurate. On browsers that support GPS (or other forms of triangulation), a secondary more accurate positions may be found using the watchPosition() method. */

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

    const center = {
        lat: 60,
        lng: 24
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



