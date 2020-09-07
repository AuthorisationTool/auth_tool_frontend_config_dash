import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControlLabel,
  Slider,
  Select,
  DialogActions,
  Radio,
  RadioGroup,
  FormControl,
  Button,
  FormLabel,
  Typography,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import {
  getConstraintNumber,
  createConstraint,
} from "../services/ConstraintService";
import makeStyles from 'react';
import {useState} from 'react';

export default function AddEnvironmentConstraintDialog({ roleid, levelid }) {
   const [open, setopen] = useState(false);
  const [action, setaction] = useState("a");
  const [accelerationvalues, setaccelerationvalues] = useState({
    minx: -2,
    miny: 2,
    minz: -2,
    maxx: 2,
    maxy: -2,
    maxz: 2,
  });
  const [accelerationX, setaccelerationX] = useState([-2, 2]);
  const [accelerationY, setaccelerationY] = useState([-2, 2]);
  const [accelerationZ, setaccelerationZ] = useState([-2, 2]);

  const [gyroX, setgyroX] = useState([-2, 2]);
  const [gyroY, setgyroY] = useState([-2, 2]);
  const [gyroZ, setgyroZ] = useState([-2, 2]);

  const [agentLocation, setagentLocation] = useState({
    longitude: 112.1541561,
    latitude: 152.515,
    diameter: 12.0,
  });

  const [gyrovalues, setgyrovalues] = useState({
    minx: -2,
    miny: 2,
    minz: -2,
    maxx: 2,
    maxy: -2,
    maxz: 2,
  });
  // for gyro & acceleration values
  const valuestext = (value) => {
    return `${value.minx} ${value.miny} ${value.minz} ${value.maxx} ${value.maxy} ${value.maxz}`;
  };

  // for agentLocation values
  const agentLocationText = (value) => {
    return `${value.longitude} ${value.latitude}`;
  };

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

  const constraintTypes = [
    {
      name: "",
      value: "",
    },
    {
      name: "Acceleration",
      value: "Acceleration",
    },
    {
      name: "Gyro",
      value: "Gyro",
    },
    {
      name: "Agent Location",
      value: "AgentLocation",
    },
    {
      name: "Time of Request",
      value: "TimeOfRequest",
    },
  ];

  const handleClickOpen = () => {
    setopen(!open);
  };

  const [constraint, setconstraint] = useState({
    id: "",
    permission_or_action: "",
    constraint_type: "EnvironmentConstraint",
    specific_type: "",
    arg: "",
  });
  const [p_or_a, setp_or_a] = useState("Permission");
  const [permission, setpermission] = useState("allow");
  const [type, settype] = useState("");

  const handleAuthorizationChange = (event) => {
    setp_or_a(event.target.value);
  };

  const handleTypeChange = (event) => {
    settype(event.target.value);
  };

  const handleSaveConstraint = () => {
    switch (type) {
      case "Gyro":
        setconstraint({
          ...constraint,
          id: `${getConstraintNumber(roleid, levelid) + 1}`,
          permission_or_action: p_or_a,
          specific_type: type,
          arg: valuestext(gyrovalues),
        });
      case "Acceleration":
        setconstraint({
          ...constraint,
          id: `${getConstraintNumber(roleid, levelid) + 1}`,
          permission_or_action: p_or_a,
          specific_type: type,
          arg: valuestext(accelerationvalues),
        });
      case "AgentLocation":
        setconstraint({
          ...constraint,
          id: `${getConstraintNumber(roleid, levelid) + 1}`,
          permission_or_action: p_or_a,
          specific_type: type,
          arg: agentLocationText(agentLocation),
        });
    }
  };

  const handleChangePermission = (event) => {
    setpermission(event.target.value);
  };

  const handleChangeAction = (event) => {
    setaction(event.target.value);
  };

  return (
    <div>
      <Button size='small' variant='outlined'  onClick={handleClickOpen} >Add constraint</Button>
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
                {constraintTypes.map((type) => {
                  return (
                    <FormControlLabel
                      value={type.value}
                      control={<Radio />}
                      label={type.name}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
          {/* here type your constraint type config inputs */}
          <div>
            {
              // must change ID
              {
                'Acceleration': (
                  <>
                    <Typography id="range-slider-acc-x" gutterBottom>
                      Acceleration on axe X
                    </Typography>
                    <Slider
                      value={accelerationX}
                      onChange={(event, value) => {
                        setaccelerationX([value[0],value[1]])
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider-acc-x"
                    />
                    <Typography id="range-slider-acc-y" gutterBottom>
                      Acceleration on axe Y
                    </Typography>
                    <Slider
                      value={accelerationY}
                      onChange={(event, value) => {
                          setaccelerationY([value[0],value[1]])
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider-acc-y"
                    />

                    <Typography id="range-slider-acc-z" gutterBottom>
                      Acceleration on axe Z
                    </Typography>
                    <Slider
                      value={accelerationZ}
                      onChange={(event, value) => {
                        setaccelerationZ([value[0],value[1]])
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider-acc-z"
                    />
                  </>
                ),

                'Gyro': (
                  <>
                    <Typography id="range-slider-gyro-x" gutterBottom>
                      Gyro on axe X
                    </Typography>
                    <Slider
                      value={gyroX}
                      onChange={(event,value) => {
                      setgyroX([value[0],value[1]])
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider-gyro-x"
                    />
                    <Typography id="range-slider-gyro-y" gutterBottom>
                      Gyro on axe Y
                    </Typography>
                    <Slider
                      value={gyroY}
                      onChange={(event,value) => {
                        setgyroY([value[0],value[1]]);
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider-gyro-y"
                    />
                    <Typography id="range-slider-gyro-x" gutterBottom>
                      Gyro on axe X
                    </Typography>
                    <Slider
                      value={gyroZ}
                      onChange={(event,value) => {
                        setgyroZ([value[0],value[1]])
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider-gyro-z"
                    />
                    
                  </>
                ),

                'AgentLocation': <>
                    <Typography>Agent Location</Typography>
                    <TextField
                     label="latitude"
                     value={agentLocation.latitude}
                    onChange={(event) => {setagentLocation({
                      ...agentLocation,
                      latitude: event.target.value
                    })}}/>

                    <TextField
                     label="latitude"
                     value={agentLocation.longitude}
                    onChange={(event) => {setagentLocation({
                      ...agentLocation,
                      longitude: event.target.value
                    })}}/>
                </>,
              }[type]
            }
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
                    <Select
                      value={permission}
                      onChange={handleChangePermission}
                    >
                      {permissions.map((p) => (
                        <option value={p.name}>{p.name}</option>
                      ))}
                    </Select>
                  </>
                )) ||
                  (p_or_a === "Action" && (
                    <>
                      <Select value={action} onChange={handleChangeAction}>
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
        </DialogActions>
      </Dialog>
    </div>
  );
}
