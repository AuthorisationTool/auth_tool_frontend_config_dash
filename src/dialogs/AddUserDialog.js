import React, { useState, useEffect } from "react";
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

export default function AddUserDialog(props) {

  const [open, setopen] = useState(false);
  const [roleList, setroleList] = useState([]);
  const [userForm, setuserForm] = useState({
    name: '',
    confidence: 0,
    mobility:'',
    memberOf: '',
  })
  const [valuetext, setvaluetext] = useState("");
  
  const fetchRoleList =  () => {
      axios.get("http://localhost:8080/policy/role").then((res) => {
      console.log(res);
      setroleList(res.data);
    });
  };

  const handleClickOpen = () => {
    setopen(!open);
  };

  useEffect(() => {
    fetchRoleList();
  }, [])
  


 
   const handleSaveUser = () => {
    createUser(userForm);
    setopen(!open);
    props.clickMe();
  };
 
  const handleChange = (name) => ({ target: { value } }) => {
    setuserForm({
      ...userForm,
      [name]: value,
    })
  };

  
 
   
    const handleSlider = (event,value) => {
      setuserForm({
        ...userForm,
        confidence: value 
      })
      };
    
    return (
      <div align="right" style={{ margin: 10 }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleClickOpen}
        >
          + add new User
        </Button>
        <Dialog
          open={open}
          onClose={handleClickOpen}
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
                  value={userForm.name}
                  onChange={handleChange("name")}
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
                  value={userForm.memberOf}
                  onChange={handleChange("memberOf")}
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
                  value={userForm.mobility}
                  onChange={handleChange("mobility")}
                >
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="abroad">Abroad</MenuItem>
                </Select>
              
            </FormControl>
            </div>
            
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickOpen} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSaveUser}
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

