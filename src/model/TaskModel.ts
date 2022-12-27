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
    index:number,
    state:string,
    taskName:string,
    taskContent:string,
    taskDate:string,
    // index:number,
    taskPriority:string,
    taskId:string,
    taskStatus: string
}