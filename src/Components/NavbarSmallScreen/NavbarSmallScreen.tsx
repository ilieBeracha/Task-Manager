import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavbarSmallScreen.css";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DnsIcon from '@mui/icons-material/Dns';
import { useDispatch } from "react-redux";
import { logout } from "../../app/authSlice (1)";
import MenuIcon from '@mui/icons-material/Menu';
import { setOverlay } from "../../app/overlaySlice";
function NavbarSmallScreen(): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [hideOpenButton, setHideOpenButton] = useState<boolean>(isOpen);
    const dispatch = useDispatch();

    function signOut(){
        dispatch(logout())
    }

    function openNavbarAndOpenOverlay(){
        setIsOpen(true);
        dispatch(setOverlay(true))
    }
    function closeNavbarAndOpenOverlay(){
        setIsOpen(false);
        dispatch(setOverlay(false))
    }

    return (
        <div className="NavbarSmallScreen">
            {!hideOpenButton?
                <button id="openNavbarSmallScreen" onClick={() =>openNavbarAndOpenOverlay() }> <MenuIcon /> </button>
            :<></>}
            <div
                className={`NavbarSmallerScreenContent ${isOpen ? "open" : "closed"}`}
                onClick={() => closeNavbarAndOpenOverlay()}
            >
                <div className="NavbarLogo">
                    <TaskAltIcon fontSize="large" />
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
                <div className="NavbarSmallScreenLogOut NavbarLogoutDiv">
                    <button onClick={()=> signOut()}>Log Out</button>
                </div>
            </div>
        </div>
    );


}

// <!-- The overlay -->
// <div id="myNav" class="overlay">

//   <!-- Button to close the overlay navigation -->
//   <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

//   <!-- Overlay content -->
//   <div class="overlay-content">
//     <a href="#">About</a>
//     <a href="#">Services</a>
//     <a href="#">Clients</a>
//     <a href="#">Contact</a>
//   </div>

// </div>

// <!-- Use any element to open/show the overlay navigation menu -->
// <span onclick="openNav()">open</span>

export default NavbarSmallScreen;
