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
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { PostType } from '../../../../types/types';

type PropsType = {
    post: PostType
    fullName: string
    photo: string
    handleDeletePost: (postId:number) => void
}

const Post:React.FC<PropsType> = ({post, fullName, photo,handleDeletePost}) => {

    return <>
        <Card className={s.item}>
            <CardHeader
                avatar={
                    <Avatar src={photo}/>

                }
                action={
                    <IconButton aria-label="settings">
                        <DeleteOutlineIcon onClick={() => {handleDeletePost(post.id)}} />
                    </IconButton>
                }

                title={fullName}
                subheader="September 14, 2016"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.post}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    {post.likes} <FavoriteIcon/>
                </IconButton>
            </CardActions>
        </Card>

    </>


}

export default Post;