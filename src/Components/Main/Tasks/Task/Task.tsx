import { TaskModel } from "../../../../model/TaskModel";
import { apiService } from "../../../../Service/ApiService";
import CloseIcon from '@mui/icons-material/Close';
import "./Task.css";
import { getIdJwt } from "../../../../Service/getIdJwt";
import { Draggable } from "react-beautiful-dnd";
import EditTaskPopUp from "./editTaskPopup/editTaskPopup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ifUser } from "../../../../app/usersSlice";
import { useSelector } from "react-redux";
import DallE from "./DallE/DallE";

function Task({ task = {} as TaskModel, index, setRefreshTasks, refreshTasks }: { task: TaskModel, index: number, setRefreshTasks: any, refreshTasks: any }): JSX.Element {
    const [remainingDays, setRemainingDays] = useState<number>(0);
    const [visibleImg, setVisibleImg] = useState<boolean>(false);
    const imagesSelector = useSelector((state: any) => state.showOrHideImages)

    useEffect(() => {
        daysRemaining()
    }, [])

    async function deleteTask() {
        apiService.deleteTask(task.id)
        setRefreshTasks(!refreshTasks)
    }

    async function daysRemaining() {
        let today = new Date();
        let taskDate = new Date(task.taskDate);
        let remainingMilliseconds = taskDate.getTime() - today.getTime();
        let remainingDays = Math.floor(remainingMilliseconds / 86400000) + 1;
        setRemainingDays(remainingDays);
    }

    function showImage() {
        setVisibleImg(!visibleImg)
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
                        <div className="addImageDiv">
                            <DallE task={task} refreshTasks={refreshTasks} setRefreshTasks={setRefreshTasks}/>
                        </div>
                        <div className="TaskName">
                            <h5>{task.taskName}</h5>
                        </div>
                        {
                            task.label === "Work" ?
                                <div className="TaskLabel TaskLabelWork">
                                    <span>{task.label}</span>
                                </div>
                                : task.label === "Personal" ?
                                    <div className="TaskLabel TaskLabelPersonal">
                                        <span>{task.label}</span>
                                    </div>
                                    :
                                    task.label === "Home" ?
                                        <div className="TaskLabel TaskLabelHome">
                                            <span>{task.label}</span>
                                        </div>
                                        :
                                        task.label === "School" ?
                                            <div className="TaskLabel TaskLabelSchool">
                                                <span>{task.label}</span>
                                            </div>
                                            :
                                            task.label === "Financial" ?
                                                <div className="TaskLabel TaskLabelFinancial">
                                                    <span>{task.label}</span>
                                                </div>
                                                :
                                                task.label === "Health" ?
                                                    <div className="TaskLabel TaskLabelHealth">
                                                        <span>{task.label}</span>
                                                    </div>
                                                    :
                                                    task.label === "Leisure" ?
                                                        <div className="TaskLabel TaskLabelLeisure">
                                                            <span>{task.label}</span>
                                                        </div>
                                                        :
                                                        <div className="TaskLabel">
                                                            <span>{task.label}</span>
                                                        </div>
                        }

                        <div onClick={showImage} className="TaskImage">
                            {/* {visibleImg!==false?

                                <img src={task.imageUrl} alt="" />
                            :<></>} */}
                            {
                                task.imageUrl && imagesSelector?
                                <img src={task.imageUrl} alt="" />

                            :<></>}
                        </div>
                        <div className="TaskContent">
                            <span>{task.taskContent}</span>
                        </div>
                        <div className="TaskDate">
                            <span>{task.taskDate}</span> <br />
                            {remainingDays > 0 ?

                                <span id="remainingDaySpanOver0">{remainingDays} days left</span>
                                :
                                <span id="remainingDaySpanUnder0">{remainingDays} days behind</span>
                            }
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
