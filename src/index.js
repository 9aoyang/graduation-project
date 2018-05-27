import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import Bossinfo from './container/bossinfo/bossinfo';
import reducers from './reducer';
import './config';
import './index.css';


const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk),
  window.devToolExtension ? window.devToolExtension() : f => f,
));
function Boss() {
  return <h2>BOSS 页面 </h2>;
}
ReactDom.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute />
          <Route path="/bossinfo">{Bossinfo}</Route>
          <Route path="/boss" component={Boss} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root'),
);

