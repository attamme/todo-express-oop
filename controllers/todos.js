import { Todo } from '../models/todo.js';
import { fileManager } from '../utils/files.js';

class todoController {
    constructor() {
        // try to get data from file and init tasks array
        this.initTODOS();
    }

    async createTodo(req, res) {
        // get data from POST request
        const task = req.body.task;
        // create new object via Todo model
        // model constructor uses unique id and task name as parameter
        const newTodo = new Todo(Math.random().toString(), task)
        // add new todo to todos array
        this.TODOS.push(newTodo);
        // save save to file
        await fileManager.writeFile('./data/todos.json', this.TODOS);
        // create a correct response
        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    async initTODOS() {
        const todosData = await fileManager.readFile('./data/todos.json');
        // if data is ok - add file content to  array
        if(todosData !== null) {
            this.TODOS = todosData;
        } else {
            this.TODOS = []; // if we do not get data from file create an empty array
        }
    }

    getTodos(req, res) {
        res.json({ tasks: this.TODOS })
    }
    
    async updateTodo(req, res) {
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
        await fileManager.writeFile('./data/todos.json', this.TODOS);
        res.json({
            message: 'Todo updated successfully',
            updatedTask: this.TODOS[todoIndex]
        });
    }

    async deleteTodo(req, res) {
        const todoId = req.params.id;
        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);

        if(todoIndex < 0){
            res.json({
                message: 'Could not find todo with such index'
            });
            throw new Error('Could not find todo');
        }

        const deleteTodo = this.TODOS.splice(todoIndex, 1)[0];
        await fileManager.writeFile('./data/todos.json', this.TODOS);
        res.json({
            message: 'Todo deleted successfully',
            deletedTask: this.TODOS[todoIndex]
        });
    }
}

export const TodoController = new todoController();