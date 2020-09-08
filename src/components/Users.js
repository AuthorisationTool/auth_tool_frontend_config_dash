import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Paper, makeStyles, withStyles, TableContainer} from '@material-ui/core'
import Title from './Title';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { useState, useEffect } from 'react';
import AddUserDialog from '../dialogs/AddUserDialog';
import Button from '@material-ui/core/Button';
import {deleteUser} from '../services/UserService';

const Users = () => {

const useStyles =  makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey[300],
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const [userList, setuserList] = useState([]);
const [reupload, setreupload] = useState(true);
const fetchUserList =  () => {
  axios.get('http://localhost:8080/users').then(res => {
  console.log(res);
  setuserList(res.data)});
}

 useEffect(()=>{
   if(reupload){
  fetchUserList();}
  return () => {
    setreupload(false);
  }
 },[reupload]);

 const handleDelete = (id) => {
  deleteUser(id);
  setTimeout(() => {
    setreupload(true);
  },50);
 }


  /*function Roles(){
    function handleAddRole() {
      console.log("add clicked !")
     }*/
     const classes = useStyles();
     return (  
    <Paper elevation={3} className={classes.paper}>
      <Title>Users</Title>
  
       <AddUserDialog clickMe={() => setreupload(true)}/>
      <TableContainer component={Paper}>
      <Table size="small" className={classes.table}>
        <TableHead className={classes.tableHead}>
          <StyledTableRow className={classes.tableHead}>
            
            <StyledTableCell>(ID)</StyledTableCell>
            <StyledTableCell>(Name)</StyledTableCell>
            <StyledTableCell>(Confidence)</StyledTableCell>
            <StyledTableCell>(Mobility) </StyledTableCell>
            <StyledTableCell>(Member of)</StyledTableCell>
            <StyledTableCell align="center"> [ Actions ]</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            userList.map((user) => {
              return(<><StyledTableRow key={user.userID}>
                          
                            <StyledTableCell>{user.userID}</StyledTableCell>
                            <StyledTableCell>{user.name}</StyledTableCell>
                            <StyledTableCell>{user.confidence}</StyledTableCell>
                            <StyledTableCell>{user.mobility}</StyledTableCell>
                            <StyledTableCell>{user.memberOf}</StyledTableCell>

                            <StyledTableCell>
                            <IconButton onClick={handleDelete(user.userID)}>
                                <DeleteForeverIcon color="primary" />
                            </IconButton>
                            </StyledTableCell>
                          </StyledTableRow></>);
               })
          }
        </TableBody>
      </Table>
      </TableContainer>
      
    </Paper>
  );
}
export default Users;