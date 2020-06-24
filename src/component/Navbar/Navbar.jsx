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
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import userPhoto from "../../assets/images/man.png";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

const Navbar = ({friends,isAuth}) => {

    const [selectedIndex, setSelectedIndex] = React.useState();
    const classes = useStyles();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };


    return <>
        <div className={s.navItem}>
        <div className={s.nav}>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                     <ListItem button component={NavLink} exact to="/users" selected={selectedIndex === 0}
                               onClick={(event) => handleListItemClick(event, 0)}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Users"/>
                    </ListItem>
                    <ListItem button component={NavLink} exact to="/dialogs" selected={selectedIndex === 1}
                              onClick={(event) => handleListItemClick(event, 1)}>
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Dialogs"/>
                    </ListItem>
                    <ListItem button component={NavLink} exact to="/profile" selected={selectedIndex === 2}
                              onClick={(event) => handleListItemClick(event, 2)}>
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Profile"/>
                    </ListItem>
                    <ListItem button component={NavLink} exact to="/news" selected={selectedIndex === 3}
                              onClick={(event) => handleListItemClick(event, 3)}>
                        <ListItemIcon>
                            <DraftsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="News"/>
                    </ListItem>
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                        <ListItemText primary="Trash" />
                    </ListItem>
                    <ListItem component="nav" aria-label="secondary mailbox folders">
                        <ListItemText primary="Spam" />
                    </ListItem>
                </List>
            </div>
        </div>
        {isAuth && <div className={s.friends}>
            <Typography variant="h6" gutterBottom>My friends</Typography>
            <List>
                {friends.length ?
                    friends.map(friend => <ListItem key={friend.id}>
                        <NavLink className={s.itemText} to={'/profile/'+friend.id} >
                            <ListItemAvatar>
                                <Avatar src={friend.photos.large ?  friend.photos.large : userPhoto}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={friend.name}
                            />
                        </NavLink>
                    </ListItem>)
                    : null
                }

        </List>
        </div>}
        </div>
    </>
}

export default Navbar;



