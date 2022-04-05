import React from "react";
import DashboardRoutesReusableTemplate from "../components/DashboardRoutesReusableTemplate";
import "../Style/userProfile.css";

export const WatchList = () => {
  return (
    <DashboardRoutesReusableTemplate
      children={
        <div className="dashboard-container">
          <h1>WatchList</h1>
        </div>
      }
    />
  );
};
