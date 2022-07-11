import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Home } from "./Pages/Home/Index";
import { RestaurantDetailPage } from "./Pages/Detail/Index";
import { UpdatePage } from "./Pages/UpdatePage/Index";
import { DeleteFlag } from "./Pages/DeleteFlag/Index";
function App() {
  return (
    <React.Fragment>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/undo" element={<DeleteFlag />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
        <Route path="/restaurants/:id/update" element={<UpdatePage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
