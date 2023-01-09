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
import { useDispatch } from "react-redux";


function Dashboard(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    const [getName, setGetName] = useState();
    const [completedTasksAvg, setCompletedTasksAvg] = useState<number>();
    const [todayOrWeekTasksState, setTodayOrWeekTasksState] = useState<TaskModel[]>([]);
    const [labelGroup, setLabelGroup] = useState<{ [key: string]: number }>()
    const authSelector = useSelector((state: any) => state.auth)
    const overlaySelector = useSelector((state: any) => state.overlay);

    useEffect(() => {
        dashBoardFunctions.getNames(setGetName);
        dashBoardFunctions.getAvgOfTasksCompleted(tasksSelector, setCompletedTasksAvg);
        dashBoardFunctions.getTodayTasks(tasksSelector, setTodayOrWeekTasksState);
        dashBoardFunctions.getLabelsGroup(tasksSelector, setLabelGroup);
    }, [tasksSelector, authSelector]);

    return (
        <div className="Dashboard">
            {overlaySelector ?
                <div id="overlay"></div>
                : <></>}

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
                            <h5>Tasks (not completed): </h5>
                            <div className="byDayWeekDiv">
                                <a onClick={() => dashBoardFunctions.getTodayTasks(tasksSelector, setTodayOrWeekTasksState)}>Daily</a>
                                <a onClick={() => dashBoardFunctions.getWeekTasks(tasksSelector, setTodayOrWeekTasksState)}>Weekly</a>
                            </div>
                        </div>

                        <div className="DashboardTodayDivTasks">
                            {todayOrWeekTasksState.length !== 0 ?
                                todayOrWeekTasksState.map((task: TaskModel) => (
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
                    {labelGroup ?
                        Object.keys(labelGroup).map((label: string) => (
                            <LabelGroup key={label} label={label} counter={labelGroup[label]} />
                        )) : <div>No labels found</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
