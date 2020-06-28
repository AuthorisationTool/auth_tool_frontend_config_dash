import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { List, Divider } from '@material-ui/core';
import { Link, BrowserRouter } from 'react-router-dom';

export default function MainListItems(){
  const primaryListItems = (
    
    <div>
      <ListSubheader className="subheader">
        Access Control Management</ListSubheader>
      <ListItem button component={Link} to="/Roles" >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Roles" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Levels" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Constraints" />
      </ListItem>
    </div>
    
  );
  
  const secondaryListItems = (
    <div>
      <ListSubheader>Ressources Management</ListSubheader>
      
    
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>
  

      
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Application" />
      </ListItem>
    


         <ListItem button>
         <ListItemIcon>
           <AssignmentIcon />
         </ListItemIcon>
        <ListItemText primary="Firewall" />
      </ListItem>
      

      
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Bluetooth Agent" />
      </ListItem>
      

    </div>
  );

  return(
    <>
  <Divider/>
  <List>
    {primaryListItems}
    </List>
    <Divider />
    <List>
    {secondaryListItems}
    </List>
        </>
    );
  }
