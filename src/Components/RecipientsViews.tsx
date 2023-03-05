import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import EditIcon from '@mui/icons-material/Edit';
import { Popover, Button } from '@mui/material';
import { TurnedIn } from "@mui/icons-material";
import { togglePopover, anchorElement } from '../features/manageRecipientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/RecipientsViews.css';


const RecipientsViews = () => {
  const dispatch = useDispatch();
  const popoverState = useSelector((state: any) => state.manageRecipients.popoverState);
  const anchorElementState = useSelector((state: any) => state.manageRecipients.anchorElementState)
  // GEt data from firebase for the active user stored in userslice the map it
  const rows = [
    {
      id: "0",
      createdAt: "16 Mar, 2019",
      name: "Vernon Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: "1",
      createdAt: "16 Mar, 2019",
      name: "Lisa-Marie Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: "2",
      createdAt: "16 Mar, 2019",
      name: "Gladys Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: "3",
      createdAt: "16 Mar, 2019",
      name: "Elvis Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: "4",
      createdAt: "16 Mar, 2019",
      name: "Priscilla Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
  ];

  function closeHandler() {
    console.log('close');
    dispatch(togglePopover());
    console.log(popoverState);
  }

  function editHandler(e: any) {
    console.log(e.target.id)
    dispatch(togglePopover());
    dispatch(anchorElement(e.target.id));
    console.log(popoverState);

  }

  function saveEdits(): any {
    console.log('save edits')
  }

  let open = popoverState;
  let anchorEl = document.getElementById(anchorElementState);



  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Available Recipients
      </Typography>

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
              <TableCell>{row.call}</TableCell>
              <TableCell align="center">${row.postalCode}</TableCell>
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
        //id={popoverId}
        sx={{
          height: '500px',
          width: '800px',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}><div>
          <label htmlFor="name" ></label><input id="name"></input>
          <label htmlFor="call"></label><input id="call"></input>
          <label htmlFor="address"></label><input id="address"></input>
          <Button onClick={saveEdits}>Save</Button>
          <Button onClick={closeHandler}>Close</Button></div>
      </Popover>
    </React.Fragment>
  );
};

export default RecipientsViews;
