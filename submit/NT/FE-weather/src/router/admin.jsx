import React from "react";
import SearchWeather from "../components/searchWeather";
import App from "../App";
import "./admin.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { MenuFoldOutlined, CloseOutlined } from "@ant-design/icons";
export default function Admin() {
  const handleClickShow = () => {
    const app = document.querySelector(".item-app");
    const admin = document.querySelector(".item-admin");
    const exit = document.querySelector(".nav-icon");
    const icon = document.querySelector(".icon");
    app.style.display = "inline-block";
    admin.style.display = "inline-block";
    exit.style = "display: inline-block;margin-top:20px";
    icon.style.display = "none";
  };
  const handleExit = () => {
    const icon = document.querySelector(".icon");
    const app = document.querySelector(".item-app");
    const admin = document.querySelector(".item-admin");
    const exit = document.querySelector(".nav-icon");
    app.style.display = "none";
    admin.style.display = "none";
    exit.style.display = "none";
    icon.style.display = "inline-block";
  };
  return (
    <BrowserRouter>
      <div className="header">
        <MenuFoldOutlined onClick={handleClickShow} className="icon" />
        <div className="nav">
          <CloseOutlined
            onClick={handleExit}
            className="header-item nav-icon"
          />
          <Link className="header-item item-app" to="/">
            App
          </Link>
          <Link className="header-item item-admin" to="/searchWeather">
            Admin
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/searchWeather" element={<SearchWeather />} />
      </Routes>
    </BrowserRouter>
  );
}
