import "./Dashboard.css";
import DashboardImg from '../../../images/dashboardImg2.png'
import { useEffect, useState } from "react";
import { getFirstAndLastNameJwt } from "../../../Service/getIdJwt";
import { useSelector } from "react-redux";
import { TaskModel } from "../../../model/TaskModel";
import TodayTask from "./TodayTask/TodayTask";
import { useDispatch } from "react-redux";


function Dashboard(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    const [getName, setGetName] = useState();
    const [completedTasksAvg, setCompletedTasksAvg] = useState<number>();
    const [todayTasksState, setTodayTasksState] = useState<TaskModel[]>([])

    async function getNames() {
        let firstName = await getFirstAndLastNameJwt();
        setGetName(firstName.toLocaleUpperCase())
    }
    async function getAvgOfTasksCompleted() {
        if (!tasksSelector) return;
        let counterOfTasks = tasksSelector.length;
        let counterOfCompletedTasks = 0;
        tasksSelector.map((task: TaskModel) => {
            if (task.taskStatus === "completed") {
                counterOfCompletedTasks++;
            }
        });
        let percentageCompleted = ((counterOfCompletedTasks / counterOfTasks) * 100);
        setCompletedTasksAvg(percentageCompleted);
    }

    async function getTodayTasks() {
        let date = new Date().getDate()
        let mon = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        const todayDate = `${year}-${mon}-${date}`

        let todayTasks = tasksSelector.filter((task: TaskModel) => {
            return task.taskDate === todayDate && task.taskStatus !== 'completed'
        });

        setTodayTasksState([...todayTasks]);
        console.log(todayTasksState)
    }

    useEffect(() => {
        
        getNames();
        getAvgOfTasksCompleted();
        getTodayTasks();
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

                            <p>You have Completed <span className="DashboardStateColor">{completedTasksAvg.toFixed(0)}% </span>of your tasks!</p>
                            : <p>You have Completed <span className="DashboardStateColor">%</span>of your tasks!</p>
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
                            {todayTasksState.length!==0?
                            todayTasksState.map((task:TaskModel)=>(
                                <TodayTask key={task.taskId} task={task}/>
                            )):<div className="DashboardTodayNoTasks">No tasks for today!</div>}
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
