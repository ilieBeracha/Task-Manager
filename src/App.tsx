import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Main from './Components/Main/Main';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { ifUser } from './app/usersSlice';

function App() {
  const loggedSelector = useSelector((state: any) => state.logged);
  const dispatch = useDispatch()
  useEffect(()=>{
    const token = window.localStorage.getItem('token');
    if(token){
      dispatch(ifUser(true))
    } else{
      dispatch(ifUser(false))
    }
  },[])
 
  return (
    <div className="App">
      <div className='overlay'></div>
      <Routes>
        {
          loggedSelector === false ?
            <Route path='*' element={<LandingPage />}></Route>
            : <Route path='*' element={<Main />}></Route>
        }
      </Routes>
    </div>
  );
}

export default App;
