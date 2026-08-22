// import React, { useEffect, useState } from 'react'
// import {  changepassoword,  getMyProfile, updateProfile } from '../../services/profileService';
// import { useNavigate } from 'react-router-dom';

// const profile = () => {
//     const[profile,setProfile]=useState(null);
//     const[editmode,setEditMode]=useState(false);
//     //for updation of profile
//     const[formdata,setFormdata]=useState({
//       firstName:"",
//       lastName:"",
//       phone:""
//     });
//     //for changing the password
//     const[editpassword,setEditpassword]=useState(false);
//     const[formpassword,setFormpassword]=useState({
//       oldPassword:"",
//       newPassword:"",
//       confirmPassword:""
//     });

//     const navigate=useNavigate();
//     useEffect(()=>{
//   fetchProfile();
//     },[])
//     const fetchProfile=async ()=>{
//        try{
//          const response=await getMyProfile();
//          console.log(response.data);
//          setProfile(response.data);
//          setFormdata({
//           firstName:response.data.firstName,
//           lastName:response.data.lastName,
//           phone:response.data.phone
//          });
//        }catch(error){
//         console.log(error);
//        }
//     }

//     const handleChange=(e)=>{
//       setFormdata({
//         ...formdata,
//         [e.target.name]:e.target.value
//       });
//     };
//       const handlepassword=(e)=>{
//     setFormpassword({
//       ...formpassword,
//       [e.target.name]:e.target.value
//     })
//   }

//     const handleupdate=async()=>{
//        try{
//         await updateProfile(formdata);
//         alert("Profile Updated Successfully");
//         setEditMode(false);
//         fetchProfile();
//        }catch(error){
//         console.log(error);
//         alert("failed to update profile");
//        }
//     };
//     const handleChangePassword=async()=>{
//       try{
//          await changepassoword(formpassword)
//          alert("Password changes is sucessfull");
//          setEditpassword(false);
//          setFormpassword({
//           oldPassword:"",
//           newPassword:"",
//             confirmPassword:""
//          });
      
//       }catch(error){
//         console.log(error);

//             alert(error.response?.data?.message||"Failed to Change Password");
//       }
//     }

//     if(!profile){
//         return(
//         <div className="text-center mt-5">Loading Profile....</div>
//         )
//     }
//   return (
//     <div className="container mt-5">
//         <div className="card shadow-lg">
//             <div className="card-header bg-danger text-white text-center">
//                 <h2>My Profile</h2>
//             </div>
//             <div className="card-body">
//                 <p>
//                     <strong>First Name:</strong>
//                     {
//                       editmode?<input className="form-control" name="firstName"
//                       value={formdata.firstName} onChange={handleChange}/>:profile.firstName
//                     }
//                 </p>
//                   <p>
//                     <strong>Last Name:</strong>
//                     {
//                       editmode?<input className="form-control" name="lastName"
//                       value={formdata.lastName} onChange={handleChange}/>:profile.lastName
                    
//                     }
//                 </p>
//                   <p>
//                     <strong>Email:</strong>{profile.email}
//                 </p>
//                   <p>
//                     <strong>Phone:</strong>{
//                       editmode?<input className="form-control" name="phone" value={formdata.phone} onChange={handleChange}/>:profile.phone
//                     }
                   
//                 </p>
//                   <p>
//                     <strong>Role:</strong>{profile.role}
//                 </p>

//                   <p>
//                     <strong>joined:</strong>{profile.createAt}
//                 </p>
//                 <hr/>
//                   {
//                     editmode? <button className="btn btn-success me-2" onClick={handleupdate}>Save Changes</button>
//                     :<button className="btn btn-primary me-2" onClick={()=>setEditMode(true)}>Edit Profile</button>
//                   }

//                   <button className="btn btn-warning" onClick={()=>setEditpassword(!editpassword)}>Change Password</button>
//                  {
//     editpassword&& (

//         <div className="mt-4">

//             <h5>Change Password</h5>

//             <input
//                 type="password"
//                 className="form-control mb-2"
//                 placeholder="Old Password"
//                 name="oldPassword"
//                 value={formpassword.oldPassword}
//                 onChange={handlepassword}
//             />

//             <input
//                 type="password"
//                 className="form-control mb-2"
//                 placeholder="New Password"
//                 name="newPassword"
//                 value={formpassword.newPassword}
//                 onChange={handlepassword}
//             />

//             <input
//                 type="password"
//                 className="form-control mb-3"
//                 placeholder="Confirm Password"
//                 name="confirmPassword"
//                 value={formpassword.confirmPassword}
//                 onChange={handlepassword}
//             />

//             <button
//                 className="btn btn-success"
//                 onClick={handleChangePassword}
//             >
//                 Update Password
//             </button>

//         </div>

//     )
// }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default profile



import React, { useEffect, useState } from "react";
import {
  changepassoword,
  getMyProfile,
  updateProfile,
} from "../../services/profileService";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/user/Profile.css";

const Profile = () => {

  const [profile, setProfile] = useState(null);
  const [editmode, setEditMode] = useState(false);

  // Profile update form
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Change password
  const [editpassword, setEditpassword] = useState(false);

  const [formpassword, setFormpassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();

      console.log(response.data);

      setProfile(response.data);

      setFormdata({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        phone: response.data.phone || "",
      });

    } catch (error) {
      console.log(error);
    }
  };

  // Profile input change
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  // Password input change
  const handlepassword = (e) => {
    setFormpassword({
      ...formpassword,
      [e.target.name]: e.target.value,
    });
  };

  // Update profile
  const handleupdate = async () => {

    try {

      await updateProfile(formdata);

      alert("Profile Updated Successfully");

      setEditMode(false);

      fetchProfile();

    } catch (error) {

      console.log(error);

      alert("Failed to update profile");

    }
  };

  // Change password
  const handleChangePassword = async () => {

    if (
      !formpassword.oldPassword ||
      !formpassword.newPassword ||
      !formpassword.confirmPassword
    ) {
      alert("Please fill all password fields");
      return;
    }

    if (formpassword.newPassword !== formpassword.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {

      await changepassoword(formpassword);

      alert("Password changed successfully");

      setEditpassword(false);

      setFormpassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Change Password"
      );
    }
  };

  // Loading
  if (!profile) {
    return (
      <div className="profile-loading">
        <div className="spinner-border text-danger"></div>
        <p>Loading Profile...</p>
      </div>
    );
  }

  return (

    <div className="profile-page">

      <div className="container">

        {/* ================= PROFILE HEADER ================= */}

        <div className="profile-header">

          <div className="profile-avatar">
            {profile.firstName?.charAt(0).toUpperCase()}
          </div>

          <div className="profile-header-info">

            <h2>
              {profile.firstName} {profile.lastName}
            </h2>

            <p>
              {profile.email}
            </p>

            <span className="role-badge">
              {profile.role}
            </span>

          </div>

        </div>


        {/* ================= PROFILE CARD ================= */}

        <div className="profile-card">

          <div className="profile-card-title">

            <div>
              <h4>Personal Information</h4>
              <p>Manage your CineBook account information</p>
            </div>

          </div>


          <div className="profile-details">

            {/* FIRST NAME */}

            <div className="profile-field">

              <label>First Name</label>

              {editmode ? (

                <input
                  type="text"
                  className="profile-input"
                  name="firstName"
                  value={formdata.firstName}
                  onChange={handleChange}
                />

              ) : (

                <div className="profile-value">
                  {profile.firstName}
                </div>

              )}

            </div>


            {/* LAST NAME */}

            <div className="profile-field">

              <label>Last Name</label>

              {editmode ? (

                <input
                  type="text"
                  className="profile-input"
                  name="lastName"
                  value={formdata.lastName}
                  onChange={handleChange}
                />

              ) : (

                <div className="profile-value">
                  {profile.lastName}
                </div>

              )}

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label>Email Address</label>

              <div className="profile-value disabled-value">
                {profile.email}
              </div>

            </div>


            {/* PHONE */}

            <div className="profile-field">

              <label>Phone Number</label>

              {editmode ? (

                <input
                  type="text"
                  className="profile-input"
                  name="phone"
                  value={formdata.phone}
                  onChange={handleChange}
                />

              ) : (

                <div className="profile-value">
                  {profile.phone || "Not added"}
                </div>

              )}

            </div>


            {/* ROLE */}

            <div className="profile-field">

              <label>Account Role</label>

              <div className="profile-value">
                {profile.role}
              </div>

            </div>


            {/* JOINED */}

            <div className="profile-field">

              <label>Member Since</label>

              <div className="profile-value">
                {profile.createAt}
              </div>

            </div>

          </div>


          {/* ================= PROFILE BUTTONS ================= */}

          <div className="profile-actions">

            {editmode ? (

              <>
                <button
                  className="profile-btn save-btn"
                  onClick={handleupdate}
                >
                  ✓ Save Changes
                </button>

                <button
                  className="profile-btn cancel-btn"
                  onClick={() => {
                    setEditMode(false);

                    setFormdata({
                      firstName: profile.firstName || "",
                      lastName: profile.lastName || "",
                      phone: profile.phone || "",
                    });
                  }}
                >
                  Cancel
                </button>
              </>

            ) : (

              <button
                className="profile-btn edit-btn"
                onClick={() => setEditMode(true)}
              >
                ✎ Edit Profile
              </button>

            )}

            <button
              className="profile-btn password-btn"
              onClick={() => setEditpassword(!editpassword)}
            >
              🔒 Change Password
            </button>

          </div>


          {/* ================= CHANGE PASSWORD ================= */}

          {editpassword && (

            <div className="password-section">

              <div className="password-header">

                <div className="password-icon">
                  🔐
                </div>

                <div>
                  <h5>Change Password</h5>
                  <p>
                    Keep your account secure by using a strong password.
                  </p>
                </div>

              </div>


              <div className="password-form">

                <div className="password-field">

                  <label>Current Password</label>

                  <input
                    type="password"
                    className="profile-input"
                    placeholder="Enter current password"
                    name="oldPassword"
                    value={formpassword.oldPassword}
                    onChange={handlepassword}
                  />

                </div>


                <div className="password-field">

                  <label>New Password</label>

                  <input
                    type="password"
                    className="profile-input"
                    placeholder="Enter new password"
                    name="newPassword"
                    value={formpassword.newPassword}
                    onChange={handlepassword}
                  />

                </div>


                <div className="password-field">

                  <label>Confirm New Password</label>

                  <input
                    type="password"
                    className="profile-input"
                    placeholder="Confirm new password"
                    name="confirmPassword"
                    value={formpassword.confirmPassword}
                    onChange={handlepassword}
                  />

                </div>

              </div>


              <div className="password-actions">

                <button
                  className="profile-btn update-password-btn"
                  onClick={handleChangePassword}
                >
                  🔐 Update Password
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Profile;

