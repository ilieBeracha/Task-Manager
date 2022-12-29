export interface UsersModel{
    id:string,
    firstName:string,
    lastName:string,
    username:string,
    password:string,
    email:string
    tasks?:TaskModel[]
}

export interface TaskModel{
    index?:number,
    taskName:string,
    taskContent:string,
    taskDate:string,
    taskIndex?:number,
    label:string,
    state?:string,
    taskPriority:string,
    taskId:string,
    taskStatus: string
}

