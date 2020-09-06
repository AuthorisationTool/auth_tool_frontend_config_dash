import React from "react";
import axios from "Axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  FormLabel,
  TextField,
} from "@material-ui/core";
export default function AddBadgeDialog() {
  const [badgeFrom, setbadgeFrom] = useState({
    bid: "",
    hid: "",
  });

  const [open, setopen] = useState(false);

  const handleClickOpen = () => {
    setopen(!open);
  };

  const handleChange = (name) => {
    setbadgeFrom({
      ...badgeFrom,
      [name]: event.target.value,
    });
  };

  const handleScanBtnClick = () => {};

  const [userList, setuserList] = useState([]);

  const fetchUserList = () => {
    axios.get("http://localhost:8080/users").then((res) => {
      console.log(res);
      setuserList(res.data);
    });
  };

  useEffect(() => {
    fetchUserList;
  }, []);

  return (
    <div>
      <Button
        label="Add a new Badge"
        color="primary"
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClickOpen}>
      <DialogTitle>Add a new Badge</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Power on the badge and click on scan to register it in the database
        </DialogContentText>
        <div>
          <FormControl>
            <FormLabel>Badge ID</FormLabel>
            <TextField label="Badge ID" id="bid" value={bid} disabled />
            <Button onClick={handleScanBtnClick} label="Scan" />
          </FormControl>
          <FormControl>
            <FormLabel>Holder of badge</FormLabel>
            <Select
              labelId="holder"
              id="holder"
              value={badgeFrom.holder}
              onChange={handleChange("holder")}
            >
              {userList.map((user) => {
                return <MenuItem value={user.id}>{user.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button label="CANCEL" color="secondary" onClick={handleClickOpen} />
        <Button label= "SAVE" color="primary" onClick={handleSaveBadge}/>
      </DialogActions>
      </Dialog>
    </div>
  );
}
