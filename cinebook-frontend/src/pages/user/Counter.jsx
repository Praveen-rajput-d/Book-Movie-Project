import React, { useState } from 'react'

const Counter = () => {
    const[count,setCount]=useState(0);
    function increasecount(){
        setCount(count+1);
    }
    function descreasecount(){
        setCount(count-1);
    }
  return (
    <div className="container mt-5 text-center">
        <h1>{count}</h1>
        <button className="btn btn-primary" onClick={increasecount}>Increase</button>

                <button className="btn btn-primary" onClick={descreasecount}>Decrease</button>
    </div>
  )
}

export default Counter