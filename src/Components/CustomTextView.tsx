import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Grid } from '@mui/material';
import { CustomText } from '../app/model';
import { useFetchMessagesByIdQuery } from '../features/customTextSlice';
import { auth } from '../app/services/FirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';


const CustomTextView = () => {

  //fetch customTexts from db
  //display in table

  const [user] = useAuthState(auth);
  const uid = user?.uid;

  const {
    data,
    isFetching,
    error
  } = useFetchMessagesByIdQuery({ id: uid });

  //  if (error) { return (<>Error loading data</>) }

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
          {!isFetching && data?.length !== 0 ? (data?.map((row) => (
            <TableRow key={row.cstTextId}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.message}</TableCell>
            </TableRow>
          )))
            : <></>
          }
        </TableBody>
      </Table>


    </React.Fragment >
  );
};

export default CustomTextView;