import React from "react";
import Post from "./Post/Post";
import AddPostFormRedux from "./AddPostForm/AddPostForm";

const MyPosts = ({posts,profile,handleAddPost,handleDeletePost}) => {

    const onSubmit = (value) => {
        handleAddPost(value.newPostText)
    }

    return <>
        <AddPostFormRedux onSubmit={onSubmit} photo={profile.photos.small}/>
        {[...posts].reverse().map((post) => <Post key={post.id} post ={post.post} likes ={post.likes}
                                                  fullName={profile.fullName} photo={profile.photos.small}
                                                  handleDeletePost={handleDeletePost} postId={post.id}/>)}

</>

}

export default MyPosts;

