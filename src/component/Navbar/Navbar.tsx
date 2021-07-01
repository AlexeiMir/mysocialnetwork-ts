import React from 'react'
import {selectIsAuth} from '../../redux/auth-selectors'
import {getFriends} from "../../redux/users-selectors";
import {useSelector} from "react-redux";

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

type PropsType = {
    handleListItemClick: (index:number) => void
}

const Navbar:React.FC<PropsType> = () => {

    const friends = useSelector(getFriends)
    const isAuth = useSelector(selectIsAuth)

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const classes = useStyles();
    const handleListItemClick = (index:number) => {
        setSelectedIndex(index);
    };

    const menuItem = ['users', 'dialogs', 'profile' , 'news']

    function ucFirst(str:string) {
        if (!str) return str;
      
        return str[0].toUpperCase() + str.slice(1);
      }


    return <>
        <div className={s.navItem}>
        <div className={s.nav}>
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {menuItem.map((item,index) =>
                        <ListItem key={item} button component={NavLink}
                                  exact to={`/${item}`} selected={selectedIndex === index}
                               onClick={() => handleListItemClick(index)}>
                        <ListItemIcon>
                            <InboxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={ucFirst(item)}/>
                    </ListItem>)}
                </List>
                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button>
                        <ListItemText primary="Trash" />
                    </ListItem>
                    <ListItem className={s.itemText} component={NavLink} exact to="/spam" selected={selectedIndex === 4}
                              onClick={() => handleListItemClick(4)}>
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

/*<ListItem button component={NavLink} exact to="/users" selected={selectedIndex === 0}
          onClick={() => handleListItemClick(0)}>
    <ListItemIcon>
        <InboxIcon/>
    </ListItemIcon>
    <ListItemText primary="Users"/>
</ListItem>
<ListItem button component={NavLink} exact to="/dialogs" selected={selectedIndex === 1}
          onClick={() => handleListItemClick(1)}>
    <ListItemIcon>
        <DraftsIcon/>
    </ListItemIcon>
    <ListItemText primary="Dialogs"/>
</ListItem>
<ListItem button component={NavLink} exact to="/profile" selected={selectedIndex === 2}
          onClick={() => handleListItemClick(2)}>
    <ListItemIcon>
        <DraftsIcon/>
    </ListItemIcon>
    <ListItemText primary="Profile"/>
</ListItem>
<ListItem button component={NavLink} exact to="/news" selected={selectedIndex === 3}
          onClick={() => handleListItemClick(3)}>
    <ListItemIcon>
        <DraftsIcon/>
    </ListItemIcon>
    <ListItemText primary="News"/>
</ListItem>*/

