import React, { useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { LinearProgress } from '@mui/material';
import { GeoCodes } from '../app/model';
 
interface Props {
    latlng:GeoCodes
}
const Google_Map = ({latlng}:Props) => {
    console.log(latlng);
  /*   const { isLoaded,loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS!,
        libraries:['places'],
        id:'google-map'
      })
      latlng ={
        lat:60.2010546,
        lng:24.9369392
    } */
  const centers = useMemo(() => (latlng),[latlng]);
/* 

  if (loadError) return <div>Error loading Google Maps API</div>;
  if (!isLoaded) return <div><LinearProgress ></LinearProgress> Loading Google Maps API...</div>; */
    return (
        <>
    <GoogleMap zoom={16} center={centers} mapContainerStyle={{"width":"98%", "height":"40vh"}}>
  <Marker position={centers} > ooo</Marker>
</GoogleMap>

    </>
    );
};

export default Google_Map;


