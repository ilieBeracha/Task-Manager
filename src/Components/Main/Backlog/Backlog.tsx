import { useSelector } from "react-redux";
import { TaskModel } from "../../../model/TaskModel";
import "./Backlog.css";
import TasksBacklog from "./TasksBacklog/TasksBacklog";

function Backlog(): JSX.Element {
    const tasksSelector: TaskModel[] = useSelector((state: any) => state.tasks);
    const overlaySelector = useSelector((state: any) => state.overlay)

    return (
        <div className="Backlog">
            {overlaySelector?
                <div id="overlay"></div>
            :<></>}

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
