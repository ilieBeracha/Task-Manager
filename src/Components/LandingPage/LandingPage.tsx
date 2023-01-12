import "./LandingPage.css";
import LandingPageHedear from "./LandingPageHedear/LandingPageHedear";
import taskImage from "../../images/tasks.png"
// import taskManager from "../../images/taskManager-landingPage.png"
import { useState } from "react";

function LandingPage(): JSX.Element {
    const [titleDisplayed, setTitleDisplayed] = useState<[]>([])
    let title: any = ['G', 'e', 't', ' ', 'o', 'r', 'g', 'a', 'n', 'i', 'z', 'e', 'd', ', ', 'g', 'e', 't', ' ', 't', 'h', 'i', 'n', 'g', 's', ' ', 'd', 'o', 'n', 'e', '.',];


    return (
        <div className="LandingPage">
            <LandingPageHedear />
            <div className="LandingPageAll">

                <div className="LandingPageContent">
                    <div className="LandingPageContentHeader">

                        <h1>{title}</h1>
                    </div>
                    <h2>Your personal <span id="TaskManagerTitle">Task-Manager</span> </h2>
                    <span>Our intuitive interface allows you to create, edit, and delete tasks with ease, making it simple to manage your tasks and get things done.</span>
                </div>
                <div className="LandingPageContentImage">

                    <img src={taskImage} alt="" />
                </div>
            </div>

{/* 
            <div className="">
                <img src={taskManager} alt="" />
            </div> */}
        </div>
    );
}

export default LandingPage;
