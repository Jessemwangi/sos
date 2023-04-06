import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';
//a log of sent SOSs


/* export interface Signal {
    signalId: string,
    uid: string | undefined,
    createdAt: Date,
    geolocation: GeoCodes
} */

/*
export interface SignalsList {
    signalId: string,
    uid: string,
    name: string,
    recipientId: string[],
    presetMsg: string,
    cstTextId?: string,
    createdAt?: Date
}

interface GeoCodes {
    lat: number,
    lon: number
}*/

//Add emergency type to signal model?

const SignalHistory = () => {


    const [data] = [[{
        id: "",
        createdAt: "",
        geolocation: "",
        recipients: ["", ""],
        name: ""


    }]]

    return (
        <div>
            <Typography>Signal Log</Typography>

            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Date sent</TableCell>
                        <TableCell>Emergency type</TableCell>
                        <TableCell>Message recipients</TableCell>
                        <TableCell>Sent from location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {data && data.map((signal) => (
                        <TableRow key={signal.id} >
                            <TableCell>{signal.createdAt}</TableCell>
                            <TableCell>{signal.name}</TableCell>
                            <TableCell>{signal.recipients}</TableCell>
                            <TableCell>{signal.geolocation}</TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>





            one signal detail, with summary of when it was send
            <p>send to who, received status, and if resolved or not.</p>

        </div>
    );
};

export default SignalHistory;