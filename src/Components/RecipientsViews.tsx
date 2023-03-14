import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Popover, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { togglePopover, updateAnchorElementId, saveContacts, updateCurrentId } from '../features/manageRecipientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Recipient } from '../app/model';
import '../styles/RecipientsViews.css';

const generateID: string = Math.floor(Math.random() * 1000000).toString(); //simulate id

const RecipientsViews = () => {
  const dispatch = useDispatch();
  let open = useSelector((state: any) => state.manageRecipients.popoverState);
  const currentAnchorElementId = useSelector((state: any) => state.manageRecipients.currentAnchorElementId);
  let anchorEl = document.getElementById(currentAnchorElementId);

  let recipients: Recipient[] = useSelector((state: any) => state.manageRecipients.recipients);
  //recipients is pulled from store

  let currentId = useSelector((state: any) => state.manageRecipients.currentId);

  const [contacts, setContacts] = useState(recipients); // local state, array is pulled from store

  const tempContactHolder: object = {};


  useEffect(() => {
    dispatch(saveContacts(contacts));
  }, [contacts, dispatch])

  function closeHandler() {
    dispatch(togglePopover());
  }

  function editButtonHandler(e: any) {
    dispatch(updateAnchorElementId(e.currentTarget.id));//for popover placement
    dispatch(togglePopover());
    let ID: string = e.target.id.slice(4);
    console.log(ID);//for debugging
    dispatch(updateCurrentId(ID))
  }

  function deleteHandler(e: any) {
    dispatch(updateAnchorElementId(e.currentTarget.id));
    let ID: string = e.target.id.slice(6);
    console.log(ID);//for debugging
    dispatch(updateCurrentId(ID));
    console.log(recipients[currentId]);//for debugging

    /*    const updatedArray:Recipient[] = recipients.filter(item =>
         item.id !== currentId); 
       setContacts({ ...updatedArray })*/

  }

  function handleChange(e: any): any {
    setContacts({ ...contacts, [e.target.name]: e.target.value });
  }

  function submitEdits(e: any): any {
    e.preventDefault();
    dispatch(saveContacts(contacts))  //TODO send to firebase on submit
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
          {recipients.map((row, i: number) => (
            <TableRow key={row.id} >
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell align="center">{row.postcode}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell><EditIcon id={`icon${row.id}`} onClick={editButtonHandler} />
              </TableCell>
              <TableCell> <DeleteIcon id={`delete${row.id}`} onClick={deleteHandler} /></TableCell>
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
        <form className="editContactForm" onChange={handleChange}>
          <label htmlFor="name">Name</label><input defaultValue={recipients[currentId].name} type="text" name="name" id="nameInput"></input>
          <label htmlFor="address">Address</label><input defaultValue={recipients[currentId].address} type="text" name="address" id="addressInput"></input>
          <label htmlFor="phone">Phone</label><input type="text" name="phone" id="phoneInput" defaultValue={recipients[currentId].phone}
          ></input>
          <label htmlFor="postcode">Postcode</label><input type="text" name="" id="postcodeInput" defaultValue={recipients[currentId].postcode}
          ></input>
          <label htmlFor="city"></label>City<input type="text" name="city" id="city"
            defaultValue={recipients[currentId].city}
          ></input>

          <Button type="submit" onClick={submitEdits}>Save</Button>
          <Button onClick={closeHandler}>Close</Button>
        </form>
      </Popover >
    </React.Fragment >
  );
};

export default RecipientsViews;
