import React from "react";
import User from "./User";
import Paginator from "../../utils/Paginator/Paginator";

const Users = ({users,totalItemsCount,pageSize,currentPage,onPageChanged,handleFollow,
                   handleUnfollow,followingInProgress,handleStartChatting}) => {

    return <>
        <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged} />
        {users.map(user => <User key={user.id} user={user} handleFollow={handleFollow}
                                 handleUnfollow={handleUnfollow} followingInProgress={followingInProgress}
                                 handleStartChatting = {handleStartChatting}
        />)}
        </>
}

export default Users;