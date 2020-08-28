import React, {useState,useEffect} from 'react'
import Level from '../components/Level';
import axios from 'axios';
import { Paper, FormControl, InputLabel, Select, Button, makeStyles } from '@material-ui/core'
import AddLevelDialog from '../dialogs/AddLevelDialog';

export default function LevelsManager(props) {
    
    const [levels, setlevels] = useState([]);
    const [roleid, setroleid] = useState("no_role_selected");
    const [roleList, setroleList] = useState([]);
    const [rerender, setrerender] = useState(false);
    const useStyles = makeStyles((theme) => ({
        rolepaper: {
            display: 'flex',
            paddingTop: theme.spacing(3),
            paddingBottom: theme.spacing(1),
            justifyContent: 'center',
            marginBottom: theme.spacing(3),
            backgroundColor: theme.palette.grey[300],
        },

        formcontrol: {
            margin: theme.spacing(1),
        }
    }));

    
    useEffect(() => {
        fetchRoleList();
        if(!roleid === "no_selected_role"){
            fetchLevelsList();
}
    }, [roleid]);

    useEffect(() => {
        if(rerender)
       fetchLevelsList();
       return(()=>{
           setrerender(false);
       });
    }, [rerender]);

    const handleChangeRoleID = (e) =>{
        setroleid(e.target.value);
    }

    const handleSeeLevelsClick = () => {
        setrerender(true);
    }

    const handleOutsideRendering = () => {setrerender(true)}
    
    const fetchRoleList = () => {
        axios.get(`http://localhost:8080/policy/role`).then(res => {
            setroleList(res.data);
        })
    }
    const fetchLevelsList = () => {
        axios.get(`http://localhost:8080/policy/role/${roleid}/level`).then( res => {
            console.log(res);
            setlevels(res.data);
        })
        }
        const classes = useStyles();
    return (
        
        <>
        <Paper elevation={3} className={classes.rolepaper}>
        <FormControl className={classes.formcontrol} style={{bottom: 12,}}>
        <InputLabel htmlFor="role_name">Role</InputLabel>
        <Select
          native
          onChange={handleChangeRoleID}>
              <option value="no_selected_role"></option>
              {roleList.map((role) => {
                  return (
                  <option value={role.roleId}>{role.roleName}</option>
                  );
              })}
        </Select>
      </FormControl>
      <FormControl className={classes.formcontrol} ><Button color="primary" onClick={handleSeeLevelsClick}>Show levels</Button></FormControl>
      <FormControl className={classes.formcontrol} > <AddLevelDialog clickme={handleOutsideRendering} roleid={roleid}/></FormControl>
        </Paper>
            
            {
                
            levels.map((level) => {
                return (<><Level 
                roleid={roleid}
                levelid={level.id}
                model={level.acm.modelName}
                clickMe={()=>setrerender(true)}/></>);
            })}
            
            
            
        </>
    )
}
