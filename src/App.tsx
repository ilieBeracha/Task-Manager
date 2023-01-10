import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Main from './Components/Main/Main';
import { useSelector } from 'react-redux/es/exports';


function App() {
  const mode = useSelector((state: any) => state.mode);
  const authSelector = useSelector((state: any) => state.auth);

  return (
    <div className="App" data-theme={mode? 'dark': 'light'}>
      <div className='overlay'></div>
      <Routes>
        {
          authSelector ?
            <Route path='*' element={<Main />}></Route>
            :
            <Route path='*' element={<LandingPage />}></Route>

        }
      </Routes>
    </div>
  );
}

export default App;
