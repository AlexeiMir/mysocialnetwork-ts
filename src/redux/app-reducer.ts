import {getAuthUserData} from "./auth-reducer";
import {BaseThunkType, InferActionsTypes} from '../redux/redux-store'


const initialState = {
    initilized:false
}



const appReducer = (state=initialState,action:ActionsTypes):InitialStateType => {
    switch (action.type) {

        case "SN/APP/INITIALIZED_SUCCESS":{
            return{
                ...state,initilized:true
            }
}

        default:
            return state

    }

}

const actions = {
    initializeSuccess : () => ({type:'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = ():ThunkType => async (dispatch) => {
    const promise = await getAuthUserData()
    Promise.all([promise]).then(() => {
        dispatch(actions.initializeSuccess())
    })
}

export type InitialStateType = typeof initialState
export type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>


export default appReducer;

