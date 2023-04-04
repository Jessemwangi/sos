import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button, Dialog } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  doc, updateDoc, deleteDoc
} from "@firebase/firestore";


import { togglePopover } from '../features/manageRecipientsSlice';
import { useFetchRecipientsByIdQuery } from '../app/services/firestoreAPI';
import '../styles/RecipientsViews.css';
import { db } from '../DataLayer/FirestoreInit';
import { auth } from "../app/services/FirebaseAuth";
import { Recipient } from '../app/model';
import { resetForm } from '../features/manageRecipientsSlice';


const RecipientsViews = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const uid = user?.uid ? user.uid : '';


  const recipient: Recipient = useSelector((state: any) => state.manageRecipients.recipient);
  let open = useSelector((state: any) => state.manageRecipients.popoverState);
  const [targetRecipient, setTargetRecipient] = useState(recipient);

  const {
    data,
    isFetching,
    error
  } = useFetchRecipientsByIdQuery({ id: uid });

  if (isFetching) {
    return <LinearProgress color="secondary" />;
  }

  if (error) {
    return <p>Error: An Error Occurred</p>;
  }

  function closeHandler() {
    dispatch(togglePopover());
  }

  const handleChange = (e: any) => {
    setTargetRecipient({ ...targetRecipient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'recipients', `${targetRecipient.id}`), {

        name: `${targetRecipient.name}`,
        address: targetRecipient.address,
        phone: targetRecipient.phone,
        city: targetRecipient.city,
        postcode: targetRecipient.postcode,
        email: targetRecipient.email
      })
        .then(() => console.log(targetRecipient))



    } catch (error: any) {
      console.log(error)

    }
    dispatch(resetForm());
    setTargetRecipient(recipient);
    dispatch(togglePopover());
  }

  function editButtonHandler(e: any, id: string) {
    const currentRecipient = data!.filter((recipient) => recipient.id === id);
    console.log(currentRecipient);
    setTargetRecipient(currentRecipient[0]);
    dispatch(togglePopover());
  }


  async function deleteHandler(e: any, id: string) {

    //need a popover to check
    try {
      await deleteDoc(doc(db, 'recipients', `${id}`))
        .then(() => console.log('id:', id));

    } catch (error: any) {
      console.log(error)

    }


  }


  return (

    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Post Code</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {data && data.map((recipient) => (
            <TableRow key={recipient.id} >
              <TableCell>{recipient.createdAt}</TableCell>
              <TableCell>{recipient.name}</TableCell>
              <TableCell>{recipient.address}</TableCell>
              <TableCell>{recipient.phone}</TableCell>
              <TableCell>{recipient.postcode}</TableCell>
              <TableCell>{recipient.city}</TableCell>
              <TableCell><EditIcon id={`icon${recipient.id}`}
                onClick={(e) => editButtonHandler(e, recipient.id)} />
              </TableCell>
              <TableCell> <DeleteIcon id={`delete${recipient.id}`} onClick={(e) => deleteHandler(e, recipient.id)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        className="editContactsDialog"
        open={open}
        onClose={closeHandler}
        PaperProps={{
          sx: {
            height: '400px'
          }
        }}
      >
        {recipient ?
          <form className="editContactForm" onChange={handleChange}>
            <label htmlFor="name">Name</label><input
              defaultValue={targetRecipient.name}
              type="text"
              name="name"
              id="nameInput"></input>
            <label htmlFor="address">Address</label><input
              defaultValue={targetRecipient.address}
              type="text"
              name="address"
              id="addressInput"></input>
            <label htmlFor="phone">Phone</label><input
              type="text"
              name="phone"
              id="phoneInput"
              defaultValue={targetRecipient.phone}
            ></input>
            <label htmlFor="email">Email</label><input
              type="email"
              name="email"
              id="emailInput"
              defaultValue={targetRecipient.email}
            ></input>
            <label htmlFor="postcode">Postcode</label><input
              type="text"
              name="postcode"
              id="postcodeInput"
              defaultValue={targetRecipient.postcode}
            ></input>
            <label htmlFor="city"></label>City<input
              type="text"
              name="city"
              id="city"
              defaultValue={targetRecipient.city}
            ></input>
            <div>
              <Button type="submit" onClick={handleSubmit}>Save</Button>
              <Button onClick={closeHandler}>Close</Button>
            </div>
          </form>
          : <p>Awaiting data</p>
        }
      </Dialog >
    </React.Fragment >
  );


};


export default RecipientsViews;