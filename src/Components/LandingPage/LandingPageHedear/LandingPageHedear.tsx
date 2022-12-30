import "./LandingPageHedear.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useDispatch } from "react-redux";
import { ifUser } from "../../../app/usersSlice";
import PopUpLogin from "./PopUp/PopUpLogin";
import PopUpRegister from "./PopUpRegister/PopUpRegister";

function LandingPageHedear(): JSX.Element {
    return (
        <div className="LandingPageHedear">
			<div className="landingPageHeaderIcon">
                <TaskAltIcon fontSize="large"/>
            </div>
            <div className="LandingPageHedearLoginOrRegister">
                <PopUpLogin />
                <PopUpRegister />
            </div>
        </div>
    );
}

export default LandingPageHedear;
