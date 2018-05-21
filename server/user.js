const express = require('express');
const utils = require('utility');
const model = require('./model');

const Router = express.Router();
const User = model.getModel('user');
Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => res.json(doc));
});

function md5Pwd(pwd) {
  const salt = 'ahu_is_good_&*^UYGYU^&*';
  return utils.md5(utils.md5(pwd + salt));
}

Router.post('/register', (req, res) => {
  console.log(req.body);
  const { username, pwd, type } = req.body;
  // eslint-disable-next-line
  User.findOne({ username }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' });
    }
    User.create({ username, type, pwd: md5Pwd(pwd) }, (e, d) => {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      return res.json({ code: 0 });
    });
  });
});

Router.get('/info', (req, res) => {
  // 用户有无 cookie

  res.json({ code: 1 });
});

module.exports = Router;
