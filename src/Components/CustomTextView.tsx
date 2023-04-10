import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useFetchMessagesByIdQuery } from '../features/customTextSlice';
import { auth } from '../app/services/FirebaseAuth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const CustomTextView = () => {

  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const reload = useSelector((state: any) => state.customText.reload)
  const [shouldReload, setShouldReload] = useState(0);

  const {
    data,
    isFetching,
  } = useFetchMessagesByIdQuery({ id: uid });

  const editButtonHandler = (e: any, id: string) => {
    console.log('edit')
    //TODO
  }

  const deleteHandler = (e: any, id: string) => {
    console.log('delete')
    //TODO
  }

  //TOFIX not rerendering on update
  useEffect(() => { setShouldReload((shouldReload + 1)) }, [reload])

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
              <TableCell><EditIcon id={`icon${row.cstTextId}`}
                onClick={(e) => editButtonHandler(e, row.cstTextId)} />
              </TableCell>
              <TableCell> <DeleteIcon id={`delete${row.cstTextId}`} onClick={(e) => deleteHandler(e, row.cstTextId)} /></TableCell>
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