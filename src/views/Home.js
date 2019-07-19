import React, { Component } from 'react'
import {NavLink} from "react-router-dom"
import "../css/Home.css"
import { Layout } from 'antd';
import { Menu, Icon, Button ,Modal} from 'antd';
import RouterView from '../routes/routerViews';
import {routes} from "../routes/routerConfig"
import Cookie from "js-cookie"
import axios from "axios"

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            data:{},
            homszt:false,
            sehzhizt:false,
            baoxianzt:false,
            daikuanzt:false,
            zhuandanzt:false
          };
      }

      componentDidMount(){
          axios.defaults.headers.common['authorization']=Cookie.get("authorization")

          axios.get("http://localhost:3000/api/islogin").then(({data})=>{
            console.log(data.info,"data.info")
            this.setState({
                data:data.info
            })
            if(Cookie.get("authorization")){
                this.props.history.push("/Home")
            }else{
                this.props.history.push("/login")
            }
        })
      }

      render() {

        let arrTag=[];
        return (
          <div className="Home">
               <Layout style={{height:"100%"}}>
                    <Sider>
                <div style={{ width: 190,height:500 }}>
                    <div className="touxiang">
                        <div className="touxiangimg">
                            <img src={this.state.data.facePhoto} alt=""/>
                        </div>
                        <span className="telPhone">{this.state.data.phone}</span>
                    </div>
                    <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span >首页</span>
                        <NavLink to="/Home/HomePage"
                         onClick={()=>{
                           this.setState({
                               homszt:true
                           })
                        }}
                        ></NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>设置</span>
                        <NavLink to="/Home/Shezhi" 
                         onClick={()=>{
                            this.setState({
                                shezhizt:true
                            })
                         }}
                        ></NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>订单管理</span>
                        </span>
                        }
                    >
                        <Menu.Item key="5">
                            贷款订单
                            <NavLink to="/Home/daikuanDD" 
                                 onClick={()=>{
                                    this.setState({
                                       huokuanzt:true
                                    })
                                 }}
                            ></NavLink>    
                        </Menu.Item>
                        <Menu.Item key="6">
                            转单订单
                            <NavLink to="/Home/zhuandanDD"
                                 onClick={()=>{
                                    this.setState({
                                        zhuandanzt:true
                                    })
                                 }}
                            ></NavLink>    
                        </Menu.Item>
                        <Menu.Item key="7">
                            保险订单
                            <NavLink to="/Home/baoxianDD"
                                 onClick={()=>{
                                    this.setState({
                                        baoxianzt:true
                                    })
                                 }}
                            ></NavLink>   
                        </Menu.Item>
                    </SubMenu>
                    </Menu>
                    <div className="btn">
                        <button onClick={()=>{
                            let that=this
                            confirm({
                              title: '您确定要退出',
                              content: '',
                              onOk() {
                                console.log(that)
                                console.log('确定');
                                that.props.history.push("/login")
                                Cookie.remove("authorization");
                              },
                              onCancel() {
                                console.log('取消');
                              },
                            });
                        }}>退出</button>
                        <button>设置</button>
                    </div>
                </div>
                </Sider>
                    <Layout>
                        <Header style={{background:"#eee"}}>
                            <div className="headerTag">
                            {this.state.homszt&&
                            <>
                                <div>
                                    <NavLink to="/Home/HomePage" className="navTag">首页</NavLink>
                                    
                                </div>
                                <div > 
                                    <span className="deleteBtn" onClick={()=>{
                                        // this.remove(this)
                                        console.log(1)
                                    }}>×</span> 
                                </div>
                            </>
                            }
                            {this.state.shezhizt&&
                            <>
                                <div>
                                    <NavLink to="/Home/Shezhi" className="navTag"> 设置 </NavLink>
                                    
                                </div> <div > 
                                    <span className="deleteBtn" onClick={()=>{
                                        // this.remove(this)
                                        console.log(1)
                                    }}>×</span> 
                                </div>
                                 </>
                            }
                            {this.state.huokuanzt&&
                            <>
                            <div>
                                 <NavLink to="/Home/daikuanDD" className="navTag"> 货款订单 </NavLink>
                                 
                            </div>
                                 <div > 
                                 <span className="deleteBtn" onClick={()=>{
                                     // this.remove(this)
                                     console.log(1)
                                 }}>×</span> 
                             </div>
                             </>
                             }
                            {this.state.zhuandanzt&&
                            <>
                            <div>
                                   <NavLink to="/Home/zhuandanDD" className="navTag"> 转单订单 </NavLink>
                                    
                            </div>
                                 <div > 
                                 <span className="deleteBtn" onClick={()=>{
                                     // this.remove(this)
                                     console.log(1)
                                 }}>×</span> 
                             </div>
                             </>
                            }
                            {this.state.baoxianzt&&
                            <>
                            <div>
                                     <NavLink to="/Home/baoxianDD" className="navTag"> 保险订单 </NavLink>
                                     
                            </div>
                                <div > 
                                <span className="deleteBtn" onClick={()=>{
                                    // this.remove(this)
                                    console.log(1)
                                }}>×</span> 
                            </div>
                            </>
                            }
                            </div>  
                        </Header>
                        <Content>
                            <RouterView routes={this.props.children}></RouterView>
                        </Content>
                    </Layout>
               </Layout>
          </div>    
        )
      }
}
