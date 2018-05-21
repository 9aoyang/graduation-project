const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL);

const models = {
  user: {
    username: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    // boss字段
    company: { type: String },
    money: { type: String },
  },

  chat: {

  },
};

// eslint-disable-next-line
for (const m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  },
};
