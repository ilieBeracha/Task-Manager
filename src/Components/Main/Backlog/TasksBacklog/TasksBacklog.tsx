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
            <div className="TaskBacklogPriority">
                <span>{task.taskPriority}</span>
            </div>
            <div className="TaskBacklogDate">
                <span>{task.taskDate}</span>
            </div>
        </div>
    );
}

export default TasksBacklog;
