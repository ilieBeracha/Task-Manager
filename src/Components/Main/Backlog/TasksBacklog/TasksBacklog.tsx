import { TaskModel } from "../../../../model/TaskModel";
import "./TasksBacklog.css";

function TasksBacklog({ task }: { task: TaskModel }): JSX.Element {
    return (
        <div className="TasksBacklog">
            <div className="TaskBacklogName">
                <span>{task.taskName}</span>
            </div>
            {task.taskStatus === "todo" ?

                <div className="TaskBacklogStatus TaskBacklogStatusTodo">
                    <span>{task.taskStatus}</span>
                </div>
                : task.taskStatus === "inProgress" ?
                    <div className="TaskBacklogStatus TaskBacklogStatusTodoInProgress">
                        <span>{task.taskStatus}</span>
                    </div>
                    : task.taskStatus === "completed" ?
                        <div className="TaskBacklogStatus TaskBacklogStatusTodoCompleted">
                            <span>{task.taskStatus}</span>
                        </div>
                        : <></>}
            {task.taskPriority === "High" ?
                <div className="TaskBacklogPriority TaskBacklogPriorityHigh">

                    <span>{task.taskPriority}</span>
                </div>
                : task.taskPriority === "Mid" ?
                    <div className="TaskBacklogPriority TaskBacklogPriorityMid">

                        <span>{task.taskPriority}</span>
                    </div>
                    : task.taskPriority === "Low" ?
                        <div className="TaskBacklogPriority TaskBacklogPriorityLow">

                            <span>{task.taskPriority}</span>
                        </div>
                        : <></>}
            <div className="TaskBacklogDate">
                <span>{task.taskDate}</span>
            </div>
        </div>
    );
}

export default TasksBacklog;
