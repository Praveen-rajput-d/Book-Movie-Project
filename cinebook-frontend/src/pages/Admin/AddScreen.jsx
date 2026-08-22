import React, { useState } from 'react'
import { addScreen } from '../../services/ScreenService';
import { useNavigate } from 'react-router-dom';

const AddScreen = () => {
    const[screens,setScreens]=useState({
        screenName:"",
        screenType:"",
        capacity:"",
        theaterId:"",
        active:true
    })
    const navigate=useNavigate();

    const handleChange=(e)=>{
        const{name,value}=e.target
        setScreens({
            ...screens,[name]:value
        })

    }

    const forsubmit= async(e)=>{
        e.preventDefault();
        try{
           await addScreen(screens);
           alert("Screen Added Successfully");
           navigate("/admin/screens");

        }catch(error){
            console.log(error);
        }
    }
        
    

  return (
   <div>
        <h2 className="mb-4">Add Screens</h2>
        <div className="card shadow-sm p-4">
            <h5 className="mb-4">Add a new Screen to BookMovie</h5>
            <form  onClick={forsubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">
                            Screen Name
                        </label>
                        <input type="text"   className="form-control" name="screenName" placeholder="Enter Screen Name" value={screens.screenName} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label className="form-label">
                            Screen Type
                        </label>
                        <input type="text"  className="form-control" name="screenType" placeholder="Enter  screenType" value={screens.screenType} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label className="form-label">
                            Capacity
                        </label>
                        <input type="number"  className="form-control"name="capacity" placeholder="Enter the number of Seats" value={screens.capacity} onChange={handleChange} required/>
                    </div>
                   
                       <div>
                        <label className="form-label">
                            Theater Id
                        </label>
                        <input type="number"  className="form-control"name="theaterId" placeholder="Enter theater id" value={screens.theaterId} onChange={handleChange} required/>
                    </div>
                
                </div>
                <button   className="btn btn-danger" type="submit">Add Screen</button>
                <button className="btn btn-secondary m-3" onClick={()=>{navigate("/admin/screens")}}>Cancel</button>
            </form>
        </div>
    </div>
  )
}

export default AddScreen