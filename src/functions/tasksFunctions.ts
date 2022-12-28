import { DropResult } from "react-beautiful-dnd";
import { apiService } from "../Service/ApiService";
import { getIdJwt } from "../Service/getIdJwt";

class TasksFunctions{
    async getTasks(dispatch:any,getTasksRedux:any, setTodo:any, setInProgress:any, setCompleted:any) {
        const sub = await getIdJwt();
        let results = await apiService.getTasks(sub)
        const jsonResults: any = await results.json();
        // setTasks([...jsonResults]);
        dispatch(getTasksRedux(jsonResults))

        const todoTasks = jsonResults.filter((res: any) => res.taskStatus === "todo");
        setTodo(todoTasks);

        const inProgressTasks = jsonResults.filter((res: any) => res.taskStatus === "inProgress");
        setInProgress(inProgressTasks);

        const completedTasks = jsonResults.filter((res: any) => res.taskStatus === "completed");
        setCompleted(completedTasks);
    }

    // async searchTasks(event: any, dispatch:any, getTasksRedux:any, setTodo:any, setInProgress:any, setCompleted:any,tasksSelector:[]) {
    //     event.preventDefault();
    //     if (event.target.value === '') {
    //         await tasksFunctions.getTasks(dispatch,getTasksRedux,setTodo,setInProgress,setCompleted);
    //         ;
    //     } else {
    //         const searchResults = tasksSelector.filter((t: any) => (t.taskName).toLocaleLowerCase().includes((event.target.value).toLocaleLowerCase()) || (t.taskContent).toLocaleLowerCase().includes((event.target.value).toLocaleLowerCase()));
    //         dispatch(getTasksRedux(searchResults));
    //         setTodo(searchResults.filter((res: any) => res.taskStatus === "todo"));
    //         setInProgress(searchResults.filter((res: any) => res.taskStatus === "inProgress"));
    //         setCompleted(searchResults.filter((res: any) => res.taskStatus === "completed"));
    //     }
    // }

    //  onDragEnd(result: DropResult,todo:any,inProgress:any,completed:any,setTodo:any,setInProgress:any,setCompleted:any,updateTask:any) {
    //     const { source, destination } = result;
    //     if (!destination) return;
    //     if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    //     let add: any
    //     let todoTasks = todo
    //     let inProgressTasks = inProgress
    //     let completedTasks = completed

    //     if (source.droppableId === "TasksTodoDroppable") {
    //         add = todoTasks[source.index]
    //         todoTasks.splice(source.index, 1)
    //     } else if (source.droppableId === "TasksInProgressDroppable") {
    //         add = inProgressTasks[source.index]
    //         inProgressTasks.splice(source.index, 1)
    //     } else if (source.droppableId === "TaskCompletedDroppable") {
    //         add = completedTasks[source.index]
    //         completedTasks.splice(source.index, 1)
    //     }

    //     if (destination.droppableId === "TasksTodoDroppable") {
    //         todoTasks.splice(destination.index, 0, add)
    //     } else if (destination.droppableId === "TasksInProgressDroppable") {
    //         inProgressTasks.splice(destination.index, 0, add)
    //     } else if (destination.droppableId === "TaskCompletedDroppable") {
    //         completedTasks.splice(destination.index, 0, add)
    //     }

    //     setTodo(todoTasks);
    //     setInProgress(inProgressTasks);
    //     setCompleted(completedTasks);
        
    //     let newStatus: string = add.newStatus;
    //     if (destination.droppableId === "TasksTodoDroppable") {
    //         newStatus = "todo"
    //     } else if (destination.droppableId === "TasksInProgressDroppable") {
    //         newStatus = "inProgress"
    //     } else if (destination.droppableId === "TaskCompletedDroppable") {
    //         newStatus = "completed"
    //     }

    //     console.log(newStatus)

    //     updateTask(add, newStatus);
    // }
}

export const tasksFunctions = new TasksFunctions()