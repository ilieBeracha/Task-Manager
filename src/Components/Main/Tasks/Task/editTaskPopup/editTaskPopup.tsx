import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './editTaskPopup.css'
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import { TaskModel } from '../../../../../model/TaskModel';
import { apiService } from '../../../../../Service/ApiService';
import { getIdJwt } from '../../../../../Service/getIdJwt';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ifUser } from '../../../../../app/usersSlice';


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

function EditTaskPopUp({ task, id, refreshTasks, setRefreshTasks }: { task: TaskModel, id: any, refreshTasks: any, setRefreshTasks: any }) {
    const { register, handleSubmit, formState: { errors } } = useForm<TaskModel>();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function editTask(taskEdit: TaskModel) {
        setRefreshTasks(!refreshTasks)
        handleClose();
        taskEdit.id = id;
        await apiService.updateEditTask(taskEdit)
    }

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
                                <button style={{ backgroundColor: "#FF725E" }} type='submit' className='PopupAddTask'>Edit</button>
                            </div>
                            <div className='popUpTagsDiv'>
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
                                <label>Labels: </label>
                                <select defaultValue={task.label} id=""{...register('label')}>
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

