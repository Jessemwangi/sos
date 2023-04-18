import React, { useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { GeoCodes } from '../app/model';
 
interface Props {
    latlng:GeoCodes
}
const Google_Map = ({latlng}:Props) => {
    console.log(latlng);

    const markerIcon: google.maps.Icon = {
      url: 'https://img.icons8.com/3d-fluency/512/marker.png',
      scaledSize: new window.google.maps.Size(50, 50),
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(25, 25)
    };

   const centers: google.maps.LatLngLiteral = useMemo(() => (latlng), [latlng]);

  console.log(centers);
    return (
        <>
    <GoogleMap zoom={16} center={centers} mapContainerStyle={{"width":"98%", "height":"40vh"}}>
  <Marker position={centers} icon={markerIcon}> </Marker>
</GoogleMap>

    </>
    );
};

export default Google_Map;


