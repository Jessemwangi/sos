import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    doc, updateDoc, deleteDoc
} from "@firebase/firestore";
import { SignalsList, CustomText, Recipient } from '../app/model';
import { db } from '../DataLayer/FirestoreInit';

import { setSignalsList, resetForm, useFetchSignalsListByIdQuery } from '../features/manageSignalSlice';

interface Props {
    messages: CustomText[],
    signals: SignalsList[]
}

const SignalsView = ({ messages, signals }: Props) => {
    const dispatch = useDispatch();
    const signalsList: SignalsList = useSelector((state: any) => state.signalsList);

    const filteredMessage = (textId: string): string => {
        return (
            messages?.filter((item) => item.id === textId)[0].message)
    }
    //console.log(message);
    //console.log(message.message);



    console.log(filteredMessage('cd3e4603-2302-4b4e-878c-122e98519c0c'));

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
                                <TableCell>Message</TableCell>
                                <TableCell>Recipients</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {signals?.length !== 0 ? (signals?.map((item: any) => (
                                <TableRow key={item.id} >
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{/* {()=>filteredMessage(item.cstTextId)} */}</TableCell>
                                    <TableCell>{item.recipients}</TableCell>
                                    <TableCell>
                                        {/*   <EditIcon className='icon' id={`icon${item.id}`}
                                        onClick={(e) => editButtonHandler(e, item.id)} /> */}
                                    </TableCell>
                                    <TableCell>
                                        {/* <DeleteIcon className='icon' style={{ cursor: 'hover' }} id={`delete${item.id}`} onClick={(e) => deleteHandler(e, item.id)} /> */}
                                    </TableCell>
                                </TableRow>
                            ))) : (<></>)}
                        </TableBody>
                    </Table>
                </Grid>
            </React.Fragment >

        </div>
    );
};

export default SignalsView;