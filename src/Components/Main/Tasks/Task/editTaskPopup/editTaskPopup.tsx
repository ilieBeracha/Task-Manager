import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './editTaskPopup.css'
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';

// import { useDispatch, useSelector } from 'react-redux';
import { TaskModel } from '../../../../../model/TaskModel';
import { apiService } from '../../../../../Service/ApiService';
import { getIdJwt } from '../../../../../Service/getIdJwt';
import { useEffect } from 'react';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};


function EditTaskPopUp({ task, id }: { task: TaskModel, id: any }) {
    const [refreshTasks, setRefreshTasks] = React.useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<TaskModel>();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function editTask(taskEdit: TaskModel) {
        handleClose()
        taskEdit.taskId = id
        const sub = await getIdJwt()
        await apiService.updateTask(sub, taskEdit).catch(e => console.log(e));
    }

    async function getTasks() {
        const sub = await getIdJwt()
        await apiService.getTasks(sub)
    }

    useEffect(() => {
        console.log(refreshTasks);
        getTasks()

    }, [refreshTasks]);


    return (
        <div className='editTaskPopup'>
            <button onClick={handleOpen}>
                <EditIcon fontSize="small" />
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Task
                    </Typography>
                    <div className='PopUpFormDiv'>
                        <form onSubmit={handleSubmit(editTask)} action="">
                            <div className='PopUpFormSeperate'>
                                <label htmlFor="">Title: </label> <br />
                                <input defaultValue={task.taskName} required type="text" {...register('taskName')} /> <br />
                                <label htmlFor="">Content: </label> <br />
                                <input defaultValue={task.taskContent} required type="text" {...register('taskContent')} /> <br />
                                <label htmlFor="">Date: </label> <br />
                                <input defaultValue={task.taskDate} required type="date" {...register('taskDate')} /> <br />
                                <label htmlFor="">Priority: </label> <br />
                                <select defaultValue={task.taskPriority} {...register('taskPriority')} id="">
                                    <option value="High">High</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Low">Low</option>
                                </select>
                                <label htmlFor="">Status: </label> <br />
                                <select defaultValue={task.taskStatus} id="" {...register('taskStatus')}>
                                    <option value="todo">Todo</option>
                                    <option value="inProgress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <button onClick={() => setRefreshTasks(!refreshTasks)} type='submit' className='PopupAddTask'>Edit</button>
                            </div>
                            <div className='popUpTagsDiv'>
                                <h5>Labels: </h5>
                                <select defaultValue={task.label} id=""{...register('label')}>
                                    <option value="">None</option>
                                    <option value="Work">Work</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Home">Home</option>
                                    <option value="School">School</option>
                                    <option value="Financial">Financial</option>
                                    <option value="Leisure">Leisure</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default EditTaskPopUp;
