import { useDispatch } from 'react-redux';
import './App.css';
import { fetchtodos } from './redux/slice/auth';

function App() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <button onClick={()=>dispatch(fetchtodos())}>getTodos</button>
    </div>
  );
}

export default App;
