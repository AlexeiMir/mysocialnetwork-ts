import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import s from './Post.module.css'



const Post = ({post,likes,fullName,photo}) => {

  

    return <>
    <Card className={s.item}>
    <CardHeader
        avatar={
          <Avatar src={photo} />
        
        }
       
        title={fullName}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {post}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
        {likes} <FavoriteIcon /> 
          </IconButton>
      </CardActions>
    </Card>


    </>


}

export default Post;