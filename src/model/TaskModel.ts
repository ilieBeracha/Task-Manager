export interface UsersModel{
    id:number,
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
    id:number,
    taskStatus: string,
    indexPriority:number,
    indexPriorityTimeStamp:number,
    imageUrl:string
}

