import React, {ComponentType} from "react";
import {compose} from "redux";
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from "react-router-dom";

function A<T extends {name: string}>(entity: T) {

}
type WithNameType = {name: string}
A({name: 'sdsfs', age: 10})
let a:WithNameType = {name: 'sdsfs'}



function HipHopHOC<WP extends {hiphop:number}>(WrappedComponent:ComponentType<WP>) {
    let ContainerComponent: React.FC<Omit<WP, 'hiphop'>> = (props) => {
        return <div><WrappedComponent {...props as WP} hiphop={10}/></div>
    }
    return ContainerComponent

}
function DanceHOC<WP extends {dance:number}>(WrappedComponent:ComponentType<WP>) {
    let ContainerComponent: React.FC<Omit<WP, 'dance'>> = (props) => {
        return <div><WrappedComponent {...props as WP} dance={10}/></div>
    }
    return ContainerComponent

}

type C1PropsType = {
    title: string
    age: number
}

type MapPropsType = {
    dance: number
}

type C1ParamsType = {
    userId: string
}

const C1: React.FC<C1PropsType & MapPropsType & RouteComponentProps<C1ParamsType>> = (props) => {
    return <div>{props.title}</div>

}

/*const C1Container = HipHopHOC(C1)
const C1Container2 = DanceHOC(C1Container)*/

type FromHipHopHOCPropsType = Omit<C1PropsType, 'hiphop'>
type FromHipHopHOCType = ComponentType<Omit<C1PropsType, 'hiphop'>>
type FromDanceHOCType = ComponentType<Omit<FromHipHopHOCPropsType, 'dance'>>

let WithoutHipHopComponent:FromDanceHOCType

/*const SuperHOC = compose<
    FromHipHopHOCType, //A
    ComponentType<C1PropsType>, //T1
    FromDanceHOCType>(//R
    DanceHOC,
    HipHopHOC
)
const C1Container2 = SuperHOC(C1)*/

let mstp = (state:any) => {
    return {
        dance:12,
        hiphop: 100
    }
}
/*const C1_1connect = connect(mstp)(C1)
const ConnectedWithRouterC1 = withRouter(C1_1connect)*/

const ConnectedWithRouterC1 = compose<ComponentType<Omit<C1PropsType, 'hiphop'>>>(
    withRouter,
  connect(mstp),
    HipHopHOC
)(C1)

const App1 = () => {
    return <>
        <ConnectedWithRouterC1 title={'it-kamasutra'} age={18}  />
    </>
}