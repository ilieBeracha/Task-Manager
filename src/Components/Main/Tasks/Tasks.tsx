import { useEffect, useState } from "react";
import { TaskModel } from "../../../model/TaskModel";
import { apiService } from "../../../Service/ApiService";
import "./Tasks.css";
import Task from "./Task/Task";
import AddTask from "./AddTask/AddTask";
import { getIdJwt } from "../../../Service/getIdJwt";
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';



function Tasks(): JSX.Element {
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [todo, setTodo] = useState<TaskModel[]>([])
    const [inProgress, setInProgress] = useState<TaskModel[]>([])
    const [completed, setCompleted] = useState<TaskModel[]>([])

    const [refreshTasks, setRefreshTasks] = useState<boolean>(false);


    useEffect(() => {
        getTasks()
    }, [refreshTasks]);


    async function getTasks() {
        const sub = await getIdJwt();
        let results = await apiService.getTasks(sub)
        const jsonResults: any = await results.json();
        setTasks([...jsonResults]);

        const todoTasks = jsonResults.filter((res: any) => res.taskStatus === "todo");
        setTodo(todoTasks);

        const inProgressTasks = jsonResults.filter((res: any) => res.taskStatus === "inProgress");
        setInProgress(inProgressTasks);

        const completedTasks = jsonResults.filter((res: any) => res.taskStatus === "completed");
        setCompleted(completedTasks);
    }


    async function searchTasks(event: any) {
        event.preventDefault();
        if (event.target.value === '') {
            await getTasks();
        } else {
            setTasks(tasks.filter((t) => t.taskName.includes(event.target.value)));
        }
    }

    function onDragEnd(result: DropResult) {
        const { source, destination } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let add: any
        let todoTasks = todo
        let inProgressTasks = inProgress
        let completedTasks = completed

        if (source.droppableId === "TasksTodoDroppable") {
            add = todoTasks[source.index]
            todoTasks.splice(source.index, 1)
        } else if (source.droppableId === "TasksInProgressDroppable") {
            add = inProgressTasks[source.index]
            inProgressTasks.splice(source.index, 1)
        } else if (source.droppableId === "TaskCompletedDroppable") {
            add = completedTasks[source.index]
            completedTasks.splice(source.index, 1)
        }

        if (destination.droppableId === "TasksTodoDroppable") {
            todoTasks.splice(destination.index, 0, add)
        } else if (destination.droppableId === "TasksInProgressDroppable") {
            inProgressTasks.splice(destination.index, 0, add)
        } else if (destination.droppableId === "TaskCompletedDroppable") {
            completedTasks.splice(destination.index, 0, add)
        }

        setTodo(todoTasks);
        setInProgress(inProgressTasks);
        setCompleted(completedTasks);

        let newStatus: string = add.newStatus;
        if (destination.droppableId === "TasksTodoDroppable") {
            newStatus = "todo"
        } else if (destination.droppableId === "TasksInProgressDroppable") {
            newStatus = "inProgress"
        } else if (destination.droppableId === "TaskCompletedDroppable") {
            newStatus = "completed"
        }

        updateTask(add, newStatus);
    }

    async function updateTask(task: TaskModel, newStatus: string) {
        const sub = await getIdJwt();
        task.taskStatus = newStatus;
        console.log(task)
        await apiService.updateTask(sub, task);
    }


    return (
        <div className="Tasks">
            <div className="TasksHeader">
                <AddTask setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks}/>
                <div className="search-container">
                    <input onChange={(e) => searchTasks(e)} type="text" placeholder="Search tasks..." />
                    <button type="submit">Search</button>
                </div>

            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="TasksList">
                    <Droppable droppableId="TasksTodoDroppable">
                        {
                            (provided) => (
                                <div className="TasksDiv TasksTodo" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="TasksDivTitle">
                                        <h5>ToDo</h5>
                                    </div>

                                    <div className="TasksDisplayed TasksTodoDiv">
                                        {todo ?
                                            todo.map((t, index) => <Task index={index} key={t.taskId} task={t} />)
                                            : <></>}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )
                        }
                    </Droppable>

                    <Droppable droppableId="TasksInProgressDroppable">
                        {
                            (provided) => (
                                <div className="TasksDiv TasksInProgress" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="TasksDivTitle">
                                        <h5>In Progress</h5>
                                    </div>

                                    <div className="TasksDisplayed TaksInProgressDiv">
                                        {
                                            inProgress ?
                                                inProgress.map((t, index) => <Task index={index} key={t.taskId} task={t} />)
                                                : <></>}
                                        {provided.placeholder}
                                    </div>

                                </div>
                            )
                        }
                    </Droppable>

                    <Droppable droppableId="TaskCompletedDroppable">
                        {
                            (provided) => (
                                <div className="TasksDiv TasksCompleted" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="TasksDivTitle">
                                        <h5>Completed</h5>
                                    </div>

                                    <div className="TasksDisplayed TasksCompletedDiv">
                                        {completed ?
                                            completed.map((t, index) => <Task index={index} key={t.taskId} task={t} />)
                                            : <></>}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )
                        }

                    </Droppable>
                </div>
            </DragDropContext>
        </div >
    );
}

export default Tasks;
