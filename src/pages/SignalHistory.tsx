import { Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React from 'react';



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

//TOFIX: Add emergency type to signal model?
//TODO: how is response to signal collected?

const SignalHistory = () => {
    //a log of sent SOSs


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

            <p>Your sent signals:</p>

            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Date sent</TableCell>
                        <TableCell>Emergency type</TableCell>
                        <TableCell>Message recipients</TableCell>
                        <TableCell>Sent from location</TableCell>
                        <TableCell>Response</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {data && data.map((signal) => (
                        <TableRow key={signal.id} >
                            <TableCell>{signal.createdAt}</TableCell>
                            <TableCell>{signal.name}</TableCell>
                            <TableCell>{signal.recipients}</TableCell>
                            <TableCell>{signal.geolocation}</TableCell>
                            <TableCell></TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>






        </div>
    );
};

export default SignalHistory;