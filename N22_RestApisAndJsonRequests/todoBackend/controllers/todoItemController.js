const { TodoItem } = require("../models/todoItem");

exports.createTodoItem = (req, res) => {
    const {task, date} = req.body;
    const todoItem = new TodoItem({
        task: task,
        date: date,
    });
    todoItem.save()
        .then(result => {
            res.status(201).json({
                message: "Todo item created successfully",
                todoItem: result
            });
        })
        .catch(err => {
            console.error("Error creating todo item:", err);
            res.status(500).json({
                message: "Internal server error",
                error: err.message
            });
        });
}
    
exports.getAllTodoItems = (req, res) => {
    TodoItem.find()
        .then(todoItems => {
            res.status(200).json({
                message: "Todo items retrieved successfully",
                todoItems: todoItems
            });
        })
        .catch(err => {
            console.error("Error retrieving todo items:", err);
            res.status(500).json({
                message: "Internal server error",
                error: err.message
            });
        });
}
    
    exports.deleteTodoItem = (req, res) => {
        const todoItemId = req.params.id;
        TodoItem.findByIdAndDelete(todoItemId)
            .then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Todo item not found"
                    });
                }
                res.status(200).json({
                    message: "Todo item deleted successfully"
                });
            })
            .catch(err => {
                console.error("Error deleting todo item:", err);
                res.status(500).json({
                    message: "Internal server error",
                    error: err.message
                });
            });
}


exports.markTodoItemAsComplete = (req, res) => {
    const todoItemId = req.params.id;
    TodoItem.findByIdAndUpdate(
        todoItemId,
        { completed: true },
        
    )
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: "Todo item not found"
                });
            }
            res.status(200).json({
                message: "Todo item marked as complete",
                todoItem: result
            });
        })
        .catch(err => {
            console.error("Error marking todo item as complete:", err);
            res.status(500).json({
                message: "Internal server error",
                error: err.message
            });
        });
}