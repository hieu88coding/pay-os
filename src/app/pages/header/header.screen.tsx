//import { NavLink, Route, useLocation } from "react-router-dom";
import "./header.scss";
import HeaderAdapter from "./header.adapter";
import { useState } from "react";
// import { ENUM_PAGE } from "src/libraries/enums/pages";
// import BreadCrumb from "src/libraries/components/breadcrumb/breadcrumb";
// import AvatarMenu from "src/libraries/components/avatar/avatar";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
function HeaderScreen() {
  const handleLogout = () => {
    console.log("User logged out");
    //navigate('/logout');
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    //navigate('/profile');
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    //navigate('/settings');
  };
  return (
    <header className="tittlebar">
      <div className="navigating-titlebar">
        {/* <Route path={ENUM_PAGE.HOME} exact>
          <p className="tittlebar-name">{"Trang chủ"}</p>
        </Route> */}
      </div>

      <div className="profile-dropdown">
        <div className="notification-profile">
          {/* <TaskListNotification /> */}
          {/* <NotificationComponent /> */}
          {/* <SubProfile {...{ logoutApp, getUserInfo, logoutByToken }} /> */}
        </div>
      </div>
    </header>
  );
}

export default HeaderScreen;
