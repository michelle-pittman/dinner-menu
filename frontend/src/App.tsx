import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './Button';
import { Heading } from './Heading';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button text='no' onClick={()=>console.log("chicken")}/>
        <Button text='yes' onClick={()=>console.log("cow")}/>
        <Heading/>
        </header>
    </div>
  );
}

export default App;
