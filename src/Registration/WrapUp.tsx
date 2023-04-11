import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/services/FirebaseAuth";
import { useFetchMessagesByIdQuery } from "../features/customTextSlice";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useFetchRecipientsByIdQuery } from "../features/manageRecipientsSlice";

const WrapUp = () => {
  const [user] = useAuthState(auth);
  const uid = user?.uid;
  const messages_Data = useFetchMessagesByIdQuery({ id: uid });
  const recipients_Data = useFetchRecipientsByIdQuery({ id: uid });
  const messages = messages_Data.data;
  const recipients = recipients_Data.data;
  console.log(recipients);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#9F1EB4",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const legendCss = {
    padding: "1rem",
    marginBottom: "2rem",
  };

  if (!user) {
    return (
      <>
        <h3>Please log in first to manage your profile.</h3>
      </>
    );
  }
  return (
    <div style={{ padding: "1rem" }}>
      <fieldset style={legendCss}>
        <legend>Contact List</legend>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">Email Address</StyledTableCell>
                <StyledTableCell align="center">Contact</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipients &&
                recipients.map((rcp) => (
                  <StyledTableRow key={rcp.id}>
                    <StyledTableCell component="th" scope="row">
                      {rcp.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {rcp.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {rcp.phone}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </fieldset>
      <fieldset style={legendCss}>
        <legend>SOS Custom Messages</legend>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages &&
                messages.map((msg) => (
                  <StyledTableRow key={msg.id}>
                    <StyledTableCell component="th" scope="row">
                      {msg.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {msg.message}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </fieldset>
      <fieldset style={legendCss}>
        <legend>SOS pre-Configured Distress Signal</legend>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">Title</StyledTableCell>
                <StyledTableCell align="center">Message</StyledTableCell>
                <StyledTableCell align="center">Default</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages &&
                messages.map((msg) => (
                  <StyledTableRow key={msg.id}>
                    <StyledTableCell component="th" scope="row">
                      {msg.id}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {msg.title}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {msg.message}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {msg.default}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </fieldset>
    </div>
  );
};

export default WrapUp;
