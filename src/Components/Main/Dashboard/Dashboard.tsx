import "./Dashboard.css";
import DashboardImg from '../../../images/dashboardImg6.png'
import { useEffect, useState } from "react";
import { getFirstAndLastNameJwt } from "../../../Service/getIdJwt";
import { useSelector } from "react-redux";
import { TaskModel } from "../../../model/TaskModel";
import TodayTask from "./TodayTask/TodayTask";
import { useDispatch } from "react-redux";
import { dashBoardFunctions } from "../../../functions/dashboardFunctions";


function Dashboard(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    const [getName, setGetName] = useState();
    const [completedTasksAvg, setCompletedTasksAvg] = useState<number>();
    const [todayTasksState, setTodayTasksState] = useState<TaskModel[]>([]);

    let [todo, setTodo] = useState<number>(0)
    let [inProgress, setInProgress] = useState<number>(0)
    let [completed, setCompleted] = useState<number>(0)

    useEffect(() => {
        dashBoardFunctions.getNames(setGetName);
        dashBoardFunctions.getAvgOfTasksCompleted(tasksSelector,setCompletedTasksAvg);
        dashBoardFunctions.filterTasksByStatus(tasksSelector, setTodo, setInProgress, setCompleted);
        dashBoardFunctions.getTodayTasks(tasksSelector, setTodayTasksState, todayTasksState);
    }, [tasksSelector])


    return (
        <div className="Dashboard">
            <div className="DashboardMainDiv">
                <div className="DashboardWelcomeBack">
                    <div className="DashboardWelcomeBackImage">
                        <img src={DashboardImg} alt="" />
                    </div>

                    <div className="DashboardWelcomeBackMessage">
                        <h2>Welcome back <span className="DashboardStateColor">{getName}</span></h2>
                        {completedTasksAvg ?
                            <div>
                                <p>You have Completed <span className="DashboardStateColor">{completedTasksAvg.toFixed(0)}% </span>of your tasks!</p>
                                <p><span> {todo}</span> To Do,<span> {inProgress}</span> In Progress,<span> {completed}</span> Completed</p>
                                <p>Keep it up!</p>
                            </div>
                            :
                            <p>You have Completed <span className="DashboardStateColor">%</span>of your tasks!</p>


                        }
                    </div>
                </div>

                <div className="DashboardGraphsDiv">

                    <div className="DashboardGraphDiv">

                    </div>

                    <div className="DashboardTodayDiv">
                        <div className="DashboardTodayDivHeader">
                            <h5>Today Tasks (not completed): </h5>
                        </div>

                        <div className="DashboardTodayDivTasks">
                            {todayTasksState.length !== 0 ?
                                todayTasksState.map((task: TaskModel) => (
                                    <TodayTask key={task.taskId} task={task} />
                                )) : <div className="DashboardTodayNoTasks">No tasks for today!</div>}
                        </div>
                    </div>

                </div>

                <div className="DashboardFooter">

                </div>
            </div>

            <div className="DashboardSecondaryDiv">
                <div className="DashboardSecondaryDivHeader">
                    <h5>Tasks by Labels: </h5>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
