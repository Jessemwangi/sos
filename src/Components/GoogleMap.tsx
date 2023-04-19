import React, { useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { GeoCodes } from '../app/model';
 
interface Props {
    location: GeoCodes
}
const Map = ({location}:Props) => {
    console.log(location);
  const centers = useMemo(() => (location),[location]);

    return (
    <GoogleMap zoom={16} center={centers} mapContainerStyle={{"width":"98%", "height":"40vh"}}>
  <Marker position={centers}>ooo</Marker>
</GoogleMap>
    );
};

export default Map;


