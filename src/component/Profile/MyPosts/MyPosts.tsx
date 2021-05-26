import React from "react";
import Post from "./Post/Post";
import AddPostFormRedux, { AddPostFormValuesType } from "./AddPostForm/AddPostForm";
import {PostType, ProfileType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    profile: ProfileType
    handleAddPost: (newPostText: string) => void
    handleDeletePost: (postId:number) => void
}
export type AddPostFormValuesType = {
    newPostText: string
}


const MyPosts: React.FC<PropsType> = ({posts,profile,handleAddPost,handleDeletePost}) => {

    const onSubmit = (value:AddPostFormValuesType) => {
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

