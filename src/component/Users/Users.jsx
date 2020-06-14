import React from "react";
import User from "./User";
import Paginator from "../../utils/Paginator/Paginator";
import Grid from "@material-ui/core/Grid";
import Search from "../../utils/Search/Search";
import Selector from "../../utils/Selector/Selector";
import s from "./users.module.css"

const Users = ({
                   users, totalItemsCount, pageSize, currentPage, onPageChanged, handleFollow,
                   handleUnfollow, followingInProgress, handleStartChatting,
                   optionsForUsers, handlePageUserSize, handleSearchUser
               }) => {

    return <>
        <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize} currentPage={currentPage}
                   onPageChanged={onPageChanged}/>

        <Grid container spacing={3} className={s.searchBlock} justify="center" alignItems="flex-end">
            <Grid item xs={3}>
                <Search handleSearch={handleSearchUser}/>
            </Grid>
            <Grid item xs={3}>
                <Selector options={optionsForUsers} value={pageSize} handlePageSize={handlePageUserSize}/>
            </Grid>
        </Grid>
        <Grid container spacing={3} justify="center" alignItems="flex-end">
            {users.map(user => <Grid item xs={4} key={user.id}> <User  user={user} handleFollow={handleFollow}
                                                        handleUnfollow={handleUnfollow}
                                                        followingInProgress={followingInProgress}
                                                        handleStartChatting={handleStartChatting}

                />
                </Grid>
            )}
        </Grid>
    </>
}

export default Users;