import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { TaskModel } from '../../../../model/TaskModel';
import { useDispatch, useSelector } from 'react-redux';
import { apiService } from '../../../../Service/ApiService';
import { getIdJwt } from '../../../../Service/getIdJwt';
import './AddTask.css'
import { useEffect, useState } from 'react';
import { labelsArr } from '../../../../Service/labels';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ifUser } from '../../../../app/usersSlice';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function toastMessAddTask() {
    toast.success('Added Task', {
        position: toast.POSITION.TOP_CENTER,
        className: 'AddTaskToast',
        theme: "colored",
        closeOnClick: true,
        draggable: true,
        pauseOnHover: false,
    })
}

function AddTask({ refreshTasks, setRefreshTasks }: any) {
    // const [labels, setLabels] = useState<any>(labelsArr);
    // const [selectedLabel, setSelectedLabel] = useState()
    // const loginSelector = useSelector((state: any) => state.logged);
    // const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<TaskModel>();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    async function saveTask(task: TaskModel) {
        setRefreshTasks(!refreshTasks)
        handleClose();
        toastMessAddTask();
        task.indexPriorityTimeStamp = new Date().getTime();
        const sub = await getIdJwt();
        console.log(sub);
        
        await apiService.AddNewTask(sub, task)
    }

    return (
        <div className='AddTask'>
            <button onClick={handleOpen}>Add Task</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add Task
                    </Typography>
                    <div className='PopUpFormDiv'>
                        <form onSubmit={handleSubmit(saveTask)} action="">
                            <div className='PopUpFormSeperate'>

                                <label htmlFor="">Title: </label> <br />
                                <input required type="text" {...register('taskName')} /> <br />
                                <label htmlFor="">Content: </label> <br />
                                <input required type="text" {...register('taskContent')} /> <br />
                                <label htmlFor="">Date: </label> <br />
                                <input required type="date" {...register('taskDate')} /> <br />
                                
                                <button style={{backgroundColor:"#FF725E"}} type='submit' className='PopupAddTask'>Add</button>
                            </div>
                            <div className='popUpTagsDiv'>
                                <label htmlFor="">Priority: </label> <br />
                                <select {...register('taskPriority')} id="">
                                    <option value="High">High</option>
                                    <option value="Mid">Mid</option>
                                    <option value="Low">Low</option>
                                </select>
                                <label htmlFor="">Status: </label> <br />
                                <select id="" {...register('taskStatus')}>
                                    <option value="todo">Todo</option>
                                    <option value="inProgress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <label>Labels: </label>
                                <select id=""{...register('label')}>
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

export default AddTask;
