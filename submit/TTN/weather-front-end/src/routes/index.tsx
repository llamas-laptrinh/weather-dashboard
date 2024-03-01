import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NotFoundPage from "../pages/NotfoundPage/index copy";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import WeatherPage from "../pages/WeatherPage";
import SearchResults from "../pages/SearchResults";
import SearchHistory from "../pages/SearchHistory";
import Authenticate from "../pages/Authenticate";
import Regist from "../pages/Regist";
const Index: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Outlet />}> */}
        <Route path="/" element={<HomePage />}>
          <Route index element={<WeatherPage />} />
          <Route path="/searchHistory/" element={<SearchHistory />} />
          <Route path="/search/" element={<SearchResults />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/authenticate/" element={<Authenticate />}>
          <Route path="login" element={<Login />} />
          <Route path="regist" element={<Regist />} />
        </Route>
        {/* <Route path="Regist" element={<SearchResults />} /> */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
};

export default Index;

