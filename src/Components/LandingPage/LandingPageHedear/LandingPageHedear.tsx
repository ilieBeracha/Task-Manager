import "./LandingPageHedear.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useDispatch } from "react-redux";
import { ifUser } from "../../../app/usersSlice";
import PopUpLogin from "./PopUp/PopUpLogin";
import PopUpRegister from "./PopUpRegister/PopUpRegister";

function LandingPageHedear(): JSX.Element {
    // const dispatch = useDispatch();

    // onClick={()=> dispatch(ifUser(true))}
    return (
        <div className="LandingPageHedear">
			<div className="landingPageHeaderIcon">
                <TaskAltIcon fontSize="large"/>
            </div>
            <div className="LandingPageHedearLoginOrRegister">
                {/* <button>Login</button> */}
                <PopUpLogin />
                {/* <button id="loginButton">Join</button> */}
                <PopUpRegister />
            </div>
        </div>
    );
}

export default LandingPageHedear;
