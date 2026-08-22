import React from 'react'

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Home from "../pages/user/Home";
import { Outlet, Route,Routes } from 'react-router-dom';
import Movies from '../pages/user/Movies';
import MyBookings from '../pages/user/MyBookings';

import MovieDetails from '../pages/user/MovieDetails';
import SelectShow from '../pages/user/SelectShow';
import ProtectedRoute from './ProtectedRoute';
import SeatSelection from '../pages/user/SeatSelection';
import Payment from '../pages/user/Payment';
import MyTicket from '../pages/user/MyTicket';
import TicketDetails from '../pages/user/TicketDetails';

import Profile from '../pages/user/profile';
import AdminprotectedRoute from './AdminProtectedRoutes';

import AdminMovies from '../pages/Admin/AdminMovies';
import AddMovie from '../pages/Admin/AddMovie';
import EditMovie from '../pages/Admin/EditMovie';
import AdminTheatres from '../pages/Admin/AdminTheatres';
import AddTheatre from '../pages/Admin/AddTheatre';
import EditTheatres from '../pages/Admin/EditTheatres';
import AdminScreen from '../pages/Admin/AdminScreen';
import AddScreen from '../pages/Admin/AddScreen';
import EditScreen from '../pages/Admin/EditScreen';
import AdminShows from '../pages/Admin/AdminShows';
import AddShows from '../pages/Admin/AddShows';
import EditShow from '../pages/Admin/EditShow';
import AdminBookings from '../pages/Admin/AdminBookings';
import AdminPayment from '../pages/Admin/AdminPayment';
import AdminTickets from '../pages/Admin/AdminTickets';
import AdminUsers from '../pages/Admin/AdminUsers';
import EditUsers from '../pages/Admin/EditUsers';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminLayout from '../components/admin/AdminLayout';




const AppRoutes = () => {
  
  return (
 
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/movies"element={<Movies/>}/>
   

   
    <Route path="/movie/:id"element={<MovieDetails/>}/>
    <Route path="/movie/:id/shows"element={<SelectShow/>}/>
    <Route path="/seat-selection/:showId" element={<SeatSelection/>}/>
    <Route path="/payment" element={<Payment/>}/>
   
   
    
    <Route path="/myBookings" element={<ProtectedRoute><MyBookings/></ProtectedRoute>}/>
     <Route path="/mytickets" element={<ProtectedRoute><MyTicket/></ProtectedRoute>}/>
       <Route path="/my-tickets" element={<ProtectedRoute><MyTicket/></ProtectedRoute>}/>
     <Route path="/ticket/:id" element={
      <ProtectedRoute><TicketDetails/></ProtectedRoute>
     }/>
     
     <Route path="/profile" element={
      <ProtectedRoute><Profile/></ProtectedRoute>
     }/>





<Route path="/admin" element={
    <AdminprotectedRoute><AdminLayout/>
   
    </AdminprotectedRoute>
    
}>

{/* <Route index element={<AdminLayout/>}/> */}

<Route index element={<AdminDashboard />} />


<Route path="movies" element={<AdminMovies/>}/>
<Route path="movies/add" element={<AddMovie/>}/>
<Route path="movies/edit/:id"element={<EditMovie/>}/>

<Route path="/admin/theatres"element={<AdminTheatres/>}/>
<Route path="/admin/theatres/add" element={<AddTheatre/>}/>
<Route path="/admin/theatres/edit/:id" element={<EditTheatres/>}/>


<Route path="/admin/screens" element={<AdminScreen/>}/>
<Route path="/admin/screens/add" element={<AddScreen/>}/>
<Route path="/admin/screens/edit/:id" element={<EditScreen/>}/>

<Route path="/admin/shows" element={<AdminShows/>}/>
<Route path="/admin/shows/add" element={<AddShows/>}/>
<Route path="/admin/shows/edit/:id" element={<EditShow/>}/>

<Route path="/admin/bookings"element={<AdminBookings/>}/>


<Route path="/admin/payments" element={<AdminPayment/>}/>
<Route path="/admin/tickets" element={<AdminTickets/>}/>
<Route path="/admin/users" element={<AdminUsers/>}/>
<Route path="/admin/users/edit/:id" element={<EditUsers/>}/>



</Route>


    
     
   </Routes>
   


  )
}

export default AppRoutes