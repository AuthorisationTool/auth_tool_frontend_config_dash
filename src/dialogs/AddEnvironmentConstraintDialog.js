import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { getConstraintNumber, createConstraint } from "../services/ConstraintService";

export default function AddEnvironmentConstraintDialog({ roleid, levelid }) {
  const [open, setopen] = useState(false);
  const [action, setaction] = useState("a");
  const [accelerationvalues, setaccelerationvalues] = useState({
      minx: -2,
      miny: 2,
      minz: -2,
      maxx: 2,
      maxy: -2,
      maxz: 2
  })
  const [agentLocation, setagentLocation] = useState({
    longitude: 112.15415610,
    latitude: 152.5150
  })

  const [gyrovalues, setgyrovalues] = useState({
    minx: -2,
    miny: 2,
    minz: -2,
    maxx: 2,
    maxy: -2,
    maxz: 2
})
  // for gyro & acceleration values
  const valuestext = (value) => {
      return `${value.minx} ${value.miny} ${value.minz} ${value.maxx} ${value.maxy} ${value.maxz}`
  }

  // for agentLocation values
  const agentLocationText = (value) => {
    return `${value.longitude} ${value.latitude}`
  }

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
          name: 'Acceleration',
          value: 'Acceleration'
      },
      {
        name: 'Gyro',
        value: 'Gyro'
    },
    {
        name: 'Agent Location',
        value: 'AgentLocation'
    },
    {
        name: 'Time of Request',
        value: 'TimeOfRequest'
    },
    {
        name: 'Acceleration',
        value: 'Acceleration'
    },
  ]

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
  const [mobility, setmobility] = useState("");
  const [type, settype] = useState("");
  
  const handleAuthorizationChange = (event) => {
    setp_or_a(event.target.value);
  };

  const handleSaveConstraint = () => {
  };

  const handleChangePermission = (event) => {
    setpermission(event.target.value);
  };

  const handleChangeAction = (event) => {
      setaction(event.target.value);
  }

  return (
    <div>
      <Button label="Add Constraint" onClick={handleClickOpen} />
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
              >{
                constraintTypes.map(type => {
                  return(
                    <FormControlLabel
                  value={type.value}
                  control={<Radio />}
                  label={type.name}
                />
                  )
                })
              }
              </RadioGroup>
            </FormControl>

          </div>
          {/* here type your constraint type config inputs */}
          <div>

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
              <FormLabel>{permission_or_action}</FormLabel>

              {
                (permission_or_action === "permission" && (
                  <>
                    <Select value={permission} onChange={handleChangePermission}>
                      {permissions.map((p) => (
                        <option value={p.name}>{p.name}</option>
                      ))}
                    </Select>
                  </>
                )) ||
                  (permission_or_action === "action" && (
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
