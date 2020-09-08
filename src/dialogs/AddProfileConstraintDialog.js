import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { createConstraint, getConstraintNumber } from "../services/ConstraintService";
import {useState } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';


export default function AddProfileConstraintDialog({ roleid, levelid }) {
  const [open, setopen] = useState(false);
  const actions = [
    {
      name: "read",
      value: "r",
    },
    {
      name: "write",
      value: "w",
    },
    {
      name: "delete",
      value: "d",
    },
    {
      name: "copy",
      value: "c",
    },
    {
      name: "all",
      value: "a",
    },
  ];
  const permissions = [{ name: "allow" }, { name: "deny" }];

  const handleClickOpen = () => {
    setopen(!open);
  };

  const [constraint, setconstraint] = useState({
    id: "",
    permission_or_action: "",
    constraint_type: "ProfileConstraint",
    specific_type: "",
    arg: "",
  });
  const [p_or_a, setp_or_a] = useState("Permission");
  const [mobility, setmobility] = useState("");
  const [type, settype] = useState("Mobility");
  const [openMob, setopenMob] = useState(false);
  const [confidencerange, setconfidencerange] = useState([50, 75]);
  const handleTypeChange = (event) => {
    settype(event.target.value);
  };
  const handleCloseMobSelect = () => {
    setopenMob(false);
  };

  const handleOpenMobSelect = () => {
    setopenMob(true);
  };

  const handleChangeMob = (event) => {
    setmobility(event.target.value);
  };
  
  const handleAuthorizationChange = (event) => {
    setp_or_a(event.target.value);
  };
  

  const handleSaveConstraint = () => {
    switch (type) {
      case "Mobility":
        setconstraint({
          ...constraint,
          id: `${getConstraintNumber(roleid, levelid) + 1}`,
          specific_type: type,
          arg: mobility,
        });
        break;
      case "Confidence":
        setconstraint({
          ...constraint,
          id: `${getConstraintNumber(roleid, levelid) + 1}`,
          specific_type: type,
          arg: `${confidencerange[0]} ${confidencerange[1]}`
        });
        break;
        
    }
    handleClickOpen();
    createConstraint(roleid, levelid, constraint);
  };

  const handleChangePermission = (event) => {
    setconstraint({
      ...constraint,
      permission_or_action: event.target.value,
    })
  };

  const handleChangeAction = () => {}

  return (
    <div>
      <Button variant="outlined" color='primary' size='small'  onClick={handleClickOpen} >Add constraint</Button>
      <Dialog open={open} onClose={handleClickOpen}>
        <DialogTitle>Add a new profile constraint</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill this form and click on Save to create the profile constraint
          </DialogContentText>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Type of profile constraint
              </FormLabel>
              <RadioGroup
                aria-label="gender"
                name="constraintType"
                value={type}
                onChange={handleTypeChange}
              >
                <FormControlLabel
                  value="Mobility"
                  control={<Radio />}
                  label="Mobility"
                />
                <FormControlLabel
                  value="Confidence"
                  control={<Radio />}
                  label="Confidence"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            {(type === "Mobility" && (
              <>
                <FormControl>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openMob}
                    onClose={handleCloseMobSelect}
                    onOpen={handleOpenMobSelect}
                    value={mobility}
                    onChange={handleChangeMob}
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="abroad">Abroad</MenuItem>
                  </Select>
                </FormControl>
              </>
            )) ||
              (type === "Confidence" && (
                <div>
                  <Typography id="range-slider" gutterBottom>
                    Confidence range
                  </Typography>
                  <Slider
                    value={confidencerange}
                    onChange={(event, value) => {setconfidencerange([value[0],value[1]])}}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                  />
                </div>
              ))}
          </div>
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Authorization</FormLabel>
              <RadioGroup
                aria-label="Authorisation"
                name="Authorisation"
                value={p_or_a}
                onChange={handleAuthorizationChange}
              >
                <FormControlLabel
                  value="Action"
                  control={<Radio />}
                  label="Action"
                  disabled
                />
                <FormControlLabel
                  value="Permission"
                  control={<Radio />}
                  label="Permission"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <FormLabel>{p_or_a}</FormLabel>

              {
                (p_or_a === "Permission" && (
                  <>
                    <Select onChange={handleChangePermission}>
                      {permissions.map((p) => (
                        <option value={p.name}>{p.name}</option>
                      ))}
                    </Select>
                  </>
                )) ||
                  (p_or_a === "Action" && (
                    <>
                      <Select onChange={handleChangeAction}>
                        {actions.map((a) => (
                          <option value={a.value}>{a.name}</option>
                        ))}
                      </Select>
                    </>
                  ))
                // Or use instead:
                // {
                // 'permission':<>{permission.map(p => <option value={p.value}>{p.name}</option>)}</>,
                // 'action': <>{action.map(a => <option value={a.value}>{a.name}</option>)}</>
                // }[permission_or_action]
              }
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveConstraint} color="primary">
            Save
          </Button>
          {/* <Button
            onClick={(event) => this.handleSave(rolename, argument)}
            color="primary"
            variant="contained"
          >
            Save
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
