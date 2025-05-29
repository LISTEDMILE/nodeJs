const express = require('express');
const todoItemController = require('../controllers/todoItemController');

todoItemsRouter = express.Router();

todoItemsRouter.post('/', todoItemController.createTodoItem);
todoItemsRouter.get('/', todoItemController.getAllTodoItems);
todoItemsRouter.delete('/:id', todoItemController.deleteTodoItem);
todoItemsRouter.put('/:id/complete', todoItemController.markTodoItemAsComplete);

module.exports = todoItemsRouter;