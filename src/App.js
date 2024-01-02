import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'react-bootstrap';
import { theme } from './theme';
import Router from './router';

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
