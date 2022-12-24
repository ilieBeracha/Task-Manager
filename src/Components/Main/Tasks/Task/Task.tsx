import { useEffect } from "react";
import { TaskModel } from "../../../../model/TaskModel";
import { apiService } from "../../../../Service/ApiService";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import "./Task.css";
import { getIdJwt } from "../../../../Service/getIdJwt";
import { Draggable, Droppable } from "react-beautiful-dnd";

function Task({ task = {} as TaskModel, index }: { task: TaskModel, index: number }): JSX.Element {
    // rest of the code
  
    async function deleteTask() {
        const userId = await getIdJwt();
        apiService.deleteTask(task.taskId, userId)
    }

    async function editTask() {
        console.log(1);
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
                        <div className="TaskDate">
                            <span>{task.taskDate}</span> <br />
                            <span>{task.taskHour}</span>
                        </div>

                    </div>
                )
            }
        </Draggable>
    );
}

export default Task;
