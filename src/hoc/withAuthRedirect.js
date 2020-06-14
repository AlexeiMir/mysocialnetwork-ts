import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const mapStateToProps = (state) => ({
    isAuth: state.authPage.isAuth
})


export const withAuthRedirect = (Component) => {
    class redirectWrapper extends React.Component {

        render() {

               if (!this.props.isAuth)  return <Redirect to={"/login"} />
               return <Component {...this.props}/>
        }
    }
    return connect(mapStateToProps)(redirectWrapper)
}


