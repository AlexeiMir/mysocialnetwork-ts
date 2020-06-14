import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css"


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Navbar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const classes = useStyles();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const itemMenu = (id,name,path,iconName) => ({
        id,name,path,iconName
    })


    return (
        <div className={s.nav}>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  { [itemMenu(0,"Users","/users","InboxIcon"),
                  itemMenu(1,"Dialogs","/dialogs","InboxIcon"),
                  itemMenu(2,"Profile","/profile","InboxIcon"),
                  itemMenu(3,"News","/news","InboxIcon"),
                      ].map(p => {
                      return( <ListItem button component={NavLink} exact to={p.path}
                                        selected={selectedIndex}
                                        onClick={(event) => handleListItemClick(event, p.id)}
                          >
                          <ListItemIcon>
                              <InboxIcon/>
                          </ListItemIcon>
                          <ListItemText primary={p.name}/>
                      </ListItem>
                      )
                  })}


                   {/* <ListItem button component={NavLink} exact to="/users">
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                    <ListItem button component={NavLink} exact to="/dialogs">
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dialogs"/>
                    </ListItem>
                    <ListItem button component={NavLink} exact to="/profile">
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    <ListItem button component={NavLink} exact to="/news">
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="News"/>
                    </ListItem>*/}
                </List>
            </div>
        </div>
    )
}

export default Navbar;