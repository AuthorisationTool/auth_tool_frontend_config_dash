import React from 'react';
import { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';


const RoleList = () => {
const [roleList, setroleList] = useState([]);
const fetchRoleList = () => {
  axios.get('http://localhost:8080/policy/role').then(res => {
  console.log(res);
  setroleList(res.data)})
}
useEffect(() => {
  fetchRoleList();
 }, []);
 return roleList.map((role,index) => {
return(<><TableRow key={index}>
              <TableCell>{role.roleId}</TableCell>
              <TableCell>{role.roleName}</TableCell>
              <TableCell>{role.rscl.classification}</TableCell>
              <TableCell align="right">{role.rscl.classification_arg}</TableCell>
            </TableRow></>);
 });
}
  function Roles(){
     return (  
    <React.Fragment>
      <Title>Roles (Mapped with metadata: classification and argument)</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Classification</TableCell>
            <TableCell align="right">Argument</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RoleList/>
        </TableBody>
      </Table>
      <div>
        <Link color="primary" href="#">
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
export default Roles;