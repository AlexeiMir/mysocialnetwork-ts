import React, {useState} from 'react'
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
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";


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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));

const Header = ({isAuth,loginUser,handleLogout,handleSearchUser}) => {
    const [value,setValue] = useState('')
    const [editeMode,setEditeMode] = useState(true)
    const classes = useStyles();

    const handleSearch = (name) => {
            if (name.length && !editeMode){
                handleSearchUser(name)
            }
    }

    const handleNameSearch = (e) => {
        setValue(e.target.value)
        setEditeMode(true)
        handleSearch(value)

    }

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

                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <TextField onChange={handleNameSearch} onBlur={()=>setEditeMode(false)} autoFocus={true}
                                placeholder="Search…"
                                       value={value}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />

                        </div>

                        {isAuth
                        ? <span className={s.logout}>{loginUser} <ExitToAppIcon onClick={()=>{handleLogout()}}/></span>
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