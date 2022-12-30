import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasksRedux } from "../../../app/TasksSlice";
import { TaskModel } from "../../../model/TaskModel";
import { apiService } from "../../../Service/ApiService";
import { getIdJwt } from "../../../Service/getIdJwt";
import "./Backlog.css";
import TasksBacklog from "./TasksBacklog/TasksBacklog";

function Backlog(): JSX.Element {
    const tasksSelector:TaskModel[] = useSelector((state: any) => state.tasks);
    // const dispatch = useDispatch();

    return (
        <div className="Backlog">
            <div className="BacklogTasksHeader">
                <h5>All Tasks</h5>
            </div>
            <div className="BacklogTasksDiv">
                <div className="BacklogTasksDivTitles">
                    <div className="BacklogTasksDivTitlesName">
                        <h6>Task Name</h6>
                    </div>
                    <div className="BacklogTasksDivTitlesStatus">
                        <h6>Status</h6>
                    </div>
                    <div className="BacklogTasksDivTitlesPriority">
                        <h6>Priority</h6>
                    </div>
                    <div className="BacklogTasksDivTitlesDate">
                        <h6>Date</h6>
                    </div>
                </div>
                {
                    tasksSelector.map((task: TaskModel) =>
                        <TasksBacklog key={task.id} task={task} />
                    )
                }
            </div>
        </div>
    );
}

export default Backlog;
