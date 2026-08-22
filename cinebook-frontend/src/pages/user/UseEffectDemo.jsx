import React, { useEffect } from 'react'

const UseEffectDemo = () => {
    useEffect(()=>{
        console.log("Home Page loaded")
    },[]);
  return (
    <div className="container mt-5">
        <h2>UseEffect Demo</h2>
    </div>
  );
}

export default UseEffectDemo