import React, { Component } from 'react'
import {createUser} from '../services/UserService';

export class AddUserDialog extends Component {
state = {
    open: false,
    roleList: [],
    userForm: {
        name: '',
        confidence: '',
        mobility: '',
        memberof: ''
    } 
}

fetchRoleList =  () => {
    axios.get('http://192.168.1.104:8080/policy/role').then(res => {
    console.log(res);
    this.setState({
        roleList: res.data
    })});
  }
handleClickOpen = () => {
    this.fetchRoleList();
    this.setState({
        open: !this.state.open,
    })
}

handleCancel = () => {
  this.setState({
    open: !this.state.open
  })
}

clickMe = () => {this.props.clickMe()}
handleSaveUser = () => {
    let user = {
        "name": `${this.state.userForm.name}`,
        "confidence": `${this.state.userForm.confidence}`,
        "mobility": `${this.state.userForm.mobiltiy}`,
        "memberof": `${this.state.userForm.memberof}`
        }
    createUser(user);
    this.clickMe();
    this.setState({
      open: !this.state.open,
    })
}

handleChange = name => ({target: {value} }) => {
  this.setState({
    userForm: {
    ...this.state.userForm,
    [name] : value,
  }
  })
}
    render() {
        const {open, userForm: {name,confidence,mobility,memberof}, roleList} = this.state;
        
        return(
            <div align="right" style={{margin: 10,}}>
            <Button variant="contained" size="small" color="primary" onClick={this.handleClickOpen}>
              + add new User
            </Button>
            <Dialog open={open} onClose={this.handleClickOpen} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add a new User</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Fill this form below and click on 'SAVE' to create the new User 
                </DialogContentText>
                  <TextField
                     autoFocus
                     margin="dense"
                     id="name"
                     label="Name"
                     fullWidth
                     value={name}
                     onChange={this.handleChange("name")}
                  />


          <Select
                labelId="Mobility"
                id="mobility"
                value={mobility}
                onChange={handleChange("mobility")}
          >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="home">Home</MenuItem>
          <MenuItem value="abroad">Abroad</MenuItem>
        </Select>
        <Typography id="discrete-slider" gutterBottom>
        Confidence %
        </Typography>
        <Slider
          defaultValue={30}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          value={confidence}
          onChange={this.handleChange("confidence")}
          step={10}
          marks
          min={0}
          max={100}
        />

        


        {/* Choose the member of group */}
        <Select
                labelId="Role"
                id="role"
                value={memberof}
                onChange={handleChange("memberof")}
          >
            {roleList.map((role) => {
              <MenuItem value={role.roleId}>{role.roleName}</MenuItem>
            })}
          </Select>

              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSaveUser} color="primary" variant="contained">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
    }
}

export default AddUserDialog

