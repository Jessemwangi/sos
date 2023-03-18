import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Popover, Button } from '@mui/material';
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
  const currentAnchorElementId: string = useSelector((state: any) => state.manageRecipients.currentAnchorElementId);
  let anchorEl = document.getElementById(currentAnchorElementId);
  let currentId = useSelector((state: any) => state.manageRecipients.currentId);


  function closeHandler() {
    dispatch(togglePopover());
  }

  function editButtonHandler(e: any) {
    dispatch(updateAnchorElementId(e.currentTarget.id));//for popover placement
    dispatch(togglePopover());
    let ID: string = e.target.id.slice(4);
    dispatch(updateCurrentId(ID))
  }

  function deleteHandler(e: any) {
    dispatch(updateAnchorElementId(e.currentTarget.id));
    let ID: string = e.target.id.slice(6);
    dispatch(updateCurrentId(ID));

  }

  function handleChange(e: any): any {
    /* setContact({[e.target.name]: e.target.value }); */
  }

  function submitEdits(e: any): any {
    e.preventDefault();
    //dispatch(saveContacts(contacts))  //TODO send to firebase on submit
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
              <TableCell><EditIcon id={`icon${recipient.id}`} onClick={editButtonHandler} />
              </TableCell>
              <TableCell> <DeleteIcon id={`delete${recipient.id}`} onClick={deleteHandler} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Popover
        className="editPopover"
        open={open}
        onClose={closeHandler}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
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
      </Popover >
    </React.Fragment >
  );


};


export default RecipientsViews;