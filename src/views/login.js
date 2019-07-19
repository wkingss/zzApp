import React, { Component } from 'react'
import "../css/login.css"
import axios from "axios"
import Cookie from "js-cookie"

export default class login extends Component {

    constructor(props) {
        super(props);
        this.state={
            phone:"",
            password:"",
            checkcode:"",
            code:""
        }
    }
    

    render() {
        let {phone,password,checkcode} = this.state;
        return (
            <div className="login">
              <div className="loginLeft">
                  <p className="welcome">Welcome</p>
                  <p className="welcomeNextp">赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台</p>
              </div>
              <div className="loginRight">
                  <div className="logintab">
                      <dl>
                          <dt>
                              <div className="icon">
                                  <span>赚</span>
                              </div>
                          </dt>
                          <dd>赚赚金融渠道管理系统</dd>
                         </dl>  
                          <p>
                              <input type="text" placeholder="手机号" 
                                                 value={this.state.phone} 
                                                 onChange={(e)=>{
                                                    this.setState({
                                                        phone:e.target.value
                                                    })
                                                 }}/>
                          </p>
                          <p>
                              <input type="text" placeholder="密码"
                                                value={this.state.password} 
                                                onChange={(e)=>{
                                                   this.setState({
                                                       password:e.target.value
                                                   })
                                                }}
                              />
                          </p>
                          <p>
                              <input type="text" placeholder="验证码"
                                                value={this.state.checkcode} 
                                                onChange={(e)=>{
                                                   this.setState({
                                                       checkcode:e.target.value
                                                   })
                                                }}
                              />
                              <span className="yanzheng" onClick={()=>{
                                  axios.get("http://localhost:3000/api/checkCode").then(({data})=>{
                                      console.log(data)
                                        this.setState({
                                            code:data.Verification
                                        })
                                  })
                              }}>{this.state.code}</span>
                          </p>
                          <button className="loginBtn" onClick={()=>{
                            this.props.history.push("/Home")
                            axios.post("http://localhost:3000/api/login",{phone:phone,password:password,checkcode:checkcode}).then(res=>{
                                console.log(res,"loginres")

                                Cookie.set('authorization',res.data.sessionId)
                                
                            })
                          }}>登录</button>
                     
                  </div>
              </div>
            </div>

        )
    }

}
