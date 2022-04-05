import React from "react";
import DashboardRoutesReusableTemplate from "../components/DashboardRoutesReusableTemplate";
import "../Style/userProfile.css";

export const UserReviews = () => {
  return (
    <DashboardRoutesReusableTemplate
      children={
        <div className="dashboard-container">
          <h1>User Reviews</h1>
        </div>
      }
    />
  );
};
