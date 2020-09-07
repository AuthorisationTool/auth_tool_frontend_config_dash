import React from 'react'
import { useState, useEffect } from 'react';
import Constraint from './Constraint';
import {Box, Button, Paper,Typography, Grid, makeStyles, ButtonGroup} from '@material-ui/core';
import AddProfileConstraintDialog from '../dialogs/AddProfileConstraintDialog';
import AddEnvironmentConstraintDialog from '../dialogs/AddEnvironmentConstraintDialog';
import Axios from 'axios';
import {deleteLevel} from '../services/LevelService'
{/*
    props include : [ props.roledid, props.levelid , props.model]
*/}
export default function Level (props) {

    const useStyles = makeStyles((theme) => ({
       
        root: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            margin: theme.spacing(1),
          },
        
        },

        levelcompo:{
          margin: theme.spacing(4),
        },

        levelcompobtn:{
            margin: theme.spacing(3),
        },

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
           
          
            
      <ButtonGroup orientation='vertical' size="small" >
          {
            (props.model === 'ProfileBasedAccessControl' && <AddProfileConstraintDialog
             roleid={props.roleid}
             levelid={props.levelid}/>)
            ||
            (props.model === 'ContextBasedAccessControl' && <AddEnvironmentConstraintDialog
            roleid={props.roleid}
            levelid={props.levelid}/>)
          }        
    
        <Button 
        variant='contained'
        color='primary'
        onClick={handleDeleteLevel}>Delete level</Button>
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
                     permission={constraint.permission}
                     arg={constraint.constraintArg}
                     clickMe={() => setreupload(true)}/>)
            })}
        </Grid>
        </Paper>
          
          </Grid>
    
    );
}
