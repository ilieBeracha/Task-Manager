import { TaskModel } from "../../../../model/TaskModel";
import "./LabelGroup.css";

export interface LabelGroupInterface {
    label: string,
    counter: number
}

function LabelGroup({ label, counter }: LabelGroupInterface): JSX.Element {
    return (
        <div className="LabelGroupMainDiv">
            {label === "Home" ?

                <div className="LabelGroup LabelGroupHome">
                    <div className="LabelGroupName">
                        <h5>{label}</h5>
                    </div>

                    <div className="LabelGroupNumbersOfTasks">
                        <span>{counter}</span>
                        <span>Tasks</span>
                    </div>
                </div>
                : label === "Financial" ?

                    <div className="LabelGroup LabelGroupFinancial">
                        <div className="LabelGroupName">
                            <h5>{label}</h5>
                        </div>

                        <div className="LabelGroupNumbersOfTasks">
                            <span>{counter}</span>
                            <span>Tasks</span>
                        </div>
                    </div>
                    : label === "Work" ?

                        <div className="LabelGroup LabelGroupWork">
                            <div className="LabelGroupName">
                                <h5>{label}</h5>
                            </div>

                            <div className="LabelGroupNumbersOfTasks">
                                <span>{counter}</span>
                                <span>Tasks</span>
                            </div>
                        </div>
                        : label === "Leisure" ?

                            <div className="LabelGroup LabelGroupLeisure">
                                <div className="LabelGroupName">
                                    <h5>{label}</h5>
                                </div>

                                <div className="LabelGroupNumbersOfTasks">
                                    <span>{counter}</span>
                                    <span>Tasks</span>
                                </div>
                            </div>

                            : label === "Personal" ?

                                <div className="LabelGroup LabelGroupPersonal">
                                    <div className="LabelGroupName">
                                        <h5>{label}</h5>
                                    </div>

                                    <div className="LabelGroupNumbersOfTasks">
                                        <span>{counter}</span>
                                        <span>Tasks</span>
                                    </div>
                                </div>

                                : label === "School" ?

                                    <div className="LabelGroup LabelGroupSchool">
                                        <div className="LabelGroupName">
                                            <h5>{label}</h5>
                                        </div>

                                        <div className="LabelGroupNumbersOfTasks">
                                            <span>{counter}</span>
                                            <span>Tasks</span>
                                        </div>
                                    </div>
                                    : <div className="LabelGroup">
                                        <div className="LabelGroupName">
                                            <h5>{label}</h5>
                                        </div>

                                        <div className="LabelGroupNumbersOfTasks">
                                            <span>{counter}</span>
                                            <span>Tasks</span>
                                        </div>
                                    </div>}
        </div>
    );
}



export default LabelGroup;
