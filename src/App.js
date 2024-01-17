import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import Router from './router';
import { ThemeProvider } from '@mui/material';

function App() {

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
