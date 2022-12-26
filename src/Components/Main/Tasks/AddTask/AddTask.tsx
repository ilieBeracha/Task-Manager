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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function AddTask({ refreshTasks, setRefreshTasks }: any) {
    const { register, handleSubmit, formState: { errors } } = useForm<TaskModel>();
    const loginSelector = useSelector((state: any) => state.logged);
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    async function saveTask(task: TaskModel) {
        setRefreshTasks(!refreshTasks)
        handleClose();
        const sub = await getIdJwt()
        await apiService.AddNewTask(sub, task).catch(e => console.log(e));
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
                            <label htmlFor="">Title: </label> <br />
                            <input required type="text" {...register('taskName')} /> <br />
                            <label htmlFor="">Content: </label> <br />
                            <input required type="text" {...register('taskContent')} /> <br />
                            <label htmlFor="">Date: </label> <br />
                            <input required type="date" {...register('taskDate')} /> <br />
                            <label htmlFor="">Priority: </label> <br />
                            <input max={5} type="number" {...register('taskPriority')} /> <br />
                            <label htmlFor="">Status: </label> <br />
                            <select id="" {...register('taskStatus')}>
                                <option value="todo">Todo</option>
                                <option value="inProgress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                            <button type='submit' className='PopupAddTask'>Add</button>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AddTask;
