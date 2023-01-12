import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './PopUpLogin.css'
import { useForm } from 'react-hook-form';
import { UsersModel } from '../../../../model/TaskModel';
import { apiService } from '../../../../Service/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { ifUser } from '../../../../app/usersSlice';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { login } from '../../../../app/authSlice (1)';
import Button from '@mui/material/Button';



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

function toastMessIncorrectDetails() {
  toast.error('User or Password incorrect', {
    position: toast.POSITION.TOP_CENTER,
    className: 'SignInAgainToast',
    theme: "colored",
    closeOnClick: true,
    draggable: true,
    pauseOnHover: false,
  })
}

function PopUpLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm<UsersModel>();
  const loginSelector = useSelector((state: any) => state.logged);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function saveLoginDetails(user: UsersModel) {
    await apiService.login(user).then(async (res: any) => {
      if (res.ok) {
        let token = await res.json()
        console.log(token)
        dispatch(login(token));
        // dispatch(ifUser(true));
      } else {
        toastMessIncorrectDetails();
      }
    })
  }



  return (
    <div>
      <button style={{color:'#497174'}} className='LogInButton' onClick={handleOpen}>Login</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <div className='PopUpFormDivLogin'>
            <form onSubmit={handleSubmit(saveLoginDetails)} action="">
              <label htmlFor="">Username: </label> <br />
              <input type="text" {...register('username')} /> <br />
              <label htmlFor="">Password: </label> <br />
              <input type="password" {...register('password')} /> <br />
              <div className='Btns'>

                <button style={{backgroundColor:"#FF725E"}} className='PopupBtn'>Login</button>
              </div>
              {/* <Button size='small' type='submit' variant="contained">Login</Button> */}

            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PopUpLogin;
