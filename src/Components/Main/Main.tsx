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

    function toastMessSignInAgain() {
        toast.error('Please sign in again', {
            position: toast.POSITION.TOP_CENTER,
            className: 'SignInAgainToast',
            theme: "colored",
            closeOnClick: true,
            draggable: true,
            pauseOnHover: false,
        })
    }

    async function getTasksIfTasksSelectorIsEmpty() {
        const sub = await getIdJwt()
        await apiService.getTasks(sub).then(async (res) => {
            if (res.ok) {
                let results = await res.json()
                console.log(results);
                dispatch(getTasksRedux(results));
            } else if(res.status===401){
                window.localStorage.removeItem('token');
                dispatch(ifUser(false))
                toastMessSignInAgain()
            }
        });
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
