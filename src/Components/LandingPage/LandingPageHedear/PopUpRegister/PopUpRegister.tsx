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
import { login } from '../../../../app/authSlice (1)';

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
        await apiService.register(user).then(async (res) => {
            if (res.ok) {
                let token = await res.json()
                console.log(token)
                dispatch(login(token));
            } else {
                alert('Cant register')
            }
        })
    }
    return (
        <div>
            <button style={{color:'#497174'}}  onClick={handleOpen}>Register</button>
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
                    <div className='PopUpFormDivLogin'>
                        <form onSubmit={handleSubmit(saveRegisterDetails)} action="">
                            <label htmlFor="">First Name: </label> <br />
                            <input type="text" {...register('firstName')} /> <br />
                            <label htmlFor="">Last Name: </label> <br />
                            <input type="text" {...register('lastName')} /> <br />
                            <label htmlFor="">Email: </label> <br />
                            <input type="email" {...register('email')} /> <br />
                            <label htmlFor="">Username: </label> <br />
                            <input type="text" {...register('username')} /> <br />
                            <label htmlFor="">Password: </label> <br />
                            <input type="password" {...register('password')} /> <br />
                            <button style={{backgroundColor:"#FF725E"}} className='PopupBtn'>Register</button>
                        </form>
                    </div>
                    {/* </Typography> */}
                </Box>
            </Modal>
        </div>
    );
}

export default PopUpRegister;
