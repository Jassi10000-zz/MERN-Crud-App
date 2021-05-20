import React , {useState , useEffect} from 'react';
import Axios from 'axios';
import './App.css';

function App() {


  const [foodName , setFoodName ] = useState('');
  const [ days , setDays ] = useState(0);
  const [foodList , setFoodList ] = useState([]);
  const [newFoodName , setNewFoodName ] = useState("");

  useEffect(() => {
      Axios.get("http://localhost:5000/read").then((response) => {
        setFoodList(response.data);
      })
  } , [])

  const addToList = () => {
    Axios.post("http://localhost:5000/insert", {FoodName : foodName , Days : days })
  }

  const updateFood = (id) => {
    Axios.put("http://localhost:5000/update" , {id: id , newFoodName : newFoodName })
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}` )
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

      <h1>-------List of Food Items --------</h1>

      {/* foodName and daySinceIAte should be same as they are in data on server's localhost */}

      {foodList.map(( val , key ) => {
        return (
          <div key={key} className="food">
            <h1>{val.foodName}</h1>
            <h1>{val.daySinceIAte}</h1>
            <input 
                  type="text" 
                  placeholder="New food name .." 
                  onChange={(event) => {
                    setNewFoodName(event.target.value);
                  }}
                  />
            
            {/* through update button we are making api request to backend */}
            <button onClick={() => updateFood(val._id)}>Update</button>
            <button onClick={() => deleteFood(val._id)}>Delete</button>
          </div>
        );
      })}
      
    </div>
  );
}

export default App;
