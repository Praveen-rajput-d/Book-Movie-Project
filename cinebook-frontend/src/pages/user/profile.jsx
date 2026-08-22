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

        {/* Profile Header */}

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


        {/*Profile Card */}

        <div className="profile-card">

          <div className="profile-card-title">

            <div>
              <h4>Personal Information</h4>
              <p>Manage your CineBook account information</p>
            </div>

          </div>


          <div className="profile-details">

            {/* First Name */}

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


            {/*  last Name*/}

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


            {/* Email */}

            <div className="profile-field">

              <label>Email Address</label>

              <div className="profile-value disabled-value">
                {profile.email}
              </div>

            </div>


            {/* Phone */}

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


            {/* Joined */}

            <div className="profile-field">

              <label>Member Since</label>

              <div className="profile-value">
                {profile.createAt}
              </div>

            </div>

          </div>


          {/* Profile Buttons */}

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


          {/*Change passowrd */}

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

