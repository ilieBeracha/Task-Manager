import { Route, Routes } from "react-router-dom";
import "./Main.css";
import Navbar from "./Navbar/Navbar";
import Tasks from "./Tasks/Tasks";

function Main(): JSX.Element {
    return (
        <div className="Main">
			<Navbar />
            <Routes>
                <Route path="/" element={<Tasks />}></Route>
                <Route path="/analytics" element={'analytics'}></Route>
                <Route path="/profile" element={'profile'}></Route>
                <Route path="/settings" element={'settings'}></Route>
            </Routes>
        </div>
    );
}

export default Main;
