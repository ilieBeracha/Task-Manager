import { TaskModel } from "../model/TaskModel";
import { getFirstAndLastNameJwt } from "../Service/getIdJwt";

class DashBoardFunctions {
    async getTodayTasks(tasksSelector: [], setTodayTasksState: any) {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, "0");
        let date = String(today.getDate()).padStart(2, "0");
        let todayDate = `${year}-${month}-${date}`;

        let todayTasks = tasksSelector.filter((task: TaskModel) => {
            console.log(task.taskDate)
            return task.taskDate === todayDate && task.taskStatus !== 'completed'
        });

        setTodayTasksState([...todayTasks]);
    }

    getLabelsGroup(tasksSelector: [], setLabelGroup: any) {
        let labelCounts: { [key: string]: number } = {};
        tasksSelector.forEach((t: TaskModel) => {
            if (labelCounts[t.label]) {
                labelCounts[t.label]++;
            } else {
                labelCounts[t.label] = 1;
            }
        });
        setLabelGroup(labelCounts);
    }

    async getWeekTasks(tasksSelector: [], setTodayTasksState: any) {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, "0");
        let date = String(today.getDate()).padStart(2, "0");
        let todayDate = `${year}-${month}-${date}`;


        let firstDayOfWeek = new Date(todayDate);
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay() + 1);

        let lastDayOfWeek = new Date(todayDate);
        lastDayOfWeek.setDate(lastDayOfWeek.getDate() - lastDayOfWeek.getDay() + 7);

        let weekTasks = tasksSelector.filter((task: TaskModel) => {
            let taskDate = new Date(task.taskDate);
            return taskDate >= firstDayOfWeek && taskDate <= lastDayOfWeek;
        });

        setTodayTasksState(weekTasks)
    }



    async getAvgOfTasksCompleted(tasksSelector: [], setCompletedTasksAvg: any) {
        if (!tasksSelector) return;
        let counterOfTasks = tasksSelector.length;
        let counterOfCompletedTasks = 0;
        tasksSelector.map((task: TaskModel) => {
            if (task.taskStatus === "completed") {
                counterOfCompletedTasks++;
            }
        });
        let percentageCompleted = ((counterOfCompletedTasks / counterOfTasks) * 100);
        setCompletedTasksAvg(percentageCompleted);
    }

    async getNames(setGetName: any) {
        let firstName = await getFirstAndLastNameJwt();
        setGetName(firstName.toLocaleUpperCase())
    }
}

export const dashBoardFunctions = new DashBoardFunctions()