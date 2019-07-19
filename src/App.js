import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import RouterView from "./routes/routerViews"
import {routes} from "./routes/routerConfig"

class App extends React.Component{
  constructor(props) {
    super(props);
    
  }

  render() {
    return ( 
    <Router>
      <div id="app">
         <RouterView routes={routes}></RouterView> 
      </div> 
    </Router>
      
    );
  }
  
}

export default App;
