import { TaskModel } from "../../../../model/TaskModel";
import { apiService } from "../../../../Service/ApiService";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import "./Task.css";
import { getIdJwt } from "../../../../Service/getIdJwt";
import { Draggable } from "react-beautiful-dnd";

function Task({ task = {} as TaskModel, index, setRefreshTasks, refreshTasks }: { task: TaskModel, index: number, setRefreshTasks: any, refreshTasks: any }): JSX.Element {

    async function deleteTask() {
        console.log(refreshTasks)
        const userId = await getIdJwt();
        apiService.deleteTask(task.taskId, userId);
        setRefreshTasks(!refreshTasks)
    }

    async function editTask() {
        console.log(index)
    }

    return (
        <Draggable draggableId={task.taskId.toString()} index={index}>
            {
                (provided) => (
                    <div className="Task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <div onClick={() => deleteTask()} className='eraseTaskDiv'>
                            <CloseIcon fontSize="small" />
                        </div>
                        <div onClick={() => editTask()} className='editTaskDiv'>
                            <EditIcon fontSize="small" />
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
