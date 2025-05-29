const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timeStamps: true,
  }
);

exports.TodoItem = mongoose.model("TodoItem", todoItemSchema);
