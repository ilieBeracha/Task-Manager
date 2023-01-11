import "./Navbar.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { NavLink } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch } from "react-redux";
import { ifUser } from "../../../app/usersSlice";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DnsIcon from '@mui/icons-material/Dns';
import { logout } from "../../../app/authSlice (1)";
import WorkspacesIcon from '@mui/icons-material/Workspaces';
function Navbar(): JSX.Element {
    const smallScreen = window.matchMedia("(max-width: 1200px)").matches;
    const dispatch = useDispatch();


    function signOut(){
        dispatch(logout())
    }

    return (
        <div className="Navbar">
			<div className="NavbarLogo">
                <TaskAltIcon fontSize="large"/>
            </div>
            <div className="NavbarLinks">
                <NavLink to={'/'}>
                    <DashboardIcon />
                </NavLink>
                <NavLink to={'/board'}>
                    <DnsIcon />
                </NavLink>
                <NavLink to={'/backlog'}>
                    <ListAltIcon />
                </NavLink>
                <NavLink to={'/collab'}>
                    <WorkspacesIcon />
                </NavLink>
                <NavLink to={'/settings'}>
                    <SettingsIcon />
                </NavLink>
            </div>
            <div className="NavbarLogoutDiv">
                <button onClick={()=> signOut()}>Log Out</button>
            </div>
        </div>
    );
}

export default Navbar;
