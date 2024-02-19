import './App.css';
import { HashRouter } from 'react-router-dom';
import { theme } from './theme';
import Router from './router';
import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails, setUserToken } from './redux/slice/auth';

function App() {
  const dispatch = useDispatch()
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("userDetails")))

  useEffect(() => {
    if (token) {
      dispatch(setUserDetails(token))
      dispatch(setUserToken(token.accessToken))
    }
  }, [token])

  return (
    <div className="App">

      <HashRouter basename='/'>
        <ThemeProvider theme={theme} >
          <Router />
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;



// renewal lead access
// get details api check
// search reset button
//no data found
//student natch change -> currentBatchNo => update name to id
//payment tab
