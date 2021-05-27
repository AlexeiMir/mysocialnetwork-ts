import React from "react";
import Post from "./Post/Post";
import AddPostFormRedux from "./AddPostForm/AddPostForm";
import {PostType, ProfileType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    profile: ProfileType | null
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
        <AddPostFormRedux onSubmit={onSubmit} photo={profile!.photos.small}/>
        {profile && ([...posts].reverse().map((post) => <Post key={post.id} post={post}
                                                    fullName={profile?.fullName} photo={profile.photos.small}
                                                  handleDeletePost={handleDeletePost}/>))}

</>

}

export default MyPosts;

