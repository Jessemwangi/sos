import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const RecipientsViews = () => {

    // GEt data from firebase for the active user stored in userslice the map it
  const rows = [
    {
      id: 0,
      createdAt: "16 Mar, 2019",
      name: "Elvis Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: 1,
      createdAt: "16 Mar, 2019",
      name: "Elvis Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: 2,
      createdAt: "16 Mar, 2019",
      name: "Elvis Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: 3,
      createdAt: "16 Mar, 2019",
      name: "Elvis Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
    {
      id: 4,
      createdAt: "16 Mar, 2019",
      name: "Elvis Presley",
      residents: "Tupelo, MS",
      call: "371956444",
      address: "312.44",
      city: "helsinki",
      postalCode: "00510",
    },
  ];
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
            <TableRow key={row.id}>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.address}</TableCell>
              <TableCell>{row.call}</TableCell>
              <TableCell align="center">${row.postalCode}</TableCell>
              <TableCell>{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default RecipientsViews;
