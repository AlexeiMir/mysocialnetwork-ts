import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, withRouter} from "react-router-dom";
import {Provider, useDispatch, useSelector} from "react-redux";
import store from "./redux/redux-store";
import DialogsContainer from "./component/Dialogs/DialogsContainer";
import {Login} from "./component/Login/Login";
import Header from "./component/Header/Header";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./component/common/Preloader";
import ProfileContainer from "./component/Profile/ProfileContainer";
import {withSuspense} from "./hoc/withSuspense";
import NavbarContainer from "./component/Navbar/NavbarContainer";
import SpamContainer from "./component/Spam/SpamContainer";

const UsersContainer = React.lazy(() => import("./component/Users/UsersContainer"));
const NewsContainer = React.lazy(() => import("./News/NewsContainer"))

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

function App() {

    const initilized = useSelector(state => state.app.initilized)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!initilized) {
        return <Preloader/>
    }

    return <div className="app-wrapper">
        <Header/>
        <NavbarContainer/>
        <div className="app-wrapper-content">
            <Route path={"/users"} render={() => <UsersContainer/>}/>
            <Route path={"/dialogs"} render={() => <SuspendedDialogs/>}/>
            <Route path={"/spam"} render={() => <SpamContainer/>}/>
            <Route path={"/profile/:userId?"} render={() => <SuspendedProfile/>}/>
            <Route path={"/news"} render={() => <NewsContainer/>}/>
            <Route path={"/login"} render={() => <Login/>}/>
            <Route exact path={"/"} render={() => <Redirect to="/users"/>}/>
        </div>

    </div>
}

const AppSocial = withRouter(App)

const AppContainer = () => {


    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppSocial/>
            </Provider>
        </BrowserRouter>
        
    )

}


export default AppContainer;
