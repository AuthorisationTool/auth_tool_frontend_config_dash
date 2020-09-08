import React from 'react'
import { useState, useEffect } from 'react';
import Badge from './Badge';
import {Box, Button, Paper,Typography,
   Grid, makeStyles, ButtonGroup} from '@material-ui/core';
import Axios from 'axios';
import {deleteLevel} from '../services/LevelService'
import AddProfileConstraintDialog from '../dialogs/AddProfileConstraintDialog';
import AddEnvironmentConstraintDialog from '../dialogs/AddEnvironmentConstraintDialog';
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

    const [badgeList, setbadgeList] = useState([])
   const [reupload, setreupload] = useState(false);

    const fetchBadgeList =  () => {
      Axios.get(`http://localhost:8080/badges`).then( res => {
      setbadgeList(res.data)
    } );}
    
    useEffect(() => {
      if(reupload){
        fetchBadgeList();
      }
      return (()=>{
        setreupload(false);
      });
    },[reupload]);

    useEffect(() => {
        fetchBadgeList();
    }, []);

    const renderParent = () => {
      props.clickMe();
    }

    

    const classes = useStyles();

    return (
        
      <Paper elevation={3} className={classes.rolepaper}>
          <Grid container className={classes.root} spacing={3}>
              
          <Paper elevation={3} >
          <Box border={1} borderColor="primary.main">
          <Grid container justify="center" xs={12} classeName={classes.level}>
            
          </Grid>
          </Box>
          <Grid container justify="start" xs={12} alignItems='flex-start' >
            {badgeList.map( badge => {
                return (<Badge
                     bid={badge.bid}
                     hid={badge.holder_id}
                     clickMe={()=>setreupload(true)}/>)
            })}
        </Grid>
        </Paper>
          
          </Grid>
          </Paper>
    
    );
}
