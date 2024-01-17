import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import Router from './router';
import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/slice/auth';

function App() {
  const dispatch = useDispatch()
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("userDetails")))

  useEffect(() => {
    if (token) {
      dispatch(setUserDetails(token))
    }
  }, [token])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme} >
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
