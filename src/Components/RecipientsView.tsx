import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LinearProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Button, Dialog } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  doc, updateDoc, deleteDoc
} from "@firebase/firestore";

import '../styles/RecipientsView.css';
import { db } from '../DataLayer/FirestoreInit';
import { auth } from "../app/services/FirebaseAuth";
import { Recipient } from '../app/model';
import { useFetchRecipientsByIdQuery } from '../features/manageRecipientsSlice';
import { resetForm, togglePopover } from '../features/manageRecipientsSlice';


const RecipientsView = () => {
  /** Shows results retrieved from database
   * allows editing and deleting of database data
   */
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const uid = user?.uid ? user.uid : '';
  let open: boolean = useSelector((state: any) => state.manageRecipients.popoverState);
  const recipient: Recipient = useSelector((state: any) => state.manageRecipients.recipient);
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


  /*POPOVER FUNCTIONS FOR EDITING RECIPIENTS */

  function editButtonHandler(e: any, id: string) {
    /** filters db data and stores current object in local state, opens popover */
    const currentItem = (data!.filter((item) => item.id === id))[0];
    setObjectState(currentItem);
    dispatch(togglePopover());
  }

  function closeHandler() {
    dispatch(togglePopover());
  }

  const handleChange = (e: any) => {
    /* updates local object state*/
    setObjectState({ ...objectState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    /* sends local state object to db */

    try {
      await updateDoc(doc(db, 'recipients', objectState.id), {
        name: objectState.name,
        address: objectState.address,
        phone: objectState.phone,
        city: objectState.city,
        postcode: objectState.postcode,
        email: objectState.email
      })
        .then(() => console.log('data subtmitted:', objectState))

    } catch (error: any) {
      alert(error)

    }
    dispatch(resetForm());
    setObjectState(recipient);
    dispatch(togglePopover());
  }



  async function deleteHandler(e: any, docId: string) {
    /* deletes item directly from db */
    try {
      await deleteDoc(doc(db, 'recipients', docId))
        .then(() => console.log('id:', docId));
    } catch (error: any) {
      console.log(error)
    }
  }

  /*END POPOVER FUNCTIONS */


  return (
    <>
      <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Available Recipients
        </Typography>
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

            {!isFetching && data?.length !== 0 ? (data?.map((item) => (
              <TableRow key={item.id} >
                <TableCell>{item.createdAt}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.postcode}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell><EditIcon className='icon' id={`icon${item.id}`}
                  onClick={(e) => editButtonHandler(e, item.id)} />
                </TableCell>
                <TableCell> <DeleteIcon className='icon' style={{ cursor: 'hover' }} id={`delete${item.id}`} onClick={(e) => deleteHandler(e, item.id)} /></TableCell>
              </TableRow>
            ))) : (<></>)}
          </TableBody>
        </Table>
      </React.Fragment >

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

    </>)

};


export default RecipientsView;