import React, { useEffect, useState } from 'react'
import { allPayments, countFailedPayment, countSuccessPayments, GetTotalRevenue, searchPaymentByMethod, searchPaymentBystatus, searchPaymentByTransactionId } from '../../services/Payment';

const AdminPayment = () => {
    const[payments,setPayments]=useState([]);
    const[loading,setLoading]=useState(true);
    const[search,setSearch]=useState("");
    const[selectStatus,setSelectStatus]=useState("");
    const[selectMethod,setSelectMethod]=useState("");
    const[revenue,setRevenue]=useState(0);
    const[successCount,setSuccessCount]=useState(0);
    const[failedCount,setFailedCount]=useState(0);
    useEffect(()=>{
        fetchPayment();
        totalrevenuebutton();
    },[])
    const fetchPayment=async()=>{
        try{
            const response=await allPayments();
            console.log(response.data);
            setPayments(response.data);
        }catch(error){
            console.log(error);
            setPayments([]);
         
        }finally{
            setLoading(false);
        }

    }
const searchbutton = async () => {
   
    setSelectMethod("");
    setSelectStatus("");

    if (!search.trim()) {
        fetchPayment();
        return;
    }

    try {
        setLoading(true);

        const response = await searchPaymentByTransactionId(search.trim());

        console.log("Search Payment:", response.data);

        setPayments([response.data]);

    } catch (error) {

        console.error("Search Payment Error:", error);
        console.error("Backend Error:", error.response?.data);

        setPayments([]);

    } finally {
        setLoading(false);
    }
};

   const filterPaymentByStatus=async(status)=>{
    setSearch("");
    setSelectMethod("");

     setSelectStatus(status);
    
     if(!status){
        fetchPayment();
        return;
     }
    
    try{
        setLoading(true);
        const response=await searchPaymentBystatus(status);
        console.log(response.data);
        setPayments(response.data);
    }catch(error){
        console.error("Status Filter error:",error);
        setPayments([]);
    }finally{
        setLoading(false);
    }
   }
   const clearbutton=()=>{
    setSearch("");
    setSelectStatus("");
    setSelectMethod("");
    fetchPayment();
   }
   //filter by method
   const filterpaymentByMethod=async(method)=>{
    setSearch("");
    setSelectMethod(method);
    setSelectStatus("");
    if(!method){
        fetchPayment();
        return;
    }
    try{
        setLoading(true);
        const response=await searchPaymentByMethod(method);
        console.log(response.data);
        setPayments(response.data);
    }catch(error){
        console.log(error);
        setPayments([]);
    }finally{
        setLoading(false);
    }

   }

   //format the date in date column
   const formatDate=(dateTime)=>{
    if(!dateTime){
        return "-";
    }
    return new Date(dateTime).toLocaleString();
   }
   //get Payment Total Revenue
   const totalrevenuebutton=async()=>{
    try{

        const revenueresponse=await GetTotalRevenue();
    setRevenue(revenueresponse.data??0);}
    catch(error){
         console.error("error fetching payment statistics",error);

    }
    try{
         const successresponse=await countSuccessPayments();
         setSuccessCount(successresponse.data??0);
        
    }catch(error){
          console.error("error fetching payment statistics",error);
    }
    try{
        
        const failedresponse=await countFailedPayment();
         setFailedCount(failedresponse.data??0);
    }
        catch(error){
        console.error("error fetching payment statistics",error);
    }
   };
  return (
   <div>

        
        <div className="d-flex justify-content-between align-items-center">
            <div>
                <h2><strong>Payment Management</strong></h2>
  <p className="text-muted mb-0">Manage Payment in BookMovie</p>
            
            </div>
            <button className="btn btn-primary" onClick={()=>{fetchPayment(); 
                totalrevenuebutton();
            }}>Refresh</button>
         
        </div>
        <div className="row g-3 mb-4">
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                         <h6 className="text-muted">Total Revenue</h6>
                         <h3 >₹{Number(revenue).toFixed(2)}</h3>
                 
                        
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h6 className="text-muted">Successful Payments</h6>
                        <h3 className="text-success">{successCount}</h3>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h6 className="text-muted">Failed Payments</h6>
                        <h3 className="text-danger">{failedCount}</h3>
                    </div>
                </div>
            </div>
        </div>
     

        <div className="card shadow-sm">
            <div className="card-body">
                <div className="row g-3 align-items-end">
                    {/*searching ticket  and filter */}
                    <div className="col-md-4">
                        <label className="form-label">Search Transaction ID</label>
                       <div className="input-group">
                         <input type="text" className="form-control" placeholder="Enter Transaction ID" value={search} 
                         onChange={(e)=>setSearch(e.target.value)} onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                searchbutton();
                            }
                         }}
                          />
                         <button className="btn btn-primary" onClick={searchbutton} >Search</button>
                       </div>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Ticket Status</label>
                        <select className="form-select"  value={selectStatus} onChange={(e)=>filterPaymentByStatus(e.target.value)}>
                            <option value="" >ALL</option>
                            <option value="SUCCESS">SUCCESS</option>
                                <option value="FAILED">FAILED</option>
                                    <option value="REFUNDED">REFUNDED</option>
                                    <option value="PENDING">PENDING</option>
                        </select>
                    </div>

                       <div className="col-md-4">
                        <label className="form-label">Payment Method</label>
                        <select className="form-select"  value={selectStatus} onChange={(e)=>filterpaymentByMethod(e.target.value)}>
                            <option value="" >ALL</option>
                            <option value="UPI">UPI</option>
                                <option value="CREDIT_CARD">CREDIT_CARD</option>
                                    <option value="DEBIT_CARD">DEBIT_CARD</option>
                                    <option value="NET_BANKING">NET_BANKING</option>
                                    <option value="WALLET">WALLET</option>
                        </select>
                    </div>

                    <div className="col-md-12 d-flex align-items-end">
                        <button className="btn btn-secondary w-100" onClick={clearbutton}>Clear</button>
                    </div>
                   
                </div>
                <h5><strong>Payments</strong></h5>
                {
                    loading ?(
                        <p>Loading Payments...</p>
                    ):payments.length===0 ?(
                        <p>No Payments Found</p>
                    ):(
                     <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>BookingNumber</th>
                             
                        
                                    <th>Payment Method</th>
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Time</th>
                                   
                                    <th> Status</th>
                                   
                                 
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map(
                                    (payment)=>(
                                        <tr key={payment.id}>
                                            <td>{payment.id}</td>
                                             <td><strong>{payment.bookingNumber}</strong></td>
                                            
                                                <td>
                                         <span className="badge bg-info text-dark "> {payment.paymentMethod}</span>
                                                    </td>
                                                 <td>
                                                    <small>  {payment.transactionId}</small>
                                                  
                                                    </td>
  ₹{Number(payment.amount).toFixed(2)}
                                                
                                                   <td>
                                                    {formatDate(payment.paymentTime)}
                                                   
                                                    </td>
                                                  
                                                    
                                    <td>
                                      {payment.paymentStatus==="SUCCESS"?(
                                        <span className="badge bg-success">SUCCESS</span>
                                      ):payment.paymentStatus==="FAILED"?(
                                        <span className="badge bg-danger">FAILED</span>
                                      ):(
                                        <span className="badge bg-warning text-dark">
                                            {payment.paymentStatus}
                                        </span>
                                      )}
                                    </td>
                    
                                                   
                                        </tr>
                                    )
 
                                    )

                                }
                           
                                        
                            </tbody>

                        </table>
                        </div>
                    )
                }
            </div>
        </div>
        
        

    </div>
  )
}

export default AdminPayment