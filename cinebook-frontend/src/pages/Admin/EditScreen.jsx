import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getScreenByid, updateScreen } from '../../services/ScreenService';

const EditScreen = () => {
      const {id}=useParams();
      const[screens,setScreen]=useState({
        screenName:"",
        screenType:"",
        capacity:"",
        theaterId:"",
        active:true
      })
       
      const navigate=useNavigate();
      const[loading,setLoading]=useState(true);
      useEffect(()=>{
        fetchScreen();
      },[id]);
      const fetchScreen=async()=>{
        try{
            const response=await getScreenByid(id);
            console.log(response.data);
           setScreen(response.data);
        }catch(error){
            console.log(error);
            alert("failed to Load Screen");
        }finally{
            setLoading(false);
        }


      }

      const handleChange=(e)=>{
        const{name,value}=e.target
        setScreen({
            ...screens,[name]:value
        })

      }

      const formsubmit=async(e)=>{
          e.preventDefault();
          try{
            await updateScreen(id,{
                ...screens,
                capacity:Number(screens.capacity),
                theaterId:Number(screens.theaterId)
            });
            alert("Screen Updated Successfully");
            navigate("/admin/screens");
            
          }catch(error){
            console.log(error);
            alert("Failed to update Screen details");
          }
      }
      if(loading){
        return

        <p>Loading Screen...</p>
      }

  return (
   <div>
        <h2 className="mb-4">Edit Screen</h2>
        <div className="card shadow-sm p-4">
            <form  onSubmit={formsubmit}>
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
                        <input type="number"  className="form-control"name="capacity" placeholder="Enter the number of Seats" value={screens.capacity} onChange={handleChange}  required/>
                    </div>
                   
                       <div>
                        <label className="form-label">
                            Theater Id
                        </label>
                        <input type="number"  className="form-control"name="theaterId" placeholder="Enter theater id"  value ={screens.theaterId} onChange={handleChange}  required/>
                    </div>
                
                </div>
                <button   className="btn btn-danger" type="submit">Update Screen</button>
                <button className="btn btn-secondary m-3" onClick={()=>{navigate("/admin/screens")}}>Cancel</button>
            </form>
        </div>
    </div>
  )
}

export default EditScreen