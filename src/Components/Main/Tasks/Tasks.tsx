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
import { showOrHide } from "../../../app/HideImagesSlice";

function Tasks(): JSX.Element {
    const [todo, setTodo] = useState<TaskModel[]>([])
    const [inProgress, setInProgress] = useState<TaskModel[]>([])
    const [completed, setCompleted] = useState<TaskModel[]>([]);
    const tasksSelector = useSelector((state: any) => state.tasks);
    const dispatch = useDispatch();
    const [refreshTasks, setRefreshTasks] = useState<boolean>(false);
    const overlaySelector = useSelector((state: any) => state.overlay)
    const imagesSelector = useSelector((state: any) => state.showOrHideImages)

    useEffect(() => {
        tasksFunctions.getTasks(dispatch, getTasksRedux, setTodo, setInProgress, setCompleted);
        console.log(imagesSelector);

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
            add = todoTasks[source.index];
            todoTasks.splice(source.index, 1);
        } else if (source.droppableId === "TasksInProgressDroppable") {
            add = inProgressTasks[source.index];
            inProgressTasks.splice(source.index, 1);
        } else if (source.droppableId === "TaskCompletedDroppable") {
            add = completedTasks[source.index];
            completedTasks.splice(source.index, 1);
        }
        let newStatus: string = add.newStatus;

        if (destination.droppableId === "TasksTodoDroppable") {
            const timeStamp = new Date().getTime();
            newStatus = "todo"
            todoTasks.splice(destination.index, 0, add)
            updateTaskIndex(add, destination.index, timeStamp, newStatus)
        } else if (destination.droppableId === "TasksInProgressDroppable") {
            const timeStamp = new Date().getTime();
            newStatus = "inProgress"
            inProgressTasks.splice(destination.index, 0, add);
            updateTaskIndex(add, destination.index, timeStamp, newStatus)
        } else if (destination.droppableId === "TaskCompletedDroppable") {
            const timeStamp = new Date().getTime();
            newStatus = "completed"
            completedTasks.splice(destination.index, 0, add);
            updateTaskIndex(add, destination.index, timeStamp, newStatus)
        }

        setTodo(todoTasks);
        setInProgress(inProgressTasks);
    }

    async function updateTaskIndex(task: TaskModel, index: number, timeStamp: number, newStatus: string) {
        const updatedTask = { ...task };
        updatedTask.indexPriority = index;
        updatedTask.indexPriorityTimeStamp = timeStamp;
        const newTasks = await tasksSelector.filter((t: TaskModel) => {
            return t.id !== updatedTask.id
        })
        updatedTask.taskStatus = newStatus;
        newTasks.push(updatedTask);
        dispatch(getTasksRedux(newTasks))
        await apiService.updateTask(updatedTask);
    }

    function showOrHideImages() {
        dispatch(showOrHide())
    }

    return (
        <div className="Tasks" >
            {overlaySelector ?

                <div id="overlay"></div>
                : <></>}
            < div className="TasksHeader" >
                <div className="ShowOrHideImagesDiv">
                    {imagesSelector ?

                        <button onClick={showOrHideImages}>Hide Images</button>
                        : <button onClick={showOrHideImages}>Show Images</button>
                    }
                </div>
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
                                        {
                                            todo.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)
                                        }
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
                                            inProgress.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)
                                        }
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
                                        {
                                            completed.map((t, index) => <Task setRefreshTasks={setRefreshTasks} refreshTasks={refreshTasks} index={index} key={t.id} task={t} />)
                                        }
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
