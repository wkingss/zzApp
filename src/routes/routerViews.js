import React, { Component } from 'react'
import {Route,Switch,Redirect} from "react-router-dom"
 
export default class RouterView extends Component {
    render() {
        let {routes}=this.props

        let arrRedirect=routes.filter((item,index)=>{
            return item.redirect
        })

        let RedirectS=arrRedirect.map((item,index)=>{
            return <Redirect from={item.path} exact to={item.redirect}></Redirect>
        })

        routes=routes.filter(item=>!item.redirect)

        return (
            <div>
                <Switch>
                    {routes.map((item,index)=>{
                        return <Route key={index} path={item.path} render={(props)=>{
                            return <>
                                {item.children&&<item.component children={item.children} {...props}/>}
                                {!item.children&&<item.component {...props}/>}
                            </>
                        }}></Route>
                    })}
                    {RedirectS.length!==0&&RedirectS}
                </Switch>
            </div>
        )
    }
}
