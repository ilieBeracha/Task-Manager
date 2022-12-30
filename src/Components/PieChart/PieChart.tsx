import "./PieChart.css";
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from "react-redux";
import { TaskModel } from "../../model/TaskModel";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(): JSX.Element {
    const tasksSelector = useSelector((state: any) => state.tasks);
    const [todo, setTodo] = useState<number>()
    const [inProgress, setInProgress] = useState<number>()
    const [completed, setCompleted] = useState<number>()

    useEffect(() => {
        getTasksData()
    }, [tasksSelector])

    async function getTasksData() {
        let todoCounter = 0;
        let inProgressCounter = 0;
        let completedCounter = 0;
        tasksSelector.map((t: TaskModel) => {
            if (t.taskStatus === 'todo') {
                todoCounter++
            } else if (t.taskStatus === 'inProgress') {
                inProgressCounter++
            } else if (t.taskStatus === 'completed') {
                completedCounter++
            }
        })
        setTodo(todoCounter)
        setInProgress(inProgressCounter)
        setCompleted(completedCounter)
    }

    const data = {
        labels: ['To Do', 'In Progress', 'Completed'],
        datasets: [
            {
                label: 'tasks',
                data: [todo, inProgress, completed],
                backgroundColor: [
                    'orange', '#A75CDA', '#40CC80'
                ],
                borderWidth: 1,

            },
        ],
    };
    return (
        <div className="PieChart">
            <Pie data={data} />
        </div>
    );
}

export default PieChart;
