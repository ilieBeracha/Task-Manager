import { TaskModel } from "../../../../model/TaskModel";
import "./TodayTask.css";

function TodayTask({ task }: { task: TaskModel }): JSX.Element {
    return (
        <div className="TodayTask">
            <div className="TodayTaskP">
                <p>{task.taskName}</p>
            </div>
            {task.taskPriority === 'High' ?

                <div className="TodayTaskP TaskBacklogPriorityHigh">

                    <p>{task.taskPriority}</p>
                </div>
                : task.taskPriority === "Mid" ?
                    <div className="TodayTaskP TaskBacklogPriorityMid">

                        <p>{task.taskPriority}</p>
                    </div>
                    : task.taskPriority === 'Low' ?
                        <div className="TodayTaskP TaskBacklogPriorityMid">

                            <p>{task.taskPriority}</p>
                        </div>
                        : <></>}
            {task.taskStatus === "todo" ?

                <div className="TodayTaskP TaskBacklogStatusTodo">

                    <span>{task.taskStatus}</span>
                </div>
                : <div className="TodayTaskP TaskBacklogStatusTodoInProgress">

                    <span>{task.taskStatus}</span>
                </div>}
        </div>
    );
}


// .TaskBacklogPriorityHigh{
//     color: red;
// }

// .TaskBacklogPriorityMid{
//     color: orange;
// }

// .TaskBacklogPriorityLow{
//     color: blue;
// }


export default TodayTask;
