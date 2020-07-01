import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select'
import { FormControl } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import {createRole, updateRole} from '../services/RoleService'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import IconButton from '@material-ui/core/IconButton';

export default class UpdateRoleDialog extends Component{
state = {
    open: false,
    roleForm: {
      rolename:'',
      argument:''
    }
}
 handleClickOpen = () => {
    this.setState({
        open: !this.state.open,
    })
}

clickMe = () => {
  this.props.clickMe()
}

handleSave = (roleId,rolename,argument) => {
  updateRole(roleId,rolename,argument);
  this.clickMe();
  this.setState({
    open: !this.state.open,
  })
  
}

handleChange = name => ({target: {value} }) => {
  this.setState({
    roleForm: {
    ...this.state.roleForm,
    [name] : value,
  }
  })
}

render(){

    const {open, roleForm: {rolename,argument}} = this.state
    

    return(
        <>
        <IconButton onClick={this.handleClickOpen}>
                              <BorderColorIcon color="primary"/>
                            </IconButton>
        <Dialog open={open} onClose={this.handleClickOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new Role</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill this form and click on 'APPLY' to save changes 
            </DialogContentText>
            <FormControl style={{top: 11,}}>
            <FormLabel>Name of role</FormLabel>
            <TextField
              autoFocus
              margin="dense"
              id="rolename"
              type="text"
              value={this.props.rolename}
              onChange={this.handleChange("rolename")}
              fullWidth
              className="textff"
            />
            <FormHelperText id="my-helper-text">*Required</FormHelperText>
           </FormControl>
           <FormControl >
           <FormLabel>Metadata classification</FormLabel>
        <Select native required="true" value={this.props.argument} onChange={this.handleChange("argument")} label="Metadata classification" id="grouped-native-select">
          <option aria-label="None" value="Metadata classification" />
          <optgroup label="Type">
            <option value="web_application">Web application</option>
            <option value="business_plan">Business plan</option>
            <option value="contracts">Contracts</option>
            <option value="client_records">Clients records</option>
            <option value="financial_documents">Financial documents</option>
          </optgroup>
          <optgroup label="Category">
            <option value="administrative">Administrative</option>
            <option value="business">Business</option>
          </optgroup>
          <optgroup label="Sensitivity">
            <option value="very_sensitive">very sensitive</option>
            <option value="sensitive">sensitive</option>
            <option value="internal_use">only internal use</option>
            <option value="business_external_use">business external use</option>
          </optgroup>
          <optgroup label="Owners">
            <option value="owners">Owners</option>
          </optgroup>
        </Select>
        <FormHelperText id="my-helper-text" color="red">*Required</FormHelperText>
        </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickOpen} color="primary">
              Cancel
            </Button>
            <Button onClick={(event) => this.handleUpdate(this.props.roleId,this.props.rolename,this.props.argument)} color="primary" variant="contained">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
}    
}
