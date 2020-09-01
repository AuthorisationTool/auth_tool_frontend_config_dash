import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { createConstraint } from "../services/ConstraintService";

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

  const [confidence, setconfidence] = useState("");
  const [constraint, setconstraint] = useState({
    id: "",
    permission_or_action: "",
    constraint_type: "ProfileConstraint",
    specific_type: "",
    arg: "",
  });
  const [p_or_a, setp_or_a] = useState("Permission");
  const [permission, setpermission] = useState("allow");
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
  const handleTypeChange = (event) => {
    settype(event.target.value);
  };
  const handleAuthorizationChange = (event) => {
    setp_or_a(event.target.value);
  };
  const handleChangeConfidence = (event) => {
    setconfidencerange(event.target.value);
    setconfidence(textvalue(confidencerange));
  };

  const textvalue = (value) => {
    return `${value[0]} ${value[1]}`;
  };
  const handleSaveConstraint = () => {
    switch (type) {
      case "Mobility":
        setconstraint({
          ...constraint,
          id: `${getConstraintNumber(roleid, levelid) + 1}`,
          permission_or_action: permission,
          specific_type: type,
          arg: mobility,
        });
      case "Confidence":
        setconstraint({
          ...constraint,
          id: `${getConstraintNum(roleid, levelid) + 1}`,
          permission_or_action: permission,
          specific_type: "Confidence",
          arg: confidence,
        });
        handleClickOpen();
    }
    createConstraint(roleid, levelid, constraint);
  };

  const handleChangePermission = (event) => {
    setpermission(event.target.value);
  };

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
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Age
                  </InputLabel>
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
                    onChange={handleChangeConfidence}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
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
              <FormLabel>{permission_or_action}</FormLabel>

              {
                (permission_or_action === "permission" && (
                  <>
                    <Select onChange={handleChangePermission}>
                      {permissions.map((p) => (
                        <option value={p.name}>{p.name}</option>
                      ))}
                    </Select>
                  </>
                )) ||
                  (permission_or_action === "action" && (
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
