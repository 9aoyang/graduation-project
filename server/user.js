const express = require('express');
const utils = require('utility');
const model = require('./model');

const Router = express.Router();
const User = model.getModel('user');
const _filter = { pwd: 0, __v: 0 };
Router.get('/list', (req, res) => {
  // User.remove({}, (e, d) => {});
  User.find({}, (err, doc) => res.json(doc));
});

function md5Pwd(pwd) {
  const salt = 'ahu_is_good_&*^UYGYU^&*';
  return utils.md5(utils.md5(pwd + salt));
}

Router.post('/login', (req, res) => {
  const { username, pwd } = req.body;
  User.findOne({ username, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误！' });
    }
    res.cookie('userId', doc._id);
    return res.json({ code: 0, data: doc });
  });
});

Router.post('/register', (req, res) => {
  // console.log(req.body);
  const { username, pwd, type } = req.body;
  // eslint-disable-next-line
  User.findOne({ username }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' });
    }

    const userModel = new User({ username, type, pwd: md5Pwd(pwd) });
    userModel.save((e, d) => {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      // eslint-disable-next-line
      const { username, type, _id } = d;
      res.cookie('userId', _id);
      return res.json({ code: 0, data: { username, type, _id } });
    });
  });
});

Router.get('/info', (req, res) => {
  // 用户有无 cookie
  const { userId } = req.cookies;
  if (!userId) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userId }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

module.exports = Router;
