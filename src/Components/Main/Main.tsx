import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { getTasksRedux } from "../../app/TasksSlice";
import { ifUser } from "../../app/usersSlice";
import { apiService } from "../../Service/ApiService";
import { getIdJwt } from "../../Service/getIdJwt";
import Backlog from "./Backlog/Backlog";
import Dashboard from "./Dashboard/Dashboard";
import "./Main.css";
import Navbar from "./Navbar/Navbar";
import Tasks from "./Tasks/Tasks";
import 'react-toastify/dist/ReactToastify.css';

function Main(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    const dispatch = useDispatch();


    async function getTasksIfTasksSelectorIsEmpty() {
        const sub = await getIdJwt()
        let res= await apiService.getTasks(sub);
        console.log(res)
        dispatch(getTasksRedux(res))
    }
    
    useEffect(() => {
        getTasksIfTasksSelectorIsEmpty()
    }, []);


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
