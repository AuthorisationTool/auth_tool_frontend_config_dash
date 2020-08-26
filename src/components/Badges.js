import React, { useState, useEffect } from 'react'
import Axios from 'axios';

export default function Badges() {

    const [badgesList, setbadgesList] = useState([]);
    const [reload, setreload] = useState(false);
    const fetchBadgesList = () => {
        Axios.get('http://localhost:8080/badges').then(res => {
            setbadgesList(res.data);
        })
    }
    useEffect(() => {
        fetchBadgesList();
    }, []);

    useEffect(() => {
        fetchBadgesList();
        return () => {
            setreload(false);
        }
    }, [reload])

    const handleClick = () => {

    }

    return (
        <Grid container justify="start" xs={12} alignItems='flex-start' >
            <Grid container xs={12} spacing={2} alignItems='flex-start'>
            <Title>List of Bluetooth Badges:</Title>
            <Button color='primary' variant='contained' onClick={handleClick}>Scan</Button>
            </Grid>
            <Grid container xs={12} spacing={1} alignItems='flex-start'>
                {badgesList.map( badge => {
                    <Grid container item xs={3} spacing={1}>
                    <Card className={classes.root}>
                       <CardActionArea>
                       <CardMedia
                           className={classes.media}
                           image="m5.jpg"
                           title="m5"
                         />
                   <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                           Bluetooth Badge
                      </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                            ID: {badge.bid}
                    </Typography>
                 </CardContent>

                </CardActionArea>
                     <CardActions>
                        <Button onClick={handleAssign(badge.id)} size="small" color="primary">
                          Assign user
                        </Button>
                  <Button onClick={handleDelete(badge.id)} size="small" color="primary">
                      Delete
                 </Button>
                   </CardActions>
             </Card>
                    </Grid>
                })}

            </Grid>
        
        </Grid>
    )
}
