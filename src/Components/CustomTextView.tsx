import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, TextField, Button } from '@mui/material';
import { customText } from '../app/model';

const CustomTextView = () => {
  const rows: customText[] = []

  //fetch customTexts from db
  //display in table
  //form for adding new custom text

  const [buttonAction, setButtonAction] = useState<string>('Save Text')

  function handleChange(e: any) { }


  function handleSubmit(e: any) { }


  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Available Messaging Text
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length !== 0 ? (rows.map((row) => (
            <TableRow key={row.cstTextId}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.message}</TableCell>
            </TableRow>
          )))
            : <></>
          }
        </TableBody>
      </Table>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="messageTitle"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
            name='messageTitle'
            label="Title"
            fullWidth
            autoComplete="cc-messageTitle"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="message"
            name='message'
            label="Message"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
            fullWidth
            autoComplete="cc-message"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={(e) => handleSubmit(e)}
            sx={{ mt: 3, ml: 1 }}
          >
            {buttonAction}
          </Button>
        </Grid>
      </Grid>

    </React.Fragment>
  );
};

export default CustomTextView;