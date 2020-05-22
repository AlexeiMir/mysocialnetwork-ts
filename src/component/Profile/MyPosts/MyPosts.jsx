import React from "react";
import Post from "./Post/Post";

const MyPosts = ({posts,profile}) => {

    return <div>
        {[...posts].reverse().map((post) => <Post key={post.id} post ={post.post} post ={post.likes} fullName={profile.fullName} photo={profile.photos.small}/>)}

</div>

}

export default MyPosts;

