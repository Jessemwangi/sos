import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from '@mui/icons-material/Edit';
import { Popover, Button, Grid, TextField } from '@mui/material';
import { togglePopover, updateAnchorElement, setContact } from '../features/manageRecipientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/RecipientsViews.css';
import { rowsArray } from './rows';

const RecipientsViews = () => {
  const dispatch = useDispatch();
  let open = useSelector((state: any) => state.manageRecipients.popoverState);
  const currentAnchorElement = useSelector((state: any) => state.manageRecipients.currentAnchorElement)
  let anchorEl = document.getElementById(currentAnchorElement);

  // Get data from firebase for the active user
  const rows = rowsArray;

  function closeHandler() {
    dispatch(togglePopover());
  }

  function editHandler(e: any) {
    console.log(e.target.id)
    dispatch(togglePopover());
    dispatch(updateAnchorElement(e.target.id));

  }

  function handleChange(e: any): any {
    console.log(e.target.value);
    dispatch(setContact({ [e.target.name]: e.target.value }))
  }

  function submitEdits(e: any): any {
    e.preventDefault();
    //TODO send to firebase on submit
    console.log('save edits')
    console.log(rows[currentAnchorElement]);
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
          {rows.map((row) => (
            <TableRow key={row.id} id={row.id}>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell align="center">${row.postcode}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell><EditIcon id={row.id} onClick={editHandler} /></TableCell>
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
        <form><Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item> <TextField
            id="nameInput"
            name="name"
            label="Name"
            type="text"
            defaultValue={rows[currentAnchorElement].name}
            onChange={handleChange}
          /></Grid>
          <Grid item>
            <TextField
              id="addressInput"
              name="address"
              label="Address"
              type="text"
              defaultValue={rows[currentAnchorElement].address}
              onChange={handleChange}>
            </TextField></Grid>
          <Grid item>
            <TextField
              id="phoneInput"
              name="phone"
              label="Phone"
              type="text"
              defaultValue={rows[currentAnchorElement].phone}
              onChange={handleChange}>
            </TextField></Grid>
          <Grid item>
            <TextField
              id="postcodeInput"
              name="postcode"
              label="Postcode"
              type="text"
              defaultValue={rows[currentAnchorElement].postcode}
              onChange={handleChange}>
            </TextField></Grid>
          <Grid item>
            <TextField
              id="city"
              name="city"
              label="City"
              type="text"
              defaultValue={rows[currentAnchorElement].city}
              onChange={handleChange}>
            </TextField></Grid>

          <Button type="submit" onClick={submitEdits}>Save</Button>
          <Button onClick={closeHandler}>Close</Button>
        </Grid></form>
      </Popover>
    </React.Fragment>
  );
};

export default RecipientsViews;
