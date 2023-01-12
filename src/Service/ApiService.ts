import { TaskModel, UsersModel } from "../model/TaskModel"
import axios from 'axios';
import { store } from '../app/store';
import { ifUser } from "../app/usersSlice";
import { toast } from "react-toastify";
import { logout } from "../app/authSlice (1)";

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
                store.dispatch(logout);
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
        const response = await axios.get(`http://localhost:3080/tasks/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        console.log(response.data)
        return response.data;
    }


    async AddNewTask(id: number, taskBody: TaskModel) {
        console.log(id);

        let token = getToken()
        const taskBodyString = JSON.stringify(taskBody)
        const response = await axios.post(`http://localhost:3080/tasks/add/${id}`, taskBodyString, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    async deleteTask(Taskid: number) {
        let token = getToken()
        const response = await axios.delete(`http://localhost:3080/tasks/delete/${Taskid}`, {
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
        const response = await axios.put(`http://localhost:3080/tasks/update/${taskId}`,
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
        const response = await axios.put(`http://localhost:3080/tasks/edit/${taskId}`,
            taskStringify,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        )
        console.log(response)
        return response;
    }

    async searchUserToCollab(username: String) {
        let token = getToken();
        const usernameStringify = JSON.stringify(username)
        console.log(usernameStringify);

        const response = await axios.post(`http://localhost:3080/users/collab`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: username,
            mode: 'no-cors'
        })

        console.log(response);
        return response
    }

    async randomTaskGeneratorOpenAi(query: any) {
        console.log(query.query);

        let token = getToken();
        const response = await axios.post(`http://localhost:3080/openai/task`, {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: query.query,
            mode: 'no-cors',
        })
        console.log(response)
        return response.data;
    }

    async imageGeneratorOpenAi(content: any) {
        // console.log(query);

        let token = getToken();
        const response = await axios.post(`http://localhost:3080/openai/image`, {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: content,
            mode: 'no-cors',
        })
        console.log(response)
        return response.data;
    }

    async saveImageToDB(url: string, id: number) {
        let token = getToken();
        const response = await axios.post(`http://localhost:3080/openai/image/save/${id}`, {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: url,
            mode: 'no-cors',
        })
        console.log(response)
        return response.data;
    }

    async deleteImageFromDB(id: number) {
        let token = getToken();
        const response = await axios.delete(`http://localhost:3080/openai/image/delete/${id}`, {
            method: "DELETE",

            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // mode: 'no-cors',
        })
        return response.data;
    }

}



export const apiService = new ApiService