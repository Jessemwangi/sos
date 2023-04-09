import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Dialog, Button } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

import { db } from '../DataLayer/FirestoreInit';
import { useFetchMessagesByIdQuery, resetForm, togglePopover } from '../features/customTextSlice';
import { auth } from '../app/services/FirebaseAuth';
import { CustomText } from '../app/model';


const CustomTextView = () => {
  /** Shows results from database
   * allows user to delete customTexts or edit in popover 
   */

  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  let open: boolean = useSelector((state: any) => state.customText.popoverState);
  const customText: CustomText = useSelector((state: any) => state.customText.customText)
  const [objectState, setObjectState] = useState(customText);

  const {
    data,
    isFetching,
  } = useFetchMessagesByIdQuery({ id: uid });

  function editButtonHandler(e: any, id: string) {
    dispatch(togglePopover());
    const currentItem = (data!.filter((item) => item.cstTextId === id))[0];
    setObjectState(currentItem);

  }

  const handleChange = (e: any) => {
    setObjectState({ ...objectState, [e.target.name]: e.target.value });
  };

  function closeHandler() {
    dispatch(togglePopover());
  }

  async function deleteHandler(e: any, id: string) {
    try {
      await deleteDoc(doc(db, 'customTexts', `${id}`))
        .then(() => console.log('id:', id));
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await updateDoc(doc(db, 'customTexts', objectState.cstTextId), {
        title: objectState.title,
        message: objectState.message,
        default: objectState.default,
      })
    } catch (error: any) {
      alert(error)
    }
    dispatch(resetForm());
    dispatch(togglePopover());
  }


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
              <TableCell><EditIcon style={{ cursor: 'pointer' }} id={`icon${row.cstTextId}`}
                onClick={(e) => editButtonHandler(e, row.cstTextId)} />
              </TableCell>
              <TableCell> <DeleteIcon style={{ cursor: 'pointer' }} id={`delete${row.cstTextId}`} onClick={(e) => deleteHandler(e, row.cstTextId)} /></TableCell>
            </TableRow>
          )))
            : <></>
          }
        </TableBody>
      </Table>
      <Dialog
        className="editMessagesDialog"
        open={open}
        onClose={closeHandler}
        PaperProps={{
          sx: {
            height: '400px'
          }
        }}
      >
        {customText ?
          <form onChange={handleChange}>
            <label htmlFor="name">Title</label><input
              defaultValue={objectState.title}
              type="text"
              name="title"
              id="titleInput"></input>

            <label htmlFor="phone">Message</label><input
              type="text"
              name="message"
              id="messageInput"
              defaultValue={objectState.message}
            ></input>

            <div>
              <Button type="submit" onClick={handleSubmit}>Save</Button>
              <Button onClick={closeHandler}>Close</Button>
            </div>
          </form>
          : <p>Awaiting data</p>
        }
      </Dialog >







    </React.Fragment >
  );
};

export default CustomTextView;