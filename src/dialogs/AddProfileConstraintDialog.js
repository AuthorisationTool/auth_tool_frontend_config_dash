import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@material-ui/core";

export default function AddProfileConstraintDialog({ roleid, levelid }) {
  const [open, setopen] = useState(false);
  const handleClickOpen = () => {
    this.setopen(!open);
  };
  const [confidence, setconfidence] = useState({
    min: "",
    max: "",
  });

  const [mobility, setmobility] = useState("");
  const [type, settype] = useState("mobility");
  const handleTypeChange = (event) => {
    settype(event.target.value);
    console.log(type);
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
                name="gender1"
                value={value}
                onChange={(event) => handleTypeChange(event)}
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
          <div></div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickOpen} color="primary">
            Cancel
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
