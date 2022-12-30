import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './PopUpLogin.css'
import { useForm } from 'react-hook-form';
import { UsersModel } from '../../../../model/TaskModel';
import { apiService } from '../../../../Service/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { ifUser } from '../../../../app/usersSlice';

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
// function toastMess() {
//   toast.error('User or Password incorrect', {
//       position: toast.POSITION.TOP_CENTER,
//       className: 'discoverToast',
//       theme: "colored",
//       // hideProgressBar:true,
//       closeOnClick: true,
//       draggable: true,
//       pauseOnHover: false,
//   })
// }

function PopUpLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm<UsersModel>();
  const loginSelector = useSelector((state: any) => state.logged);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function saveLoginDetails(user: UsersModel) {
    await apiService.login(user).then(async (res) => {
      if (res.ok) {
        const token = await res.json();
        if (token) {
          window.localStorage.setItem('token', token);
          dispatch(ifUser(true));
          return
        }
      } else {
        alert('User or Password incorrect')
      }
    })
  }

  return (
    <div>
      <button onClick={handleOpen}>Login</button>
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
              <input type="text" {...register('password')} /> <br />
              <button id='PopupLoginBtn'>Login</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PopUpLogin;
