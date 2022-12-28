import { TaskModel, UsersModel } from "../model/TaskModel"
import axios from 'axios';

class ApiService {
    async login(user: UsersModel) {
        const userJson = JSON.stringify(user)
        const person = await fetch('http://localhost:3050/api/users/login', {
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
        const person = await fetch('http://localhost:3050/api/users/register', {
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
        const task = await fetch(`http://localhost:3050/api/users/tasks/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })
        return task;

    }

    // async AddNewTask(id: number, taskBody: TaskModel) {
    //     const taskBodyString = JSON.stringify(taskBody)
    //     await fetch(`http://localhost:3050/api/users/tasks/add/${id}`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         mode: 'cors',
    //         body: taskBodyString
    //     })
    // }


    async AddNewTask(id: number, taskBody: TaskModel) {
        try {
            const taskBodyString = JSON.stringify(taskBody)
            const response = await axios.post(`http://localhost:3050/api/users/tasks/add/${id}`, taskBodyString, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteTask(Taskid: string, userId: string) {
        const response = await fetch(`http://localhost:3050/api/users/tasks/delete/${Taskid}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }

    async updateTask(sub:any,task:TaskModel) {
        const taskStringify = JSON.stringify(task)
        const response = await fetch(`http://localhost:3050/api/users/tasks/update/${sub}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: taskStringify
        })
    }

    


}

export const apiService = new ApiService