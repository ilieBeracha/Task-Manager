import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { darkLightModeReducer } from "../../../app/darkLightModeSlice";
import "./Settings.css";

function Settings(): JSX.Element {
    const overlaySelector = useSelector((state:any)=> state.overlay)
    const mode = useSelector((state:any)=> state.mode)
    const dispatch = useDispatch();

    function darkLightMode(){
        dispatch(darkLightModeReducer())
    }
    return (
        <div className="Settings">
            {overlaySelector ?

                <div id="overlay"></div>
                : <></>}
                <button onClick={()=> darkLightMode()}>Mode</button>
        </div>
    );
}

export default Settings;
