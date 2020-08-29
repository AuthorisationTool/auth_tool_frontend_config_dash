import React, { useState } from "react";
import {
  TextField,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogActions,
  FormHelperText,
  FormControl,
  DialogContent,
  DialogContentText,
  Select,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  MenuItem,
} from "@material-ui/core";

export default function ConstraintDialog({
  roleid,
  levelid,
  constraint_type,
  clickMe,
}) {
  const [open, setopen] = useState(false);
  const [permission_or_action, setpermission_or_action] = useState(
    "permission"
  );
  const [constraint, setconstraint] = useState({
    id: "",
    permission_or_action: "",
    constraint_type: `${constraint_type}`,
    specific_type: "",
    arg: "",
  });

  const types = [
    {
      name: "Agent Location",
      value: "AgentLocation",
    },
    {
      name: "Kind of device",
      value: "KindOfDevice",
    },
    {
      name: "Time of request",
      value: "TimeOfRequest",
    },
  ];

  const action = [
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

  const permission = [{ name: "allow" }, { name: "deny" }];

  const handleClickOpen = () => {
    setopen(!open);
  };
  const handlePAChange = (e) => {
    setpermission_or_action(e.target.value);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    console.log(`name : ${name}, value: ${value}`);

    setconstraint({
      ...constraint,
      [name]: { value },
    });
  };

  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });

  function valuetext(value) {
    return `${value[0]} ${value[1]}`;
  }

  const classes = useStyles();
  const [value, setValue] = React.useState([50, 75]);

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="primary"
        size="small"
      >
        add Constraint
      </Button>
      <Dialog
        open={open}
        onClose={handleClickOpen}
        aria-labelledby="add-constraint"
      >
        <DialogTitle id="add-constraint">
          Add a new Environment Constraint
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill this form below and click on 'SAVE' to create the Environment
            Constraint
          </DialogContentText>

          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select onChange={handleChange("specific_type")}>
              {types.map((type) => (
                <option value={type.value}>{type.name}</option>
              ))}
            </Select>
            <FormHelperText id="my-helper-text">*Required</FormHelperText>
          </FormControl>
          <FormControl>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={permission_or_action}
              onChange={handlePAChange}
            >
              <FormControlLabel
                value="permission"
                control={<Radio />}
                label="Permission"
              />
              <FormControlLabel
                value="action"
                control={<Radio />}
                label="Action"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>{permission_or_action}</FormLabel>
            <Select onChange={handleChange("permission_or_action")}>
              {
                (permission_or_action === "permission" && (
                  <>
                    {permission.map((p) => (
                      <option value={p.name}>{p.name}</option>
                    ))}
                  </>
                )) ||
                  (permission_or_action === "action" && (
                    <>
                      {action.map((a) => (
                        <option value={a.value}>{a.name}</option>
                      ))}
                    </>
                  ))
                // Or use instead:
                // {
                // 'permission':<>{permission.map(p => <option value={p.value}>{p.name}</option>)}</>,
                // 'action': <>{action.map(a => <option value={a.value}>{a.name}</option>)}</>
                // }[permission_or_action]
              }
            </Select>
          </FormControl>
          <FormControl>
            <FormControlLabel>Type</FormControlLabel>
            {(constraint_type == "ProfileConstraint" && (
              <>
                {
                  <Select onChange={handleChange("specific_type")}>
                    <MenuItem value="Mobility">Mobility</MenuItem>
                    <MenuItem value="Confidence">Confidence</MenuItem>
                  </Select>
                }
              </>
            )) ||
              (constraint_type == "EnvironmentConstraint" && (
                <>
                  {
                    <Select onChange={handleChange("specific_type")}>
                      <MenuItem value="TimeOfRequest">Time of request</MenuItem>
                      <MenuItem value="AgentLocation">Agent location</MenuItem>
                      <MenuItem value="Acceleration">Acceleration</MenuItem>
                      <MenuItem value="Gyro">Gyro</MenuItem>
                      <MenuItem value="KindOfDevice">Kind of device</MenuItem>
                    </Select>
                  }
                </>
              ))}
          </FormControl>

          <FormControl>
            <FormControlLabel>Argument</FormControlLabel>
            {(specific_type == "Confidence" && (
              <>
                <Typography id="range-slider" gutterBottom>
                  Temperature range
                </Typography>

                <Slider
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </>
            )) ||
              (specific_type == "Mobility" && <></>) ||
              (specific_type == "TimeOfRequest" && <></>) ||
              (specific_type == "AgentLocation" && <></>) ||
              (specific_type == "Acceleration" && <></>) ||
              (specific_type == "Gyro" && <></>) ||
              (specific_type == "KindOfDevice" && <></>)}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickOpen} color="primary">
            Cancel
          </Button>
          <Button
            onClick={(event) => console.log("save")}
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
