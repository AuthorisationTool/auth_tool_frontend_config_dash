import React from 'react';
import { useEffect, useState } from 'react';
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
import {deleteRole} from '../services/RoleService';
import Button from '@material-ui/core/Button';
import AddRoleDialog from '../dialogs/AddRoleDialog';
import UpdateRoleDialog from '../dialogs/UpdateRoleDialog';
import { Link } from 'react-router-dom';


const Roles = () => {

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

const [roleList, setroleList] = useState([]);
const [reupload, setreupload] = useState(false);
const fetchRoleList =  () => {
  axios.get('http://127.0.0.1:8080/policy/role').then(res => {
  console.log(res);
  setroleList(res.data)});
}
useEffect(() => {
  fetchRoleList();
 },[]);

 useEffect(()=>{
  fetchRoleList();
  return () => {
    setreupload(false);
  }
 },[reupload]);

 const handleDelete = (id) => {
  deleteRole(id);
  setTimeout(() => {
    setreupload(true);
  },50);
 }
    const handleManageLevels = (roleid) => {

    }


  /*function Roles(){
    function handleAddRole() {
      console.log("add clicked !")
     }*/
     const classes = useStyles();
     return (  
    <Paper elevation={3} className={classes.paper}>
      <Title>Roles (Mapped with metadata: classification and argument)</Title>
  
       <AddRoleDialog clickMe={() => setreupload(true)}/>
      <TableContainer component={Paper}>
      <Table size="small" className={classes.table}>
        <TableHead className={classes.tableHead}>
          <StyledTableRow className={classes.tableHead}>
            
            <StyledTableCell>(Identifier)</StyledTableCell>
            <StyledTableCell>(Name)</StyledTableCell>
            <StyledTableCell>(Classification)</StyledTableCell>
            <StyledTableCell>(Argument) </StyledTableCell>
            <StyledTableCell align="center"> [ Actions ]</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {
            roleList.map((role) => {
              return(<><StyledTableRow key={role.roleId}>
                          
                            <StyledTableCell>{role.roleId}</StyledTableCell>
                            <StyledTableCell>{role.roleName}</StyledTableCell>
                            <StyledTableCell>{role.rscl.classification}</StyledTableCell>
                            <StyledTableCell>{role.rscl.classification_arg}</StyledTableCell>
                            <StyledTableCell>
                            <Button variant="outlined"
                             color="primary"
                             size="small"
                             component={Link} to={{
                               pathname: "/Levels",
                               state : {
                                 roleid: `${role.roleId}`
                               }
                             }} >
                              Manage Levels
                            </Button>
                            <UpdateRoleDialog roleId={role.roleid} rolename={role.roleName} argument={role.rscl.classification_arg}/>
                            <IconButton onClick={ event => {handleDelete(role.roleId);}}>
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
export default Roles;