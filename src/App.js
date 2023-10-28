import { useState } from "react";
import AddToy from "./addToy/addToy";
import Toys from "./toy/toys";

function App() {

  const [showForm,setShowForm] = useState(false)

  return (
    <div>
        <div className="h-20 bg-slate-300 pt-6">
          <h2 className='text-center text-lg font-bold'>Toys store</h2>
        </div>
        <div className="pl-3 pt-3">
          <button
          className="bg-sky-500 w-20 rounded-sm text-slate-100"
          onClick={()=>setShowForm(!showForm)}>{!showForm?'Add Toy':'close'}</button>
        </div>
        <div className="w-full flex justify-center">
            {showForm?<AddToy showForm={showForm} setShowForm={setShowForm}/>:<Toys showForm={showForm} setShowForm={setShowForm}/>}
        </div>
    </div>
  );
}

export default App;
