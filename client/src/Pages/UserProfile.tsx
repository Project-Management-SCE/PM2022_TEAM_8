import React from "react";
import DashboardRoutesReusableTemplate from "../components/DashboardRoutesReusableTemplate";
import "../Style/userProfile.css";

//TODO: enter inside user profile main page other stuff like newsletters, user details...
const UserProfile = () => {
  return (
    <DashboardRoutesReusableTemplate
      children={
        <div>
          <h1>Dashboard</h1>
          <form>
            <div className="user-details">
              <input type="text" placeholder="First Name" disabled />
              <input type="text" placeholder="Last Name" disabled />
              <input type="email" placeholder="Email" disabled />
              <input type="phone" placeholder="Phone" disabled />
              <input type="text" placeholder="Address" disabled />
              <input type="date" placeholder="" disabled />
              <button>Edit Profile</button>
            </div>
          </form>
        </div>
      }
    />
  );
};

export default UserProfile;
