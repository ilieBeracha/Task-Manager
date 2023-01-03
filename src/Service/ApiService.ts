import { TaskModel, UsersModel } from "../model/TaskModel"
import axios from 'axios';
import { store } from '../app/store';
import { ifUser } from "../app/usersSlice";
import { toast } from "react-toastify";

function toastMessSignInAgain() {
    toast.error('Please sign in again', {
        position: toast.POSITION.TOP_CENTER,
        className: 'SignInAgainToast',
        theme: "colored",
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
    })
}

function getToken() {
    let token = window.localStorage.getItem('token');
    return token;
}

class ApiService {
    constructor() {
        axios.interceptors.response.use((response) => response, (error) => {
            if (error.response.status === 401) {
                toastMessSignInAgain()
                window.localStorage.removeItem('token');
                store.dispatch(ifUser(false));
            }
        });
    }
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
        let token = getToken();
        const response = await axios.get(`http://localhost:3080/users/tasks/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    }


    async AddNewTask(id: number, taskBody: TaskModel) {
        let token = getToken()
        const taskBodyString = JSON.stringify(taskBody)
        const response = await axios.post(`http://localhost:3080/users/tasks/add/${id}`, taskBodyString, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    async deleteTask(Taskid: number) {
        let token = getToken()
        const response = await axios.delete(`http://localhost:3080/users/tasks/delete/${Taskid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
    }

    async updateTask(task: TaskModel) {
        let token = getToken()
        console.log(task.indexPriority)
        const taskId = task.id
        const taskStringify = JSON.stringify(task)
        const response = await axios.put(`http://localhost:3080/users/tasks/update/${taskId}`,
            taskStringify,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
        console.log(response)
        return response;
    }
    async updateEditTask(task: TaskModel) {
        let token = getToken()
        const taskId = task.id
        const taskStringify = JSON.stringify(task)
        const response = await axios.put(`http://localhost:3080/users/tasks/edit/${taskId}`,
            taskStringify,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
        console.log(response)
        return response;
    }
}

export const apiService = new ApiService