import { DropResult } from "react-beautiful-dnd";
import { apiService } from "../Service/ApiService";
import { getIdJwt } from "../Service/getIdJwt";

class TasksFunctions{
    async getTasks(dispatch:any,getTasksRedux:any, setTodo:any, setInProgress:any, setCompleted:any) {
        const sub = await getIdJwt();
        console.log(sub)
        let results = await apiService.getTasks(sub)
        const jsonResults: any = results
        console.log(results);
        dispatch(getTasksRedux(jsonResults))
        const todoTasks = jsonResults.filter((res: any) => res.taskStatus === "todo");
        setTodo(todoTasks);

        const inProgressTasks = jsonResults.filter((res: any) => res.taskStatus === "inProgress");
        setInProgress(inProgressTasks);

        const completedTasks = jsonResults.filter((res: any) => res.taskStatus === "completed");
        setCompleted(completedTasks);
    }
}

export const tasksFunctions = new TasksFunctions()