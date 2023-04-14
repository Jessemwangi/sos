import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
import { useFetchSignalsByIdQuery } from '../features/signalHistorySlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/services/FirebaseAuth';



/* export interface Signal {
    id: string,
    uid: string | undefined,
    createdAt: Date | string,
    geolocation: GeoCodes
    signalType:    //this is for the emergency type, from signalsList.name 
} */


//TOFIX: Add emergency type to signal model?
//TODO: how is response to signal collected?

const SignalHistory = () => {
    //a log of sent SOSs

    const [user] = useAuthState(auth);
    const uid = user?.uid;

    const { data, isFetching, error } = useFetchSignalsByIdQuery(uid);
    console.log(data);

    if (isFetching) { }


    if (error) { }

    return (
        <div style={{ padding: '2rem' }}>
            <Typography>Signal Log</Typography>

            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Date sent</TableCell>
                        <TableCell>Signal Id</TableCell>
                        <TableCell>Signal Type</TableCell>
                        <TableCell>Sent from location</TableCell>
                        <TableCell>Response</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {data && data.map((signal) => (
                        <TableRow key={signal.id} >
                            <TableCell>{/* {signal.createdAt} */}</TableCell>
                            <TableCell>{signal.id}</TableCell>
                            <TableCell>{signal.signalType}</TableCell>
                            <TableCell>{`${signal.geolocation.lng}, ${signal.geolocation.lat}`}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>






        </div>
    );
};

export default SignalHistory;