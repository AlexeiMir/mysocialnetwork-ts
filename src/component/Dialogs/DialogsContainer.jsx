import React, {useEffect} from 'react'
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {getAllDialogs} from "../../redux/dialogs-reducer";
import Preloader from "../common/Preloader";

const DialogsContainer = () => {
    const dialogs = useSelector(state => state.dialogsPage.dialogs)
    const isFetching = useSelector(state => state.dialogsPage.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllDialogs())
    },[dispatch,dialogs])

    return <>

        {isFetching
        ? <Preloader/>:null}
        <Dialogs dialogs={dialogs}/>

        </>
}

export default DialogsContainer