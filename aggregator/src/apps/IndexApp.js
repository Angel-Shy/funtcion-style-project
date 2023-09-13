import React from "react";
import LoginRight from "../components/LoginRight/LoginRight";
import LoginLeft from "../components/LoginLeft/LoginLeft";


export default class IndexApp extends React.Component{
    render() {
        return <div className='loginLayout flex-layout'>
            <LoginLeft/>
            <LoginRight/>
        </div>
    }
}