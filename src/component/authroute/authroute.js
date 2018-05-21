import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

@withRouter

class AuthRoute extends React.Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      // return null;
      console.log(1);
    }
    // 获取用户信息
    axios.get('/user/info')
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 有登录信息
          } else {
            this.props.history.push('/login');
          }
        }
      });
    // 是否登录

    // url 地址，login 不需要跳转

    // 用户身份

    // 是否完善个人信息）
  }

  render() {
    return null;
  }
}

export default AuthRoute;
