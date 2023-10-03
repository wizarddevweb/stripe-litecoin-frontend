import React, { useContext, createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StripePayment from "./components/StripePayment";
import CreateToken from "./components/createtoken";
import Landing from "./components/landing";
import Success from "./components/Success";
import Litecoin from "./components/Litecoin";
import Cancel from "./components/Cancel";
import StripePage from "./components/StripePayment";
import RedirecToStripe from "./components/RedirectToStripe";
import Switch from "react-switch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/confirm" element={<Success />} />
        <Route path="/litecoin" element={<Litecoin />} />
        <Route path="/stripe" element={<StripePage />} />
        <Route path="/redirect/:id" element={<RedirecToStripe />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
