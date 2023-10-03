import React, { useState } from "react";
import { ReactDOM } from "react-dom";
import { withRouter } from "react-router";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Switch from "react-switch";
import useStore from "../store";
import {
  CardElement,
  Elements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

const Landing = (props) => {
  const navigate = useNavigate();
  const Fiat = () => navigate("/stripe");
  const Crypto = () => navigate("/litecoin");

  const isEnglish = useStore((state) => state.isEnglish);
  const setEnglish = useStore((state) => state.setEnglish);
  return (
    <div className="landing">
      <div className="language">
        <Switch onChange={(val) => setEnglish(val)} checked={isEnglish} />
        <span>English/Spanish</span>
      </div>
      <div>
        <button className="pay-btn crypto" onClick={Crypto}>
          Crypto
        </button>
        <button className=" pay-btn fiat" onClick={Fiat}>
          Fiat
        </button>
      </div>
    </div>
  );
};

export default Landing;
