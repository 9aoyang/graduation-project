import axios from 'axios';
import getRedirectPath from '../util';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  redirectTo: '',
  isAuth: false,
  msg: '',
  username: '',
  pwd: '',
  type: '',
};
// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload,
      };
    case ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
        isAuth: false,
        ...action.payload,
      };
    default:
      return state;
  }
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, payload: data };
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, payload: data };
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

export function login({ username, pwd }) {
  if (!username || !pwd) {
    return errorMsg('用户名或密码不能为空！');
  }
  return (dispatch) => {
    axios.post('/user/login', { username, pwd }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function register({
  username, pwd, repwd, type,
}) {
  if (!username || !pwd || !type) {
    return errorMsg('用户名或密码不能为空！');
  }
  if (pwd !== repwd) {
    return errorMsg('两次输入密码不一致！');
  }
  return (dispatch) => {
    axios.post('/user/register', { username, pwd, type }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess(username, pwd, type));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
