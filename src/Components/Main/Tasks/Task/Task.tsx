import { TaskModel } from "../../../../model/TaskModel";
import { apiService } from "../../../../Service/ApiService";
import CloseIcon from '@mui/icons-material/Close';
import "./Task.css";
import { getIdJwt } from "../../../../Service/getIdJwt";
import { Draggable } from "react-beautiful-dnd";
import EditTaskPopUp from "./editTaskPopup/editTaskPopup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ifUser } from "../../../../app/usersSlice";

function Task({ task = {} as TaskModel, index, setRefreshTasks, refreshTasks }: { task: TaskModel, index: number, setRefreshTasks: any, refreshTasks: any }): JSX.Element {
    const dispatch = useDispatch();

    async function deleteTask() {
        const userId = await getIdJwt();
        apiService.deleteTask(task.id).then((res) => {
            if (res.status===401) {
                window.localStorage.removeItem('token');
                dispatch(ifUser(false))
            }
        });
        setRefreshTasks(!refreshTasks)
    }

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {
                (provided) => (
                    <div className="Task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div onClick={() => deleteTask()} className='eraseTaskDiv'>
                            <CloseIcon fontSize="small" />
                        </div>
                        <div className='editTaskDiv'>
                            <EditTaskPopUp refreshTasks={refreshTasks} setRefreshTasks={setRefreshTasks} id={task.id} task={task} />
                        </div>
                        <div className="TaskName">
                            <h5>{task.taskName}</h5>
                        </div>
                        <div className="TaskContent">
                            <span>{task.taskContent}</span>
                        </div>
                        {
                            task.label === "Work" ?
                                <div className="TaskLabel TaskLabelWork">
                                    <span>W</span>
                                </div>
                                : task.label === "Personal" ?
                                    <div className="TaskLabel TaskLabelPersonal">
                                        <span>P</span>
                                    </div>
                                    :
                                    task.label === "Home" ?
                                        <div className="TaskLabel TaskLabelHome">
                                            <span>H</span>
                                        </div>
                                        :
                                        task.label === "School" ?
                                            <div className="TaskLabel TaskLabelSchool">
                                                <span>S</span>
                                            </div>
                                            :
                                            task.label === "Financial" ?
                                                <div className="TaskLabel TaskLabelFinancial">
                                                    <span>F</span>
                                                </div>
                                                :
                                                task.label === "Health" ?
                                                    <div className="TaskLabel TaskLabelHealth">
                                                        <span>H</span>
                                                    </div>
                                                    :
                                                    task.label === "Leisure" ?
                                                        <div className="TaskLabel TaskLabelLeisure">
                                                            <span>L</span>
                                                        </div>
                                                        :
                                                        <div className="TaskLabel">
                                                            <span>{task.label}</span>
                                                        </div>
                        }
                        <div className="TaskDate">
                            <span>{task.taskDate}</span> <br />
                        </div>
                        {task.taskPriority === "High" ?
                            <div className="TaskPriorityDiv TaskBacklogPriority TaskBacklogPriorityHigh">

                                <span>{task.taskPriority}</span>
                            </div>
                            : task.taskPriority === "Mid" ?
                                <div className="TaskPriorityDiv TaskBacklogPriority TaskBacklogPriorityMid">

                                    <span>{task.taskPriority}</span>
                                </div>
                                : task.taskPriority === "Low" ?
                                    <div className="TaskPriorityDiv TaskBacklogPriority TaskBacklogPriorityLow">

                                        <span>{task.taskPriority}</span>
                                    </div>
                                    : <></>}

                    </div>
                )
            }
        </Draggable>
    );
}

export default Task;
