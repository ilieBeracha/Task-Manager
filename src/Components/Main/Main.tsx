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
import NavbarSmallScreen from "../NavbarSmallScreen/NavbarSmallScreen";
import Settings from "./Settings/Settings";
import Collab from "./Collab/Collab";

function Main(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    // const namesSelector = useSelector((state: any) => state.name);
    // dispatch(addName('ilie'))
    // console.log(namesSelector);
    const dispatch = useDispatch();
    const smallScreen = window.matchMedia("(max-width: 1200px)").matches;

  
    

    async function getTasksIfTasksSelectorIsEmpty() {
        const sub = await getIdJwt();
        console.log(sub)
        let res = await apiService.getTasks(sub);
        console.log(res)
        dispatch(getTasksRedux(res))
    }

    useEffect(() => {
        getTasksIfTasksSelectorIsEmpty()
        // console.log(namesSelector);
        
    }, []);


    return (
        <div className="Main">
            {!smallScreen ?
                <Navbar />
                : <NavbarSmallScreen />}
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/board" element={<Tasks />}></Route>
                <Route path="/backlog" element={<Backlog />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/collab" element={<Collab />}></Route>
            </Routes>
        </div>
    );
}

export default Main;
