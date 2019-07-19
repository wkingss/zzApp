import login from "../views/login";
import Home from "../views/Home";
import HomePage from "../views/Home/HomePage"
import Shezhi from "../views/Home/Shezhi"
import baoxianDD from "../views/dingdanGL/baoxianDD"
import daikuanDD from "../views/dingdanGL/daikuanDD"
import zhuandanDD from "../views/dingdanGL/zhuandanDD"

export const routes=[
    {
        path:"/login",
        component:login
    },{
        path:"/Home",
        component:Home,
        children:[
            {
                path:"/Home/HomePage",
                component:HomePage
            },{
                path:"/Home/Shezhi",
                component:Shezhi
            },{
                path:"/Home/baoxianDD",
                component:baoxianDD
            },{
                path:"/Home/daikuanDD",
                component:daikuanDD
            },{
                path:"/Home/zhuandanDD",
                component:zhuandanDD
            }
        ]
    },{
        path:"/Shezhi",
        component:Shezhi
    }
]