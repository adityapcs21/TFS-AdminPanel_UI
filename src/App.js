import { useDispatch } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchtodos } from './redux/slice/auth';
import SignIn from './pages/auth/login';
import Layout from './common/layout';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from 'react-bootstrap';
import { theme } from './theme';

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <BrowserRouter>
        {/* <button onClick={() => dispatch(fetchtodos())}>getTodos</button> */}

        {/* <SignIn /> */}
        <ThemeProvider theme={theme} >
          <Layout />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
