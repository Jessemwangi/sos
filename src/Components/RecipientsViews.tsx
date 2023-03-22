import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Modal, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { togglePopover, updateAnchorElementId, saveContacts, updateCurrentId } from '../features/manageRecipientsSlice';
import { Recipient } from '../app/model';
import { useFetchRecipientsQuery, useSetRecipientMutation } from '../app/services/firestoreAPI';
import '../styles/RecipientsViews.css';


const RecipientsViews = () => {

  const {
    data,
    isFetching,
    error
  } = useFetchRecipientsQuery();
  console.log(data);

  const dispatch = useDispatch();
  let open = useSelector((state: any) => state.manageRecipients.popoverState);
  let user = useSelector((state: any) => state.user.user);


  function closeHandler() {
    dispatch(togglePopover());
  }


  function editButtonHandler(e: any, id: string) {
    dispatch(togglePopover());
    dispatch(updateCurrentId(id))
  }

  function deleteHandler(e: any, id: string) {


  }

  function handleChange(e: any): any {
    /* setContact({[e.target.name]: e.target.value }); */
  }

  function submitEdits(e: any): any {
    e.preventDefault();
    //TODO: try:
    //dispatch(saveContacts(contacts)) 
    //1. update in store with dispatch(action(payload)
    //2. when store value propates, update firestore with new value from useEffect()
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

          {!isFetching && data && data.map((recipient) => (
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

      <Modal
        className="editPopover"
        open={open}
        onClose={closeHandler}
      >
        {data && data.length > 0 ?
          <form className="editContactForm" onChange={handleChange}>
            <label htmlFor="name">Name</label><input defaultValue={data![0].name} type="text" name="name" id="nameInput"></input>
            <label htmlFor="address">Address</label><input defaultValue={data![0].address} type="text" name="address" id="addressInput"></input>
            <label htmlFor="phone">Phone</label><input type="text" name="phone" id="phoneInput" defaultValue={data![0].phone}
            ></input>
            <label htmlFor="postcode">Postcode</label><input type="text" name="" id="postcodeInput" defaultValue={data![0].postcode}
            ></input>
            <label htmlFor="city"></label>City<input type="text" name="city" id="city"
              defaultValue={data![0].city}
            ></input>
            <Button type="submit" onClick={submitEdits}>Save</Button>
            <Button onClick={closeHandler}>Close</Button>
          </form>
          : <p>Awaiting data</p>
        }
      </Modal >
    </React.Fragment >
  );


};


export default RecipientsViews;