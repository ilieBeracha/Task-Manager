import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { getTasksRedux } from "../../app/TasksSlice";
import { apiService } from "../../Service/ApiService";
import { getIdJwt } from "../../Service/getIdJwt";
import Backlog from "./Backlog/Backlog";
import Dashboard from "./Dashboard/Dashboard";
import "./Main.css";
import Navbar from "./Navbar/Navbar";
import Tasks from "./Tasks/Tasks";

function Main(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    const dispatch = useDispatch();

    async function getTasksIfTasksSelectorIsEmpty() {
        const sub = await getIdJwt()
        let tasks = await apiService.getTasks(sub);
        tasks = await tasks.json();
        dispatch(getTasksRedux(tasks))
    }
    useEffect(() => {
        if (tasksSelector.length === 0) {
            getTasksIfTasksSelectorIsEmpty()
        }
    }, [tasksSelector]);


    return (
        <div className="Main">
			<Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/board" element={<Tasks />}></Route>
                <Route path="/backlog" element={<Backlog />}></Route>
                <Route path="/settings" element={'settings'}></Route>
            </Routes>
        </div>
    );
}

export default Main;
