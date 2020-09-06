import React, { useState, useEffect } from "react";
import Axios from "axios";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

export default function Badges() {
 
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
   
  }));
  const [badgesList, setbadgesList] = useState([]);
  const [reload, setreload] = useState(false);
  const fetchBadgesList = () => {
    Axios.get("http://localhost:8080/badges").then((res) => {
      setbadgesList(res.data);
    });
  };
  useEffect(() => {
    fetchBadgesList();
  }, []);

  useEffect(() => {
    fetchBadgesList();
    return () => {
      setreload(false);
    };
  }, [reload]);

  const handleClick = () => {};

  const handleAssign = () => {};
  const handleDelete = () => {};

  const classes = useStyles();

  return (
    <Grid container justify="start" xs={12} alignItems="flex-start">
      <Grid container xs={12} spacing={2} alignItems="flex-start">
        <Typography>List of Bluetooth Badges:</Typography>
        <Button color="primary" variant="contained" onClick={handleClick}>
          Scan
        </Button>
      </Grid>
      <Grid container xs={12} spacing={1} alignItems="flex-start">
        {badgesList.map(badge => {
            return(
                <Grid container item xs={3} spacing={1}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="/components/m5.jpg"
                  title="m5"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Bluetooth Badge
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Badge ID: {badge.bid}
                  </Typography>
                  <Typography>
                    Badge holder: {badge.uid}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  onClick={handleAssign(badge.id)}
                  size="small"
                  color="primary"
                >
                  Assign user
                </Button>
                <Button
                  onClick={handleDelete(badge.id)}
                  size="small"
                  color="primary"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
            )
        })}
      </Grid>
    </Grid>
  );
}
