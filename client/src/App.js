import React , {useState} from 'react';
import Axios from 'axios';
import './App.css';

function App() {


  const [foodName , setFoodName ] = useState('');
  const [ days , setDays ] = useState(0);


  const addToList = () => {
    Axios.post("http://localhost:5000/insert", {FoodName : foodName , Days : days })
  }

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Enter Food name</label>
      <input type="text" onChange={(event) => {
        setFoodName(event.target.value)
      }}/>

      <label>Enter days since you ate this</label>
      <input type="number" onChange={(event) => {
        setDays(event.target.value)
      }}/>
      

      <button onClick={addToList}>Add to List</button>
    </div>
  );
}

export default App;
