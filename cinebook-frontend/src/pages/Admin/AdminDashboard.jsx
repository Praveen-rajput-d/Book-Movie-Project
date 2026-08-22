import React, { useEffect, useState } from 'react'
import { getBookingStatusReport, getDashBoard, getHighestRevenueMovie, getMostBookedMovie, getPaymentStatusReport } from '../../services/dashboardService';

const AdminDashboard = () => {
    const[dashboard,setDashboard]=useState(null);
    const[mostBookedMovie,setMostBookedMovie]=useState(null);
    const[highestRevenueMovie,setHighestRevenueMovie]=useState(null);

    const[bookingStatus,setBookingStatus]=useState([]);
    const[paymentStatus,setPaymentStatus]=useState([]);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        loadDashboard();
    },[]);
    const loadDashboard=async()=>{
        try{
            setLoading(true);
            const[
                dashboardResponse,
                mostBookedResponse,
                highestRevenueResponse,
                bookingStatusResponse,
                paymentStatusResponse
            ]=await Promise.all([
                getDashBoard(),
                getMostBookedMovie(),
                getHighestRevenueMovie(),
                getBookingStatusReport(),
                getPaymentStatusReport()
            ]);
            setDashboard(dashboardResponse.data);
            setMostBookedMovie(mostBookedResponse.data);
            setHighestRevenueMovie(highestRevenueResponse.data);
            setBookingStatus(bookingStatusResponse.data);
            setPaymentStatus(paymentStatusResponse.data);
        }catch(error){
            console.error("Dashboard Error:",error);
            
        }finally{
            setLoading(false);
        }
    };

    if(loading){
        return(
            <div className="text-center mt-5">
                <div className="spinner-border text-danger" role="status">
                </div>
                <p className="mt-3">Loading Dashboard....</p>
            </div>
        )
    }
  return (
    <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 className="fw-bold">  📊 Admin Dashboard</h2>
                <p className="text-muted mb-0">Welcome to BookMovie Admin Panel</p>
            </div>
        </div>

        {/*Main Statistics*/}

        <div className="row g-4">


            <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Movies</p>
                                <h2 className="fw-bold">{dashboard?.totalMovies ?? 0}</h2>
                                <small className="text-success">{dashboard?.activeMovies ?? 0} Active</small>
                            </div>
                            <div className="fs-1">🎬</div>
                        </div>
                    </div>
                </div>
            </div>

 <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Theatres</p>
                                <h2 className="fw-bold">{dashboard?.totalTheater ?? 0}</h2>
                                <small className="text-success">{dashboard?.activeTheatre ?? 0} Active</small>
                            </div>
                            <div className="fs-1">  🏢</div>
                        </div>
                    </div>
                </div>
            </div>

 <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Screens</p>
                                <h2 className="fw-bold">{dashboard?.totalScreen ?? 0}</h2>
                                <small className="text-success">{dashboard?.activeScreen ?? 0} Active</small>
                            </div>
                            <div className="fs-1">  🖥️</div>
                        </div>
                    </div>
                </div>
            </div>

             <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Shows</p>
                                <h2 className="fw-bold">{dashboard?.totalShows ?? 0}</h2>
                                <small className="text-success">{dashboard?.activeShows ?? 0} Active</small>
                            </div>
                            <div className="fs-1">  🎞️</div>
                        </div>
                    </div>
                </div>
            </div>



             <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Users</p>
                                <h2 className="fw-bold">{dashboard?.totalUsers ?? 0}</h2>
                              
                            </div>
                            <div className="fs-1">    👥 </div>
                        </div>
                    </div>
                </div>
            </div>

            
             <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Bookings</p>
                                <h2 className="fw-bold">{dashboard?.totalBookings ?? 0}</h2>
                              
                            </div>
                            <div className="fs-1">     📑 </div>
                        </div>
                    </div>
                </div>
            </div>

               <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Tickets</p>
                                <h2 className="fw-bold">{dashboard?.totalTickets ?? 0}</h2>
                              
                            </div>
                            <div className="fs-1">        🎫 </div>
                        </div>
                    </div>
                </div>
            </div>

              <div className="col-md-6 col-lg-3">
                <div className="card shadow-sm border-0 h-100">
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="text-muted mb-1">Total Revenue</p>
                                <h2 className="fw-bold"> ₹{dashboard?.totalRevenue ?? 0}</h2>
                              
                            </div>
                            <div className="fs-1">        💰 </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/*Today statistics*/}

        <h4 className="fw-bold mt-5 mb-3">
           📅  Today's Performance
        </h4>
        <div className="row g-4">

            <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <p className="text-muted">Today's Bookings</p>
                        <h2 className="fw-bold">{dashboard?.todaybookings ??0}</h2>
                    </div>
                </div>
            </div>
            

            
            <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <p className="text-muted">Today's Revenue</p>
                        <h2 className="fw-bold">{dashboard?.todayRevenue ??0}</h2>
                    </div>
                </div>
            </div>

            
            <div className="col-md-4">
                <div className="card border-0 shadow-sm">
                    <div className="card-body">
                        <p className="text-muted">Today's Tickets</p>
                        <h2 className="fw-bold">{dashboard?.todayTickets ??0}</h2>
                    </div>
                </div>
            </div>
        </div>

       {/* Movie Performance*/}
       <h4 className="fw-bold mt-5 mb-3">🎬Movie Performance</h4> 
       <div className="row g-4">
        
        <div className="col-md-4">
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <h5 className="text-muted">                                🔥Most Booked Movie</h5>
                    <h3 className="fw-bold mt-3">{mostBookedMovie?.movieName ?? "N/A"}</h3>
                    <p className="mb-0">
                        <strong>{mostBookedMovie?.totalBookings ??0}</strong>{" "}bookings
                    </p>
                </div>
            </div>
        </div>

  <div className="col-md-4">
            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <h5 className="text-muted">💰Most Revenue Movie</h5>
                    <h3 className="fw-bold mt-3">{highestRevenueMovie?.movieName ?? "N/A"}</h3>
                    <p className="mb-0">
                        <strong>{highestRevenueMovie?.totalRevenue??0}</strong>{" "}revenue
                    </p>
                </div>
            </div>
        </div>
       </div>  


{/* Reports */}
<h4 className="fw-bold mt-5 mb-3">
    📊 Reports
</h4>

<div className="row g-4">

    {/* Booking Status */}
    <div className="col-md-6">

        <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 pt-4 px-4">
                <div className="d-flex justify-content-between align-items-center">

                    <div>
                        <h5 className="fw-bold mb-1">
                            🎟️ Booking Status
                        </h5>

                        <small className="text-muted">
                            Booking statistics by status
                        </small>
                    </div>

                    <span className="badge bg-primary">
                        {bookingStatus.length} Status
                    </span>

                </div>
            </div>

            <div className="card-body px-4">

                {bookingStatus.length === 0 ? (

                    <div className="text-center text-muted py-4">
                        No booking data available
                    </div>

                ) : (

                    bookingStatus.map((item, index) => (

                        <div
                            key={index}
                            className="d-flex justify-content-between align-items-center
                                       border-bottom py-3"
                        >

                            <div className="d-flex align-items-center gap-2">

                                <span
                                    className={`badge ${
                                        item.status === "CONFIRMED"
                                            ? "bg-success"
                                            : item.status === "CANCELLED"
                                            ? "bg-danger"
                                            : "bg-secondary"
                                    }`}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <div className="text-end">

                                <h5 className="fw-bold mb-0">
                                    {item.totalBookings ?? 0}
                                </h5>

                                <small className="text-muted">
                                    bookings
                                </small>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    </div>


    {/* Payment Status */}
    <div className="col-md-6">

        <div className="card border-0 shadow-sm h-100">

            <div className="card-header bg-white border-0 pt-4 px-4">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h5 className="fw-bold mb-1">
                            💳 Payment Status
                        </h5>

                        <small className="text-muted">
                            Payment statistics by status
                        </small>

                    </div>

                    <span className="badge bg-success">
                        {paymentStatus.length} Status
                    </span>

                </div>

            </div>


            <div className="card-body px-4">

                {paymentStatus.length === 0 ? (

                    <div className="text-center text-muted py-4">
                        No payment data available
                    </div>

                ) : (

                    paymentStatus.map((item, index) => (

                        <div
                            key={index}
                            className="d-flex justify-content-between align-items-center
                                       border-bottom py-3"
                        >

                            <div>

                                <span
                                    className={`badge ${
                                        item.status === "SUCCESS"
                                            ? "bg-success"
                                            : item.status === "FAILED"
                                            ? "bg-danger"
                                            : "bg-warning text-dark"
                                    }`}
                                >
                                    {item.status}
                                </span>

                            </div>


                            <div className="text-end">

                                <h5 className="fw-bold mb-0">
                                    {item.totalPayments ?? 0}
                                </h5>

                                <small className="text-muted">
                                    payments
                                </small>

                            </div>

                        </div>

                    ))

                )}

            </div>

        </div>

    </div>

</div>

     
    </div>
  )
}

export default AdminDashboard