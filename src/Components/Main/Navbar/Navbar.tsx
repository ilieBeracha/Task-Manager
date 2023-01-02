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
function Navbar(): JSX.Element {
    const dispatch = useDispatch()

    function signOut(){
        // window.localStorage.removeItem('token');
        // dispatch(ifUser(false))
        
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
