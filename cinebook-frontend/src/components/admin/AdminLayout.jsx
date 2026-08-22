import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  }
  const menuItems=[
    {
      path:"/admin",
      label:"Dashboard",
      icon:"📊"
    },
    {
      path:"/admin/movies",
      label:"Movies",
      icon: "🎬"
    },
    {
       path:"/admin/theatres",
      label:"Theatres",
      icon: "🏢"
    },
      {
       path:"/admin/screens",
      label:"Screens",
      icon: "🖥️"
    },
       {
       path:"/admin/shows",
      label:"Shows",
      icon: "🎞️"
    },
       {
       path:"/admin/bookings",
      label:"Bookings",
      icon: "📑"
    },
       {
       path:"/admin/payments",
      label:"Payments",
      icon: "💳"
    },
    {
       path:"/admin/users",
      label:"Users",
      icon: "👥"
    },
    {
       path:"/admin/tickets",
      label:"Tickets",
      icon: "🎟️"
    },
    
    
  ];
  return (
    <div className="d-flex min-vh-100 " >
      <aside>
         <div className="p-4 border-bottom border-secondary">
          <div className="d-flex align-items-center">
            <span className="fs-2 me-2">🎬</span>
            <div>
              <h4 className="mb-0 fw-bold">BookMovie</h4>
              <small className="text-secondary">Admin Panel</small>
            </div>
          </div>
         </div>
         
         <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center" style={{width:"42px",height:"42px"}}>A</div>
            <div className="ms-2">
              <div className="fw-bold">Administrator</div>
              <small className="text-secondary">ADMIN</small>
            </div>
          </div>
         </div>
         <div className="p-3 flex-grow-1">
          <small className="text-secondary fw-bold">MAIN MENU</small>
          <ul className="nav flex-column mt-3">
            {menuItems.map((item)=>(
              <li className="nav-item mb-1"key={item.path}>
                <NavLink to={item.path} end={item.path==="/admin"} 
                className={({isActive})=>`nav-link rounded py-2 mb-1${
                isActive?"bg-danger  fw-bold":"text-dark"}`}>
                  <span className="me-3">{item.icon}</span>

                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
         </div>
          <div className="p-3 border-top border-secondary">

                    <button
                        className="btn btn-outline-danger w-100"
                        onClick={logout}
                    >
                        🚪 Logout
                    </button>

                </div>
      </aside>
      <div className="flex-grow-1">
        <nav className="navbar bavbar-light bg-white shadow-sm px-4">
          <div>
            <h5 className="mb-0 fw-bold">BookMovie Administration</h5>
            <small className="text-muted">Manage Your Movie Booking Platform</small>
          </div>
          <div className="d-flex align-items-center">
            <span className="me-3 text-muted"> 👤 Admin</span>
            <button className="btn btn-sm btn-outline-danger" onClick={logout}>Logout</button>
          </div>
        </nav>
        <main className="p-4">
          <Outlet/>
        </main>
      </div>
      </div>
    
  )
}

export default AdminLayout