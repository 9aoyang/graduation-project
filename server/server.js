const express = require('express');
const mongoose = require('mongoose');
// 链接 mongo
const DB_URL = 'mongodb://localhost:27017/imooc';
mongoose.connect(DB_URL);
// 新建 app
const app = express();

const User = mongoose.model('user', new mongoose.Schema({
  user: { type: String, require: true },
  age: { type: Number, require: true },
}));

// 新增
// User.create({
//   user: 'xiaoming',
//   age: 222,
// }, (err, doc) => {
//   if (!err) {
//     console.log(doc);
//   } else {
//     console.log(err);
//   }
// });
// 删除
// User.remove({ age: 222 }, (err, doc) => {
//   console.log(doc);
// });
// 更新
// User.update({ user: 'xiaoming' }, { $set: { age: 10 } }, (err, doc) => {
//   console.log(doc);
// });

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/data', (req, res) => {
  // 查找
  User.findOne({ user: 'xiaoming' }, (err, doc) => {
    res.json(doc);
  });
  // User.find({ user: 'xiaoming' }, (err, doc) => {
  //   res.json(doc);
  // });
});

app.listen(9093, () => {
});
