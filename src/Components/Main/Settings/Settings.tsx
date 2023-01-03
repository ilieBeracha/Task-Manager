import { useSelector } from "react-redux";
import "./Settings.css";

function Settings(): JSX.Element {
    const overlaySelector = useSelector((state:any)=> state.overlay)
    return (
        <div className="Settings">
            {overlaySelector ?

                <div id="overlay"></div>
                : <></>}
                settings
        </div>
    );
}

export default Settings;
