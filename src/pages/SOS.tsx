import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { GoogleMapsProvider, useGoogleMap } from '@ubilabs/google-maps-react-hooks';
import { Loader } from "@googlemaps/js-api-loader"
import { GeoCodes, Signal } from '../app/model'


/* The getCurrentPosition() method launches an asynchronous request that tries to find the location (latitude and longitude) of the current browser. This initial position uses efficient lookups like IP routing and may not be the most accurate. On browsers that support GPS (or other forms of triangulation), a secondary more accurate positions may be found using the watchPosition() method. */

export interface mapOptions {
    zoom: number,
    center: GeoCodes,
    mapId: string | undefined

}

const SOS = () => {
    if (navigator.geolocation) { console.log('geolocation ok') }
    const apiKey = process.env.REACT_APP_GOOGLE_CLIENTID as string;
    const { signalId } = useParams();

    const position: GeoCodes = {
        lat: 0,
        lon: 0
    }

    const loader = new Loader({
        apiKey: apiKey
    });

    const mapContainer = useRef<HTMLDivElement>(null);
    let map: google.maps.Map;

    loader.load().then(async () => {
        //@ts-ignore
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;

        map = new Map(mapContainer, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
    });

    const mapOptions: mapOptions = {
        zoom: 12,
        center: { lat: -25.344, lon: 131.031 },
        mapId: signalId

    }


    return (
        <div>

       {/*      <GoogleMapProvider>
                <div id="mapContainer" ref={mapContainer}>

                    googleMapsAPIKey={process.env.NEXT_PUBLIC_MAP_API_KEY}
                    options={mapOptions}
                    mapContainer={mapContainer}
                >
                    <div ref={(node) => setMapContainer(node)} style={{ height: "100vh" }} />
                    <Location />

                </div>
            </GoogleMapProvider > */}



        </div >
    );

};

export default SOS;



