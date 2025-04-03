import { Todo } from '../models/todo.js';

class todoController {
    constructor() {
        // hold todo objects in memory
        this.TODOS = [];
    }

    createTodo(req, res) {
        // get data from POST request
        const task = req.body.task;
        // create new object via Todo model
        // model constructor uses unique id and task name as parameter
        const newTodo = new Todo(Math.random().toString(), task)
        // add new todo to todos array
        this.TODOS.push(newTodo);
        // create a correct response
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    getTodos(req, res) {
        res.json({ tasks: this.TODOS })
    }
    
    updateTodo = (req, res) => {
        const todoId = req.params.id;
        const updatedTask = req.body.task;
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);

        if(todoIndex < 0){
            res.json({
                message: 'Could not find todo with such index'
            });
            throw new Error('Could not find todo');
        }

        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
        res.json({
            message: 'Todo updated successfully',
            updatedTask: this.TODOS[todoIndex]
        });
    }

    deleteTodo = (req, res) => {
        const todoId = req.params.id;
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);

        if(todoIndex < 0){
            res.json({
                message: 'Could not find todo with such index'
            });
            throw new Error('Could not find todo');
        }

        const deleteTodo = this.TODOS.splice(todoIndex, 1)[0];
        res.json({
            message: 'Todo deleted successfully',
            deletedTask: this.TODOS[todoIndex]
        });
    }
}

export const TodoController = new todoController();