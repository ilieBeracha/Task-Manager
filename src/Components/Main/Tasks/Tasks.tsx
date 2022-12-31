import { useEffect, useState } from "react";
import { TaskModel } from "../../../model/TaskModel";
import { apiService } from "../../../Service/ApiService";
import "./Tasks.css";
import Task from "./Task/Task";
import AddTask from "./AddTask/AddTask";
import { getIdJwt } from "../../../Service/getIdJwt";
import { Droppable, DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTasksRedux } from "../../../app/TasksSlice";
import { tasksFunctions } from "../../../functions/tasksFunctions";

function Tasks(): JSX.Element {
    const [todo, setTodo] = useState<TaskModel[]>([])
    const [inProgress, setInProgress] = useState<TaskModel[]>([])
    const [completed, setCompleted] = useState<TaskModel[]>([]);
    const tasksSelector = useSelector((state: any) => state.tasks);
    const dispatch = useDispatch();
    const [refreshTasks, setRefreshTasks] = useState<boolean>(false);


    useEffect(() => {
        tasksFunctions.getTasks(dispatch, getTasksRedux, setTodo, setInProgress, setCompleted);
    }, [refreshTasks]);

    async function searchTasks(event: any) {
        event.preventDefault();
        if (event.target.value === '') {
            await tasksFunctions.getTasks(dispatch, getTasksRedux, setTodo, setInProgress, setCompleted);
            ;
        } else {
            const searchResults = tasksSelector.filter((t: any) => (t.taskName).toLocaleLowerCase().includes((event.target.value).toLocaleLowerCase()) || (t.taskContent).toLocaleLowerCase().includes((event.target.value).toLocaleLowerCase()));
            dispatch(getTasksRedux(searchResults));
            setTodo(searchResults.filter((res: any) => res.taskStatus === "todo"));
            setInProgress(searchResults.filter((res: any) => res.taskStatus === "inProgress"));
            setCompleted(searchResults.filter((res: any) => res.taskStatus === "completed"));
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
        const updatedTask = { ...task };
        // console.log(updatedTask)
        const newTasks = tasksSelector.filter((t: TaskModel) => {
            return t.id !== updatedTask.id
        })
        newTasks.push(updatedTask);
        updatedTask.taskStatus = newStatus;
        dispatch(getTasksRedux(newTasks))
        await apiService.updateTask(updatedTask);
    }


    return (
        <div className="Tasks" >
            < div className="TasksHeader" >
                <AddTask setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} />
                <div className="search-container">
                    <input onChange={(e) => searchTasks(e)} type="text" placeholder="Search tasks..." />
                    <button type="submit">Search</button>
                </div>
            </div >
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="TasksList">
                    <Droppable droppableId="TasksTodoDroppable">
                        {
                            (provided) => (
                                <div className="TasksDiv TasksTodo" ref={provided.innerRef} {...provided.droppableProps}>
                                    <div className="TasksDivTitle">
                                        <span className="dot dotTodo"></span>
                                        <h5>To Do</h5>
                                    </div>
                                    <div className="TasksDisplayed TasksTodoDiv">
                                        {todo.length < 5 ?
                                            todo.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)
                                            : <div className="TasksDisplayed TasksDisplayedOver3">
                                                {todo.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)}

                                            </div>}
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
                                        <span className="dot dotInProgress"></span>
                                        <h5>In Progress</h5>
                                    </div>

                                    <div className="TasksDisplayed TaksInProgressDiv">
                                        {
                                            inProgress.length < 5 ?
                                                inProgress.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)
                                                : <div className="TasksDisplayed TasksDisplayedOver3">
                                                    {inProgress.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)}
                                                </div>}
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
                                        <span className="dot dotCompleted"></span>
                                        <h5>Completed</h5>
                                    </div>

                                    <div className="TasksDisplayed TasksCompletedDiv">
                                        {completed.length < 5 ?
                                            completed.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)
                                            : <div className="TasksDisplayed TasksDisplayedOver3">
                                                {completed.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)}
                                            </div>}
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
