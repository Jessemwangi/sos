import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Popover, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { togglePopover, updateAnchorElementId, saveContact, updateCurrentIndex } from '../features/manageRecipientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Recipient } from '../app/model';
import '../styles/RecipientsViews.css';

const RecipientsViews = () => {
  const dispatch = useDispatch();
  let open = useSelector((state: any) => state.manageRecipients.popoverState);
  const currentAnchorElementId = useSelector((state: any) => state.manageRecipients.currentAnchorElementId);
  let anchorEl = document.getElementById(currentAnchorElementId);
  let recipients: Recipient[] = useSelector((state: any) => state.manageRecipients.recipients);
  let currentIndex = useSelector((state: any) => state.manageRecipients.currentIndex);


  // TODO: Get data from firebase for the active user

  const [contact, setContact] = useState(recipients[currentIndex]);

  function closeHandler() {
    dispatch(togglePopover());
  }

  function editHandler(e: any) {
    dispatch(updateAnchorElementId(e.currentTarget.id));
    dispatch(togglePopover());
    let index: number = Number(e.target.id.slice(4));
    console.log(index);//for debugging
    dispatch(updateCurrentIndex(index))
  }

  function handleChange(e: any): any {
    // console.log(e.target.value);
    // console.log(recipients[currentIndex]);
    setContact({ ...contact, [e.target.name]: e.target.value });
    console.log(contact);
  }

  function submitEdits(e: any): any {
    e.preventDefault();
    console.log(recipients[currentIndex]);
    dispatch(saveContact(contact))  //TODO send to firebase on submit
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
            <TableCell align="right">Post Code</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipients.map((row) => (
            <TableRow key={row.id} >
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell align="center">{row.postcode}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell><EditIcon id={`icon${row.id}`} onClick={editHandler} /></TableCell>
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
        <form className="editContactForm">
          <label htmlFor="name">Name</label><input defaultValue={recipients[currentIndex].name} type="text" name="name" id="nameInput" onChange={handleChange}></input>
          <label htmlFor="address">Address</label><input defaultValue={recipients[currentIndex].address} type="text" name="address" id="addressInput" onChange={handleChange}></input>
          <label htmlFor="phone">Phone</label><input type="text" name="phone" id="phoneInput" defaultValue={recipients[currentIndex].phone}
            onChange={handleChange}></input>
          <label htmlFor="postcode">Postcode</label><input type="text" name="" id="postcodeInput" defaultValue={recipients[currentIndex].postcode}
            onChange={handleChange}></input>
          <label htmlFor="city"></label>City<input type="text" name="city" id="city"
            defaultValue={recipients[currentIndex].city}
            onChange={handleChange}></input>

          <Button type="submit" onClick={submitEdits}>Save</Button>
          <Button onClick={closeHandler}>Close</Button>
        </form>
      </Popover >
    </React.Fragment >
  );
};

export default RecipientsViews;
