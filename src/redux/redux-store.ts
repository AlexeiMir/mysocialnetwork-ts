import {combineReducers, createStore, applyMiddleware, compose, Action} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import usersReducer from "./users-reducer";
import dialogsReducer from "./dialogs-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import profileReducer from "./profile-reducer";
import newsReducer from "./news-reducer";

let rootReducer = combineReducers({
    usersPage:usersReducer,
    dialogsPage: dialogsReducer,
    authPage:authReducer,
    form: formReducer,
    app:appReducer,
    profilePage:profileReducer,
    newsPage:newsReducer
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,  composeEnhancers( applyMiddleware(thunkMiddleware)));

// @ts-ignore
window._store_ = store;

export default store;