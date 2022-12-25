import "./LandingPage.css";
import LandingPageHedear from "./LandingPageHedear/LandingPageHedear";
import taskImage from "../../images/tasks.png"
import { useEffect, useState } from "react";

function LandingPage(): JSX.Element {
    const [titleDisplayed, setTitleDisplayed] = useState<[]>([])
    let title: any = ['G', 'e', 't', ' ', 'o', 'r', 'g', 'a', 'n', 'i', 'z', 'e', 'd', ' ', 'g', 'e', 't', ' ', 't', 'h', 'i', 'n', 'g', 's', ' ', 'd', 'o', 'n', 'e', '.',];

    // useEffect(() => {
    //     getSingleLetter()
    //     console.log(titleDisplayed)
    // }, [])

    // function getSingleLetter() {
    //     let newTitle: any = [];
    //     let i = 0;

    //     let interval = setInterval(() => {
    //         setTitleDisplayed(newTitle);
    //         newTitle.push(title[i]);
    //         console.log(newTitle)
    //         i++;
            
    //         if (i >= title.length) {
    //             clearInterval(interval);
    //         }
    //     }, 500);
    // }


    return (
        <div className="LandingPage">
            {/* <div className="LandingPageHeaderDiv"> */}
            <LandingPageHedear />
            {/* </div> */}
            <div className="LandingPageAll">

                <div className="LandingPageContent">
                    <h1>{title}</h1>
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
