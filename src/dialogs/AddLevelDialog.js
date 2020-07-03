import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle,
   DialogContent, DialogActions, DialogContentText, FormControl,
   FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core';
import {createLevel} from '../services/LevelService';
import axios from 'axios';

export default  function AddLevelDialog({roleid}) {

const [model, setmodel] = useState("");
const [open, setopen] = useState(false);

// TO DO:
// add n number of level in role = request to role controller which responds by the number of the levels
// do it directly here with axios


const handleClickOpen = () => {
  setopen(!open);
}

function handleModelChange(e){
  setmodel(e.target.value);
  console.log(model);
}

const handleSave = () => {
  axios.get(`http://localhost:8080/policy/role/${roleid}/count`).then(res => {
    console.log(res);
    createLevel(roleid,1+res.data,model);
  });

    
}




    return (
        <div align="right" right="100px">
        { (roleid == "no_selected_role")?
        (<><Button variant="contained" disabled='true'  size="small" color="primary" >
        + add level
      </Button></>):<><Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
        + add level
      </Button>
      <Dialog open={open} onClose={handleClickOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add a new level</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the desired Access Control Model for this new Level.
          </DialogContentText>


          <FormControl component="fieldset">
            <FormLabel component="ACM">Access Control Model</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={model} onChange={handleModelChange}>
                 <FormControlLabel value="ProfileBasedAccessControl" control={<Radio />} label="Profile Based Access Control" />
                 <FormControlLabel value="ContextBasedAccessControl" control={<Radio />} label="Context Based Access Control" />
              </RadioGroup>
          </FormControl>
          
          
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={(event) => handleSave()} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog></>}
      </div>
    )
}
