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

type UserSignals = SignalsList[]
interface Props {
    messages: CustomText[],
    signals: UserSignals
}

const SignalsView = ({ messages, signals }: Props) => {
    const dispatch = useDispatch();
    /*   const signalsList: SignalsList = useSelector((state: any) => state.signalsList); */

    /* const filteredMessage = (id: string): string => {
        const message: CustomText[] = messages?.filter((item) => item.id === id);
        console.log(message);
        console.log(message[0].message);
        if (message) { return message[0].message } else { return "message unavailable" }
    } */

    console.log('Props signals:', signals)
    function editButtonHandler(e: any, id: string) { }

    function deleteHandler(e: any, id: string) { }

    return (
        <div>
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Available Signals
                </Typography>


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

                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.presetMsg}</TableCell>
                                <TableCell>{item.recipients ? (item.recipients.join(', ')) : (<>empty</>)}</TableCell>
                                <TableCell>
                                    <EditIcon className='icon' id={`icon${item.id}`}
                                        onClick={(e) => editButtonHandler(e, item.id)} />
                                </TableCell>
                                <TableCell>
                                    <DeleteIcon className='icon' style={{ cursor: 'hover' }} id={`delete${item.id}`} onClick={(e) => deleteHandler(e, item.id)} />
                                </TableCell>


                            </TableRow>


                        )
                        )) : (<></>)
                        }



                    </TableBody>
                </Table>
            </React.Fragment >

        </div>
    );
};

export default SignalsView;