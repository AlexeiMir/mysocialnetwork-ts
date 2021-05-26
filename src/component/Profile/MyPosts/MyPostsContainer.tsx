import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPostsSelectors, getProfileSelector} from "../../../redux/profile-selectors";
import MyPosts from "./MyPosts";
import {actions} from "../../../redux/profile-reducer";


const MyPostsContainer:React.FC = () => {

    const posts = useSelector(getPostsSelectors)
    const profile = useSelector(getProfileSelector)
    const dispatch = useDispatch();

    const handleAddPost = (postValue:string) => {
        dispatch(actions.addPost(postValue))
    }
    const handleDeletePost = (postId:number) => {
        dispatch(actions.deletePost(postId))
    }

    return (
        <div>
            <MyPosts posts={posts} profile={profile}
                     handleAddPost={handleAddPost} handleDeletePost={handleDeletePost} />
        </div>
    );
};

export default MyPostsContainer;
