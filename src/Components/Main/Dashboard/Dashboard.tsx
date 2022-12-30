import "./Dashboard.css";
import DashboardImg from '../../../images/dashboardImg9.png'
import { useEffect, useState } from "react";
import { getFirstAndLastNameJwt } from "../../../Service/getIdJwt";
import { useSelector } from "react-redux";
import { TaskModel } from "../../../model/TaskModel";
import TodayTask from "./TodayTask/TodayTask";
import { dashBoardFunctions } from "../../../functions/dashboardFunctions";
import PieChart from "../../PieChart/PieChart";
import LabelGroup from "./LabelGroup/LabelGroup";


function Dashboard(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    const [getName, setGetName] = useState();
    const [completedTasksAvg, setCompletedTasksAvg] = useState<number>();
    const [todayTasksState, setTodayTasksState] = useState<TaskModel[]>([]);
    const [labelGroup, setLabelGroup] = useState<[]>([])

    let [todo, setTodo] = useState<number>(0)
    let [inProgress, setInProgress] = useState<number>(0)
    let [completed, setCompleted] = useState<number>(0)

    useEffect(() => {
        dashBoardFunctions.getNames(setGetName);
        dashBoardFunctions.getAvgOfTasksCompleted(tasksSelector, setCompletedTasksAvg);
        dashBoardFunctions.filterTasksByStatus(tasksSelector, setTodo, setInProgress, setCompleted);
        dashBoardFunctions.getTodayTasks(tasksSelector, setTodayTasksState, todayTasksState);
        console.log(labelGroup);
        getLabelsGroup()
    }, [tasksSelector]);

    function getLabelsGroup() {
        let arr: any = [];
        let obj: any = {}
        tasksSelector.map((t: TaskModel) => {
            let label: any = t.label
            if (obj[label]) {
                obj[label]++
            } else {
                obj[label] = 1
            }
        });
        arr.push(obj);
        setLabelGroup(arr)
    }



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
                                <p>Keep it up!</p>
                            </div>
                            :
                            <p>You have Completed <span className="DashboardStateColor">0%</span>of your tasks!</p>


                        }
                    </div>
                </div>

                <div className="DashboardGraphsDiv">

                    <div className="DashboardGraphDiv">
                        <PieChart />
                    </div>

                    <div className="DashboardTodayDiv">
                        <div className="DashboardTodayDivHeader">
                            <h5>Today Tasks (not completed): </h5>
                        </div>

                        <div className="DashboardTodayDivTasks">
                            {todayTasksState.length !== 0 ?
                                todayTasksState.map((task: TaskModel) => (
                                    <TodayTask key={task.id} task={task} />
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

                <div className="DashboardSecondaryDivByLabels">

                </div>
            </div>
        </div>
    );
}

export default Dashboard;
