import React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {NavLink} from "react-router-dom";
import userPhoto from "../../assets/images/man.png"
import s from "./users.module.css"

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


const User = ({user,handleUnfollow,handleFollow,followingInProgress,handleStartChatting}) => {
    const classes = useStyles();


    return <>
        <Card className={classes.root}>

            <NavLink to={'/profile/'+user.id} className={s.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={user.photos.small !== null ? user.photos.small : userPhoto}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {user.status}
                        </Typography>
                    </CardContent>
                </CardActionArea>
        </NavLink>

            <CardActions>
                {user.followed
                    ? <Button variant="outlined" size="small" color="primary"
                              onClick={()=>(handleUnfollow(user.id))} component='button'
                    disabled={followingInProgress.some(id => id = user.id)}
                    >
                        Unfollow
                    </Button>
                    : <Button variant="outlined" size="small" color="primary" component='button'
                              onClick={()=>(handleFollow(user.id))}
                              disabled={followingInProgress.some(id => id = user.id)}
                    >
                        Follow
                    </Button>
                }
                <NavLink to="/dialogs" className={s.btnMessage}>
                    <Button  onClick={() => (handleStartChatting(user.id))} variant="outlined" size="small" color="primary" component='button'>
                    Send Message
                </Button>
                </NavLink>
            </CardActions>
        </Card>
    </>
}
export default User;
