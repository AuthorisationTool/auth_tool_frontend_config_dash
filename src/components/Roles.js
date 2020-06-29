import React from 'react';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import {deleteRole} from '../services/RoleService';
import Button from '@material-ui/core/Button';
import AddRoleDialog from '../dialogs/AddRoleDialog';
import UpdateRoleDialog from '../dialogs/UpdateRoleDialog';

const Roles = () => {
const [roleList, setroleList] = useState([]);
const [reupload, setreupload] = useState(false);
const fetchRoleList =  () => {
  axios.get('http://192.168.1.104:8080/policy/role').then(res => {
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



  /*function Roles(){
    function handleAddRole() {
      console.log("add clicked !")
     }*/
     
     return (  
    <React.Fragment>
      <Title>Roles (Mapped with metadata: classification and argument)</Title>
  
       <AddRoleDialog clickMe={() => setreupload(true)}/>
        
      <Table size="small">
        <TableHead>
          <TableRow>
            
            <TableCell>(Identifier)</TableCell>
            <TableCell>(Name)</TableCell>
            <TableCell>(Classification)</TableCell>
            <TableCell>(Argument) </TableCell>
            <TableCell align="center"> [ Actions ]</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            roleList.map((role,index) => {
              return(<><TableRow key={index}>
                          
                            <TableCell>{role.roleId}</TableCell>
                            <TableCell>{role.roleName}</TableCell>
                            <TableCell>{role.rscl.classification}</TableCell>
                            <TableCell>{role.rscl.classification_arg}</TableCell>
                            <TableCell>
                            <Button variant="outlined" color="primary">
                              Manage Levels
                            </Button>
                            <IconButton onClick={ event => {handleDelete(role.roleId);}}>
                                <DeleteForeverIcon color="primary" />
                            </IconButton>
                            <UpdateRoleDialog roleId={role.roleid} rolename={role.roleName} argument={role.rscl.classification_arg}/>
                            </TableCell>
                          </TableRow></>);
               })
          }
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}
export default Roles;