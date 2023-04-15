import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    doc, updateDoc, deleteDoc
} from "@firebase/firestore";
import { SignalsList, CustomText, Recipient } from '../app/model';
import { db } from '../dataLayer/FirestoreInit';
import { togglePopover, toggleDeletePopover } from '../features/manageSignalSlice'
import DeletePopover from './DeletePopover';
import { signalsListApi } from '../features/signalsListApi';

type UserSignals = SignalsList[]
interface Props {
    messages: CustomText[],
    signals: UserSignals
}

const SignalsView = ({ messages, signals }: Props) => {
    const dispatch = useDispatch();
    let open: boolean = useSelector((state: any) => state.manageSignals.popoverState);
    const signalsList: SignalsList = useSelector((state: any) => state.manageSignals.signalsList);
    const deletePopoverOpen: boolean = useSelector((state: any) => state.manageSignals.deletePopoverOpen)
    const [deleteId, setDeleteId] = useState<string>("");
    const [objectState, setObjectState] = useState<SignalsList>(signalsList);


    /* const filteredMessage = (id: string): string => {
        const message: CustomText[] = messages?.filter((item) => item.id === id);
        console.log(message);
        console.log(message[0].message);
        if (message) { return message[0].message } else { return "message unavailable" }
    } */

    /**POPOVER FUNCTIONS
     */
    function editButtonHandler(e: any, id: string) {
        dispatch(togglePopover());
        if (signals) {
            const currentItem: SignalsList = (signals.filter((item) => item.id === id))[0];
            setObjectState(currentItem);
        }
    }

    function deleteHandler(e: any, id: string) {
        setDeleteId(id);
        dispatch(toggleDeletePopover());
    }

    const handleChange = (e: any) => {
        setObjectState({ ...objectState, [e.target.name]: e.target.value });
    };

    function closeHandler() {
        dispatch(togglePopover());
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (objectState) {

            try {
                await updateDoc(doc(db, 'signalsList', objectState.id), {
                    name: objectState.name,
                    presetMsg: objectState.presetMsg,
                    default: objectState.default,
                })
            } catch (error: any) {
                alert(error)
            }
            //dispatch(resetForm());
            dispatch(togglePopover());
            dispatch(signalsListApi.util.invalidateTags(['UserSignals']))
        }
    }


    /** Delete popover functions */

    function deleteCloseHandler() {
        dispatch(toggleDeletePopover)
    }

    const yesHandler = async () => {
        try {
            await deleteDoc(doc(db, 'signalsList', deleteId))
                .then(() => console.log('id:', deleteId));
            dispatch(signalsListApi.util.invalidateTags(['UserSignals']))

        } catch (error: any) {
            console.log(error);
        }
        setDeleteId("");
        dispatch(toggleDeletePopover());
    }

    const noHandler = () => {
        dispatch(toggleDeletePopover());
    }


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

            <Dialog
                className="editDialog"
                open={open}
                onClose={closeHandler}
                PaperProps={{
                    sx: {
                        height: '400px'
                    }
                }}
            >
                {signalsList ?
                    <form onChange={handleChange}>
                        <label htmlFor="name">Name</label><input
                            defaultValue={objectState?.name}
                            type="text"
                            name="title"
                            id="titleInput"></input>

                        <label htmlFor="phone">Message</label><input
                            type="text"
                            name="message"
                            id="messageInput"
                            defaultValue={objectState?.presetMsg}
                        ></input>

                        <div>
                            <Button type="submit" onClick={handleSubmit}>Save</Button>
                            <Button onClick={closeHandler}>Close</Button>
                        </div>
                    </form>
                    : <p>Awaiting data</p>
                }
            </Dialog >



            <DeletePopover
                yesHandler={yesHandler}
                noHandler={noHandler}
                deletePopoverOpen={deletePopoverOpen}
                closeHandler={deleteCloseHandler}
            />


        </div>
    );
};

export default SignalsView;