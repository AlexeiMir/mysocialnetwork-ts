import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk"
import usersReducer from "./users-reducer";
import dialogsReducer from "./dialogs-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import profileReducer from "./profile-reducer";
import newsReducer from "./news-reducer";

let reducers = combineReducers({
    usersPage:usersReducer,
    dialogsPage: dialogsReducer,
    authPage:authReducer,
    form: formReducer,
    app:appReducer,
    profilePage:profileReducer,
    newsPage:newsReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers( applyMiddleware(thunkMiddleware)));

window._store_ = store;

export default store;