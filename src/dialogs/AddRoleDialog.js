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
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

export default class AddRoleDialog extends Component{
state = {
    open: false,
    roleForm: {
      rolename:'',
      classification:'',
      argument:''
    }
}
 handleClickOpen = () => {
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

    const {open, roleForm: {rolename,classification,argument}} = this.state
    

    return(
        <div align="right">
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          + add new Role
        </Button>
        <Dialog open={open} onClose={this.handleClickOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new Role</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill this form below and click on 'SAVE' to create the Role 
            </DialogContentText>
            <FormControl style={{top: 11,}}>
            <FormLabel>Name of role</FormLabel>
            <TextField
              autoFocus
              margin="dense"
              id="rolename"
              type="text"
              value={rolename}
              onChange={this.handleChange("rolename")}
              fullWidth
              className="textff"
            />
            <FormHelperText id="my-helper-text" color="red">*Required</FormHelperText>
           </FormControl>
           <FormControl >
           <FormLabel>Metadata classification</FormLabel>
        <Select native required="true" label="Metadata classification" id="grouped-native-select">
          <option aria-label="None" value="Metadata classification" />
          <optgroup label="Type">
            <option value={argument}>Web application</option>
            <option value={argument}>Business plan</option>
            <option value={argument}>Contracts</option>
            <option value={argument}>Clients</option>
          </optgroup>
          <optgroup label="Category">
            <option value={argument}>Administrative</option>
            <option value={argument}>Business</option>
          </optgroup>
          <optgroup label="Sensitivity">
            <option value={argument}>very sensitive</option>
            <option value={argument}>sensitive</option>
            <option value={argument}>only internal use</option>
            <option value={argument}>business external use</option>
          </optgroup>
          <optgroup label="Owners">
            <option value={7}>Owners</option>
          </optgroup>
        </Select>
        <FormHelperText id="my-helper-text" color="red">*Required</FormHelperText>
        </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickOpen} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClickOpen} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}    
}
