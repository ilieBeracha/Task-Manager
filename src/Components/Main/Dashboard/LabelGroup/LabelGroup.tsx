import { TaskModel } from "../../../../model/TaskModel";
import "./LabelGroup.css";

export interface LabelGroupInterface{
    label:string,
    counter:number
}

function LabelGroup({ label, counter }: LabelGroupInterface): JSX.Element {
    return (
        <div className="LabelGroup">
            <div className="LabelGroupName">
                <h5>{label}</h5>
            </div>

            <div className="LabelGroupNumbersOfTasks">
                <span>{counter}</span>
            </div>
        </div>
    );
}

export default LabelGroup;
