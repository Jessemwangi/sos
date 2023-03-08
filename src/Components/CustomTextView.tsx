import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { customTexts } from '../app/model';

const CustomTextView = () => {
  const rows: customTexts[] = []
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Available Text
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.cstTextId}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.message}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default CustomTextView;