import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fade,makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import userImage from "../../assets/images/user.png"
import {logout} from "../../redux/auth-reducer";
import {selectIsAuth, selectMyPhoto, selectCurrentUserLogin} from "../../redux/auth-selectors";
import {selectNewMessagesCount} from "../../redux/dialogs-selectors";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}));

export type MapPropsType = {}

const Header:React.FC<MapPropsType> = () => {

    const isAuth = useSelector(selectIsAuth)
    const loginUser = useSelector(selectCurrentUserLogin)
    const myPhoto = useSelector(selectMyPhoto)
    const newMessagesCount = useSelector(selectNewMessagesCount)
    const dispatch = useDispatch()



    const handleLogout = () => {
        dispatch(logout())
    }

    const classes = useStyles();



    return (
        <div className={s.header}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Social Network
                        </Typography>

                        {isAuth
                            ? <div className={s.logout}>
                                <div>
                                    <Badge badgeContent={newMessagesCount} color="secondary" showZero>
                                        <Avatar src={myPhoto ? myPhoto.small : userImage}/>
                                    </Badge>
                                </div>
                                <div>
                                    {loginUser}
                                </div>
                                <div>
                                    <ExitToAppIcon onClick={()=>{handleLogout()}}/>
                                </div>

                            </div>
                            :<NavLink to="/login" className={s.login}>
                                <Button color="inherit" >Login</Button>
                            </NavLink>
                        }

                    </Toolbar>
                </AppBar>
            </div>
        </div>
    )
}




export default Header;