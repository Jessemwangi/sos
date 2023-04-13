import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    doc, updateDoc, deleteDoc
} from "@firebase/firestore";
import { SignalsList, CustomText, Recipient } from '../app/model';
import { db } from '../dataLayer/FirestoreInit';

interface Props {
    messages: CustomText[],
    signals: SignalsList[]
}

const SignalsView = ({ messages, signals }: Props) => {
    const dispatch = useDispatch();
    const signalsList: SignalsList = useSelector((state: any) => state.signalsList);

    /* const filteredMessage = (id: string): string => {
        const message: CustomText[] = messages?.filter((item) => item.id === id);
        console.log(message);
        console.log(message[0].message);
        if (message) { return message[0].message } else { return "message unavailable" }
    } */

    //console.log(filteredMessage('cd3e4603-2302-4b4e-878c-122e98519c0c'));

    function editButtonHandler(e: any, id: string) { }

    function deleteHandler(e: any, id: string) { }

    return (
        <div>
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Available Signals
                </Typography>
                <Grid item xs={12} md={6}>
                    <Table size="small" className="viewsTable">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Message Id</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Recipients</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {signals?.length !== 0 ? (signals?.map((item: any) => (
                                <TableRow key={item.name} >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.cstTextId}</TableCell>
                                    <TableCell>{item.presetMsg}</TableCell>
                                    <TableCell>{item.recipients ? (item.recipients?.join(', ')) : (<>empty</>)}</TableCell>
                                    <TableCell>
                                        <EditIcon className='icon' id={`icon${item.id}`}
                                            onClick={(e) => editButtonHandler(e, item.id)} />
                                    </TableCell>
                                    <TableCell>
                                        <DeleteIcon className='icon' style={{ cursor: 'hover' }} id={`delete${item.id}`} onClick={(e) => deleteHandler(e, item.id)} />
                                    </TableCell>
                                </TableRow>
                            ))) : (<></>)}
                        </TableBody>
                    </Table>
                </Grid>
            </React.Fragment >

        </div >
    );
};

export default SignalsView;