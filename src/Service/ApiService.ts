import { TaskModel, UsersModel } from "../model/TaskModel"
import axios from 'axios';

class ApiService {
    async login(user: UsersModel) {
        const userJson = JSON.stringify(user)
        const person = await fetch('http://localhost:3080/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: userJson,
            mode: 'cors',
        })
        return person;
    }

    async register(user: UsersModel) {
        const userJson = JSON.stringify(user)
        const person = await fetch('http://localhost:3080/users/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: userJson,
            mode: 'cors',
        })
        return person;
    }


    async getTasks(id: number) {
        const task = await fetch(`http://localhost:3080/users/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })
        return task;

    }

    async AddNewTask(id: number, taskBody: TaskModel) {
        try {
            const taskBodyString = JSON.stringify(taskBody)
            const response = await axios.post(`http://localhost:3080/users/tasks/add/${id}`, taskBodyString, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTask(Taskid: number) {
        const response = await fetch(`http://localhost:3080/users/tasks/delete/${Taskid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    async updateTask(task:TaskModel) {
        const taskId = task.id
        const taskStringify = JSON.stringify(task)
        const response = await fetch(`http://localhost:3080/users/tasks/update/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: taskStringify
        })
    }

    


}

export const apiService = new ApiService