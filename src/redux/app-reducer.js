import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS"

const initialState = {
    initilized:false
}



const appReducer = (state=initialState,action) => {
    switch (action.type) {

        case INITIALIZED_SUCCESS:{
            return{
                ...state,initilized:true
            }
}

        default:
            return state

    }

}

const initializeSuccess = () => ({type:INITIALIZED_SUCCESS})

export const initializeApp = () => async (dispatch) => {
    const promise = await getAuthUserData()
    Promise.all([promise]).then(() => {
        dispatch(initializeSuccess())
    })
}


export default appReducer;

