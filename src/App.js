import React, { Component } from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import store from './store';
import {Provider} from 'react-redux';
// import Loadable from 'react-loadable';
// import logo from './logo.svg';
import Index from './pages/index';
import Login from './pages/login';
import Register from './pages/register';

import {
  BrowserRouter,
  Route
} from 'react-router-dom'

import './App.css';

// function loadingComponent() {
//   return <div>Loading...</div>;
// }

// const asyncLogin = Loadable({
//   loader: () => import('./pages/login'),
//   loading: loadingComponent,
// });

// const asyncRegister = Loadable({
//   loader: () => import('./pages/register'),
//   loading: loadingComponent,
// });

// const asyncIndex = Loadable({
//   loader: () => import('./pages/index'),
//   loading: loadingComponent,
// });

class App extends Component {
  constructor(){
    super();
    this.state={show:false};
  }
 
  render() {

    return (
      <Provider store={store}>
          
          <BrowserRouter>
            <div style={{height:'100%'}}>
              <Route exact path="/" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/chat" component={Index}/>
            </div>
          </BrowserRouter>
         
      </Provider>
      
    );
  }
}

export default App;
