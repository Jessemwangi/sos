import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Button, Dialog } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  doc, updateDoc, deleteDoc
} from "@firebase/firestore";

import { useFetchRecipientsByIdQuery } from '../app/services/firestoreAPI';
import '../styles/RecipientsViews.css';
import { db } from '../DataLayer/FirestoreInit';
import { auth } from "../app/services/FirebaseAuth";
import { Recipient } from '../app/model';
import { resetForm, togglePopover } from '../features/manageRecipientsSlice';


const RecipientsViews = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const uid = user?.uid ? user.uid : '';


  const recipient: Recipient = useSelector((state: any) => state.manageRecipients.recipient);
  let open = useSelector((state: any) => state.manageRecipients.popoverState);
  const [objectState, setObjectState] = useState(recipient);

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
    setObjectState({ ...objectState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'recipients', `${objectState.id}`), {

        name: `${objectState.name}`,
        address: objectState.address,
        phone: objectState.phone,
        city: objectState.city,
        postcode: objectState.postcode,
        email: objectState.email
      })
        .then(() => console.log(objectState))



    } catch (error: any) {
      alert(error)

    }
    dispatch(resetForm());
    setObjectState(recipient);
    dispatch(togglePopover());
  }

  function editButtonHandler(e: any, id: string) {
    const currentItem = (data!.filter((item) => item.id === id))[0];
    setObjectState(currentItem);
    dispatch(togglePopover());
  }

  async function deleteHandler(e: any, id: string) {
    try {
      await deleteDoc(doc(db, 'recipients', `${id}`))
        .then(() => console.log('id:', id));
    } catch (error: any) {
      console.log(error)
    }
  }


  return (

    <React.Fragment>
      <Table size="small" className="viewsTable">
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
              <TableCell><EditIcon style={{ cursor: 'hover' }} id={`icon${recipient.id}`}
                onClick={(e) => editButtonHandler(e, recipient.id)} />
              </TableCell>
              <TableCell> <DeleteIcon style={{ cursor: 'hover' }} id={`delete${recipient.id}`} onClick={(e) => deleteHandler(e, recipient.id)} /></TableCell>
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
              defaultValue={objectState.name}
              type="text"
              name="name"
              id="nameInput"></input>
            <label htmlFor="address">Address</label><input
              defaultValue={objectState.address}
              type="text"
              name="address"
              id="addressInput"></input>
            <label htmlFor="phone">Phone</label><input
              type="text"
              name="phone"
              id="phoneInput"
              defaultValue={objectState.phone}
            ></input>
            <label htmlFor="email">Email</label><input
              type="email"
              name="email"
              id="emailInput"
              defaultValue={objectState.email}
            ></input>
            <label htmlFor="postcode">Postcode</label><input
              type="text"
              name="postcode"
              id="postcodeInput"
              defaultValue={objectState.postcode}
            ></input>
            <label htmlFor="city"></label>City<input
              type="text"
              name="city"
              id="city"
              defaultValue={objectState.city}
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