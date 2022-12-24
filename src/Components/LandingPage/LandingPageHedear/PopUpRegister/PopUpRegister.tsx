import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './PopUpRegister.css'
import { useForm } from 'react-hook-form';
import { UsersModel } from '../../../../model/TaskModel';
import { apiService } from '../../../../Service/ApiService';
import { ifUser } from '../../../../app/usersSlice';
import { useDispatch } from 'react-redux';

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


function PopUpRegister() {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm<UsersModel>()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    async function saveRegisterDetails(user: UsersModel) {
        console.log(user)
        await apiService.register(user).then((res) => {
           
            
            if (res.ok) {
                dispatch(ifUser(true))
            } else {
                alert('User or Password incorrect')
            }
        })
    }
    return (
        <div>
            <button onClick={handleOpen}>Register</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Register
                    </Typography>
                    {/* <Typography className='PopUpLoginFormDiv' id="modal-modal-description" sx={{ mt: 5 }}> */}
                    <div className='PopUpFormDiv'>
                        <form onSubmit={handleSubmit(saveRegisterDetails)} action="">
                            <label htmlFor="">First Name: </label> <br />
                            <input type="text" {...register('firstName')} /> <br />
                            <label htmlFor="">Last Name: </label> <br />
                            <input type="text" {...register('lastName')} /> <br />
                            <label htmlFor="">Email: </label> <br />
                            <input type="text" {...register('email')} /> <br />
                            <label htmlFor="">Username: </label> <br />
                            <input type="text" {...register('username')} /> <br />
                            <label htmlFor="">Password: </label> <br />
                            <input type="text" {...register('password')} /> <br />
                            <button id='PopupLoginBtn'>Register</button>
                        </form>
                    </div>
                    {/* </Typography> */}
                </Box>
            </Modal>
        </div>
    );
}

export default PopUpRegister;
