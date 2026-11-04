// import react, {useState} from 'react';
// import "./App.css";
// function App(){
//   return <div>
//     <h1>Student Details</h1>
//     <h2>Student Name: Yuvraj</h2>
//     <h2>Student Course: MCA</h2>
//     <h2>Student College: Alliance</h2>
//     <h2>Student Address: Anekal</h2>
//     <h2>Student Phn: +911234567890</h2>
//   </div>
// };
// export default App;



// // JS Function
// function App(){
//   const [age, SetAge] = useState(20);

//   return (
//   <div>
//     <h1>Hello World</h1>;
//     <h2>My Age is: {age}</h2>
//     <button onClick={()=>SetAge(30)}>Change Age</button>
//   </div>);
// };
// export default App;




// COUNT BUFFERING SYSTEM
import react, {useState} from 'react';
import "./App.css";

function buffer(){
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={()=>setCount(count + 1)}>Increment</button>
      <button onClick={()=>setCount(count - 1)}>Decrement</button>
      <button onClick={()=>setCount(0)}>Reset</button>

    </div>
  )
};
export default buffer;

