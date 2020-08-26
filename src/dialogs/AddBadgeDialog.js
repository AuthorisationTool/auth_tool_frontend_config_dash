import React, { Component } from 'react'
import Axios from 'axios'

export default class AddBadgeDialog extends Component {
    state = {
        open: false,
        userList: [],
        badgeForm: {
            bid: '',
        holder_uid: ''}
    }

    fetchUserList = () => {
        Axios.get('http://localhost:8080/users').then( res => {
            this.setState({
                userList: res.data,
            });
        })
    }

    handleClickOpen = () =>{

        this.fetchUserList();
        this.setState({
            open: !this.state.open,
        })
    }

    


    render() {

        const {open, userList, badgeForm: {bid,holder_uid}} = this.state;
        return (
            <div>
                 <Button variant="contained" size="small" color="primary" onClick={this.handleClickOpen}>
                  Scan 
              </Button>
        <Dialog open={open} onClose={this.handleClickOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new badge</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Fill this form below and click on 'SAVE' to save the Badge 
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
           
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickOpen} color="primary">
              Cancel
            </Button>
            <Button onClick={(event) => this.handleSave(rolename,argument)} color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>
            </div>
        )
    }
}
