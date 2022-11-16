import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './Button';
import { DateSquare } from './DateSquare';
import { Heading } from './Heading';

type Meal = {
  id: number,
  name: string,

}

function App() {
  const [clicks, setClicks] = useState(0);
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => { fetch("http://localhost:3000/meals").then(_=>_.json()).then(response => setMeals(response.meals)) }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{meals.map(_ => _.name).join()}</p>
        <Heading text='Dinner Menu' />
        <DateSquare number={clicks} text="spaget" />
        <DateSquare number={1 + 1} text="" />
        <DateSquare number={1 + 2} text="corn" />
        <Button text='Button' onClick={() => setClicks(clicks + 1)} />+
        <Button text='Reset' onClick={() => setClicks(0)} />
      </header>
    </div>
  );
}

export default App;
