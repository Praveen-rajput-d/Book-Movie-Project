import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTheatreById, updateTheater } from '../../services/TheaterService';

const EditTheatres = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const[loading,setLoading]=useState(true);
    const[theatre,setTheatre]=useState({
        name:"",
        address:"",
        pincode:"",
        city:"",
        totalscreen:"",
        active:true,
        state:""
    })
    useEffect(()=>{
        fetchThreatre();
    },[id]);
    const fetchThreatre=async()=>{
        try{
        const response=    await getTheatreById(id);
            setTheatre(response.data);
        }catch(error){
            console.log(error);
            alert("failed to load Theatre")
        }finally{
            setLoading(false);
        }
    }

     const handleChange=(e)=>{
        const{name,value}=e.target;
        setTheatre({
            ...theatre,[name]:value
        });
    }

    const formsubmit=async(e)=>{
        e.preventDefault();
        try{
            await updateTheater(id,theatre);
            alert("Theatre Updated Successfully");
            navigate("/admin/theatres");
            

        }catch(error){
            console.log(error);
         alert("failed to update Theatre")
        }

    }

if(loading){
    return <h4>Loading Theatres...</h4>
  
}

  return (
   <div>
        <h2 className="mb-4">Edit Theatre</h2>
        <div className="card shadow-sm p-4">
            <form  onSubmit={formsubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">
                            Theatre Name
                        </label>
                        <input type="text" name="name"  className="form-control" placeholder="Enter Theatre Name" value={theatre.name} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label className="form-label">
                            City
                        </label>
                        <input type="text"  name="city" onChange={handleChange} className="form-control" value={theatre.city} placeholder="Enter  city"  required/>
                    </div>
                    <div>
                        <label className="form-label">
                            State
                        </label>
                        <input type="text" name="state" onChange={handleChange}  className="form-control" value={theatre.state} placeholder="Enter  state" required/>
                    </div>
                    <div>
                        <label className="form-label">
                            Pincode
                        </label>
                        <input type="text" name="pincode" onChange={handleChange} className="form-control" value={theatre.pincode} placeholder="Enter Pincode"  required/>
                    </div>
                    <div>
                        <label className="form-label">
                            Total Screen
                        </label>
                        <input type="number" value={theatre.totalscreen} onChange={handleChange} className="form-control" name="totalScreen" placeholder="Enter number of Screen" required/>
                    </div>

                    <div>
                        <label className="form-label">
                            Address
                        </label>
  <textarea name="address" className="form-control" rows="3" placeholder="Enter theatre address" onChange={handleChange} value={theatre.address} required/>
                    </div>

                    <div className="col-12 md-3">
                        <div className="form-check">
                            <input  type="checkbox" className="form-check-input" name="active" checked={theatre.active??false} onChange={(e)=>{
                                setTheatre({
                                    ...theatre,
                                    active:e.target.checked
                                })
                            }}/>
                            <label className="form-check-label">
                                Theatre Active
                            </label>
                        </div>
                    </div>
                </div>
                <button  type="submit" className="btn btn-danger">Update Theatre</button>
                <button className="btn btn-secondary m-3" onClick={()=>navigate("/admin/theatres")}>Cancel</button>
            </form>
        </div>
    </div>
  )
}

export default EditTheatres