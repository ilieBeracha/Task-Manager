import { TaskModel } from "../model/TaskModel";
import { getFirstAndLastNameJwt } from "../Service/getIdJwt";

class DashBoardFunctions {
    async getTodayTasks(tasksSelector: [], setTodayTasksState: any) {
        let date = new Date().getDate()
        let mon = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        const todayDate = `${year}-${mon}-${date}`

        let todayTasks = tasksSelector.filter((task: TaskModel) => {
            return task.taskDate === todayDate && task.taskStatus !== 'completed'
        });

        setTodayTasksState([...todayTasks]);
    }

    getLabelsGroup(tasksSelector:[],setLabelGroup:any) {
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

    async getWeekTasks(tasksSelector:[], setTodayTasksState:any) {
        let date = new Date().getDate()
        let mon = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        const todayDate = `${year}-${mon}-${date}`
        console.log(todayDate)

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

    

    async  getAvgOfTasksCompleted(tasksSelector:[], setCompletedTasksAvg:any) {
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

    async getNames(setGetName:any) {
        let firstName = await getFirstAndLastNameJwt();
        setGetName(firstName.toLocaleUpperCase())
    }
}

export const dashBoardFunctions = new DashBoardFunctions()