import './App.css';
import { Button } from './Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button text='button' onClick={()=>console.log("click")}/>
      </header>
    </div>
  );
}

export default App;
