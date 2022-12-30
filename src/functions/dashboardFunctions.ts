import { TaskModel } from "../model/TaskModel";
import { getFirstAndLastNameJwt } from "../Service/getIdJwt";

class DashBoardFunctions {
    async getTodayTasks(tasksSelector: [], setTodayTasksState: any, todayTasksState: any) {
        let date = new Date().getDate()
        let mon = new Date().getMonth() + 1
        let year = new Date().getFullYear()
        const todayDate = `${year}-${mon}-${date}`

        let todayTasks = tasksSelector.filter((task: TaskModel) => {
            return task.taskDate === todayDate && task.taskStatus !== 'completed'
        });

        setTodayTasksState([...todayTasks]);
    }

    // async filterTasksByStatus(tasksSelector: [], setTodo: any, setInProgress: any, setCompleted: any) {
    //     let todoCounter = 0
    //     let inProgressCounter = 0
    //     let completedCounter = 0
    //     tasksSelector.map((task: TaskModel) => {
    //         if (task.taskStatus === "todo") {
    //             todoCounter++
    //         }
    //         if (task.taskStatus === "inProgress") {
    //             inProgressCounter++
    //         }
    //         if (task.taskStatus === "completed") {
    //             completedCounter++
    //         }

    //     })
    //     setTodo(todoCounter);
    //     setInProgress(inProgressCounter)
    //     setCompleted(completedCounter)
    // }

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