const mongoose = require('mongoose');
const User = require('./User');

const ToDoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
      default: 'open',
    },
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const ToDos = mongoose.model('todos', ToDoSchema);

module.exports = ToDos;
