import React, { useState } from 'react'
import { TbHeartExclamation } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { addTheatre } from '../../services/TheaterService';

const AddTheatre = () => {
    const[theatre,setTheatre]=useState({
      name:"",
      address:"",
      state:"",
      pincode:"",
      city:"",
      totalScreen:"" ,
      active:true
    })
    const navigate=useNavigate();
  
    const handleChange=(e)=>{
        const{name,value}=e.target;
        setTheatre({
            ...theatre,
            [name]:value
        });

    };

    const formsubmit= async(e)=>{
        e.preventDefault();
        try{
         await addTheatre(theatre);
         alert("Theatre Added Successfully");
           navigate("/admin/theatres");


        }catch(error){
          console.log(error);
      

        } 

    }


  return (
    <div>
        <h2 className="mb-4">Add Theatre</h2>
        <div className="card shadow-sm p-4">
            <h5 className="mb-4">Add a new Theatre to BookMovie</h5>
            <form onClick={formsubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">
                            Theatre Name
                        </label>
                        <input type="text" name="name"  className="form-control" placeholder="Enter Theatre Name" value={theatre.name}  onChange={handleChange}required/>
                    </div>
                    <div>
                        <label className="form-label">
                            City
                        </label>
                        <input type="text"  className="form-control" name="city" placeholder="Enter  city" value={theatre.city} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label className="form-label">
                            State
                        </label>
                        <input type="text"  className="form-control"name="state" placeholder="Enter  state" value={theatre.state}  onChange={handleChange}required/>
                    </div>
                    <div>
                        <label className="form-label">
                            Pincode
                        </label>
                        <input type="text" className="form-control" name="pincode" placeholder="Enter Pincode" value={theatre.pincode} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label className="form-label">
                            Total Screen
                        </label>
                        <input type="number" className="form-control" name="totalScreen" placeholder="Enter number of Screen" value={theatre.totalScreen} onChange={handleChange} min="1" required/>
                    </div>

                    <div>
                        <label className="form-label">
                            Address
                        </label>
  <textarea name="address" className="form-control" rows="3" value={theatre.address} onChange={handleChange} placeholder="Enter theatre address" required/>
                    </div>
                </div>
                <button  type="submit" className="btn btn-danger">Add Theatre</button>
                <button className="btn btn-secondary m-3" onClick={()=>navigate("/admin/theatres")}>Cancel</button>
            </form>
        </div>
    </div>
  )
}

export default AddTheatre