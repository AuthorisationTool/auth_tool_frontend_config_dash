import React, { Component } from "react";
import { createUser } from "../services/UserService";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export class AddUserDialog extends Component {
  state = {
    open: false,
    roleList: [],
    userForm: {
      name: "",
      confidence: 0,
      mobility: "",
      memberOf: "",
    },
    valuetext: "",
  };

  fetchRoleList = () => {
    axios.get("http://127.0.0.1:8080/policy/role").then((res) => {
      console.log(res);
      this.setState({
        roleList: res.data,
      });
    });
  };
  handleClickOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  };


  clickMe = () => {
    this.props.clickMe();
  };
 /*  handleSaveUser = () => {
    let user = {
      name: `${this.state.userForm.name}`,
      confidence: `${this.state.userForm.confidence}`,
      mobility: `${this.state.userForm.mobiltiy}`,
      memberOf: `${this.state.userForm.memberOf}`,
    };
    createUser(user);
    this.clickMe();
    this.setState({
      open: !this.state,
    });
  };
 */
handleSaveUser = () => {
    Object.keys(this.state.userForm).map(key => {
      console.log(this.state.userForm[key]);
    })
}
  handleChange = (name) => ({ target: { value } }) => {
    
    this.setState({
      userForm: {
        ...this.state.userForm,
        [name]: value,
      },
    });
  };

  render() {
    let {
      open,
      userForm: { name, confidence, mobility, memberOf },
      roleList,
    } = this.state;
   
    const handleSlider = (event,value) => {
      this.setState({
        userForm: {
          ...this.state.userForm,
          confidence: value,
        },
      });
    }
    return (
      <div align="right" style={{ margin: 10 }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={this.handleClickOpen}
        >
          + add new User
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClickOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a new User</DialogTitle>
          <DialogContent>
            <div style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <DialogContentText style={{bottom: 30}}>
              Fill this form below and click on 'SAVE' to create the new User
            </DialogContentText>
            <div style={{bottom: 30}}> 
            <FormControl>
              <FormLabel>
                Name
              </FormLabel>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={name}
                  onChange={this.handleChange("name")}
                />
              
            </FormControl>
            <FormControl style= {{bottom: 10,width: 100,marginLeft: 10}}>
            
            <FormLabel>
                Assigned role
              </FormLabel>
                {/* Choose the member of group */}
                <Select
                  labelId="Role"
                  id="role"
                  value={memberOf}
                  onChange={this.handleChange("memberOf")}
                >
                  {roleList.map((role) => {
                    return (
                      <MenuItem value={role.roleId}>
                        {role.roleName}
                      </MenuItem>
                    );
                  })}
                </Select>
             
            </FormControl>
            </div>
             
              <div style= {{top: 30}}>
            <FormControl>
              <FormLabel>
                Confidence
              </FormLabel>
                <Slider
                  defaultValue={30}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  onChange={handleSlider}
                  style={{width: 200}}
                  min={0}
                  max={100}
                />
            </FormControl>
            </div>
              <div>
            <FormControl>
            <FormLabel>
                Mobility
              </FormLabel>
                <Select
                  margin="dense"
                  labelId="Mobility"
                  id="mobility"
                  style={{width: 200}}
                  value={mobility}
                  onChange={this.handleChange("mobility")}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="abroad">Abroad</MenuItem>
                </Select>
              
            </FormControl>
            </div>
            
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClickOpen} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSaveUser}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddUserDialog;
