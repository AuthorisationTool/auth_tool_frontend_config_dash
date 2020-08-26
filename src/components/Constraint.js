import React from 'react'
import {deleteConstraint} from '../services/ConstraintService';
import {Grid, Card, Button, CardHeader, makeStyles, Typography, Divider, CardContent, CardActions, ButtonGroup} from '@material-ui/core'
/*
props include [ props.roleid / props.levelid / props.id / props.type /
     props.name / props.arg / props.permission_or_action ] 
*/


export default function Constraint(props) {

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        cardHeader: {
          backgroundColor:
       theme.palette.grey[300],
        },
        control: {
          padding: theme.spacing(2),
        },

        card: {
          backgroundColor: theme.palette.grey[50],
          margin: theme.spacing(1),
        }
      }));
      

    const handleUpdateConstraint = () => {
        console.log("update constraint clicked");
    }
    const renderParent = () => {props.clickMe()}
    
    const handleDeleteConstraint = () => {
        deleteConstraint(props.roleid,props.levelid,props.id);
        renderParent();
    }
    const classes = useStyles();
    return (
        
      <Grid containder item xs={3} spacing={1}>
       
        <Card variant="outlined" className={classes.card}>
          <CardHeader
          title={props.type}
          subheader={`Constraint ID: ${props.id}`}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
  
          className={classes.cardHeader}
          />
        <CardContent>
      <Typography variant="body">
      <ul>
        <li><strong>Type :</strong>{props.type}</li>
        <li><strong>{props.name} :</strong>{props.arg}</li>
        <li><strong>Permission : </strong>{props.permission}</li>
        <li><strong>Action : </strong>{props.action}</li>
      </ul>
      </Typography>
    </CardContent>
    <Divider/>
    <CardActions>
   
        <Button fullWidth size="small" variant="contained" color="primary"
        onClick={handleDeleteConstraint}>Delete</Button>
        <Button fullWidth size="small" variant="outlined" color="primary">Update</Button>
  
    </CardActions>
        </Card>  
    
       </Grid>
    )
}
