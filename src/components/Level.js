import React from 'react'
import { useState, useEffect } from 'react';
import Constraint from './Constraint';
import {Box, Button, Paper,Typography, Grid, makeStyles, ButtonGroup} from '@material-ui/core';
import Axios from 'axios';
import {deleteLevel} from '../services/LevelService'
import AddProfileConstraintDialog from '../dialogs/AddProfileConstraintDialog';
{/*
    props include : [ props.roledid, props.levelid , props.model]
*/}
export default function Level(props) {

    const useStyles = makeStyles((theme) => ({
       
        root: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },

        levelcompo:{
          margin: theme.spacing(3),
        },

        levelcompobtn:{
          margin: theme.spacing(3),
          padding: theme.spacing(2),
        },

        level: {
            
        }

      }));

    const [constraintList, setconstraintList] = useState([]);
   const [reupload, setreupload] = useState(false);

    const fetchConstraintList =  () => {
      Axios.get(`http://localhost:8080/policy/role/${props.roleid}/level/${props.levelid}/constraint`).then( res =>
      setconstraintList(res.data));
    } 
    
    useEffect(() => {
      if(reupload){
        fetchConstraintList();
      }
      return (()=>{
        setreupload(false);
      });
    },[reupload]);

    const renderParent = () => {
      props.clickMe();
    }

    useEffect(() => {
        fetchConstraintList();
    }, []);

    const handleDeleteLevel = () => {
      deleteLevel(props.roleid,props.levelid);
      renderParent();
    }
    

    const classes = useStyles();

    return (
        
        
          <Grid container className={classes.root} spacing={3}>
              
          <Paper elevation={3} >
          <Box border={1} borderColor="primary.main">
          <Grid container justify="center" xs={12} classeName={classes.level}>
          
          <Grid item xs={3} className={classes.levelcompo}>
          <Typography variant="h6">Role ID: </Typography>
    <Typography color="primary">{props.roleid}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.levelcompo}>
          <Typography variant="h6">Level ID: </Typography>
    <Typography color="primary">{props.levelid}</Typography>
          </Grid>
          <Grid item xs={3} className={classes.levelcompo}>
            <Typography variant="h6">Access Control Model: </Typography>
    <Typography color="primary">{props.model}</Typography>
          </Grid>
          <Grid item xs={2} className={classes.levelcompobtn}>
            <ButtonGroup orientation='vertical'>
            {(props.model == "ProfileBasedAccessControl" && <>
            <AddProfileConstraintDialog roleid={props.roleid} levelid={props.levelid}/>
            </>)
            ||
            (props.model === "ContextBasedAccessControl" && <>
            <AddProfileConstraintDialog roleid={props.id} levelid={props.levelid}/>
            </>)}
             <Button variant='contained' size='small' color='primary' onClick={handleDeleteLevel}>delete level</Button>
             </ButtonGroup>
            
            </Grid>
            
          </Grid>
          </Box>
          <Grid container justify="start" xs={12} alignItems='flex-start' >
            {constraintList.map(constraint => {
                return (<Constraint
                     id={constraint.constraintID}
                     type={constraint.constraintTypeName}
                     name={constraint.constraintTypeSpecificName}
                     arg={constraint.constraintArg}
                     clickMe={()=>setreupload(true)}/>)
            })}
        </Grid>
        </Paper>
          
          </Grid>
    
    );
}
