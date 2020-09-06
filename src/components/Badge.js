import React from 'react';
import { CardHeader, CardContent, Divider,
     CardActions, Button, Card, Typography, Grid, makeStyles } from '@material-ui/core';
export default function Badge(props) {
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
      

    const renderParent = () => {props.clickMe()}
    
    const handleDeleteBadge = () => {
        
    }
    const classes = useStyles();
    return (
        
      <Grid containder item xs={3} spacing={1}>
       
        <Card variant="outlined" className={classes.card}>
          <CardHeader
          title={`Badge ID: ${props.bid}`}
          subheader={`Badge Holder: ${props.hid}`}
          titleTypographyProps={{ align: 'center' }}
          subheaderTypographyProps={{ align: 'center' }}
  
          className={classes.cardHeader}
          />
        <CardContent>
      <Typography variant="body">
      <ul>
        <li><strong>Type :</strong>Bluetooth Badge</li>
        
      </ul>
      </Typography>
    </CardContent>
    <Divider/>
    <CardActions>
   
        <Button fullWidth size="small" variant="contained" color="primary"
        onClick={handleDeleteBadge}>Delete</Button>
        <Button fullWidth size="small" variant="outlined" color="primary">Update</Button>
  
    </CardActions>
        </Card>  
    
       </Grid>
    )
}
