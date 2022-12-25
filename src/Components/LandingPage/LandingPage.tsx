import "./LandingPage.css";
import LandingPageHedear from "./LandingPageHedear/LandingPageHedear";
import taskImage from "../../images/tasks.png"

function LandingPage(): JSX.Element {
    return (
        <div className="LandingPage">
            {/* <div className="LandingPageHeaderDiv"> */}
            <LandingPageHedear />
            {/* </div> */}
            <div className="LandingPageAll">

                <div className="LandingPageContent">
                    <h1>Get organized, get things done.</h1>
                    <h2>Your personal <span id="TaskManagerTitle">Task-Manager</span> </h2>
                    <span>Our intuitive interface allows you to create, edit, and delete tasks with ease, making it simple to manage your tasks and get things done.</span>
                </div>
                <div className="LandingPageContentImage">

                    <img src={taskImage} alt="" />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
