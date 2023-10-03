import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./stripepayment.css";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { ClipLoader } from "react-spinners";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PostalCodeElement,
  Elements,
  CardElement,
  useStripe,
  useElements,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import useStore from "../store";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const isEnglish = useStore((state) => state.isEnglish);
  const [loading, setLoading] = useState(false);
  const [isShowResult, setIsShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }
    var card = elements.getElement(CardElement);
    setLoading(true);
    const { error, token } = await stripe.createToken(card);

    if (error) {
      console.error("Error creating token:", error);
      setLoading(false);
      if (isEnglish) toast.error("payment failed");
      else toast.error("pago fallido");
    } else {
      console.log("Token created:", token);
    }

    axios
      .post("http://localhost:8000/api/fiat/charge", {
        token: token.id,
      })
      .then(({ data }) => {
        const { charge } = data;
        console.log(charge);
        if (isEnglish) toast.success("sucessfully paid");
        else toast.success("pagado exitosamente");
        setLoading(false);
        setResult(charge);
        setIsShowResult(true);

        //orderComplete(charge);
      })
      .catch((err) => {
        if (isEnglish) toast.error("payment failed");
        else toast.error("pago fallido");
        setLoading(false);
      });
  };
  const formatAddress = (address, first = 3, last = 3) => {
    return (
      address?.substring(0, first) +
      "..." +
      address?.substring(address?.length - last)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isShowResult ? (
        <div
          style={{
            width: "300px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="">
          <CardElement
            className="card"
            options={{
              style: {
                base: {
                  color: "red",
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSmoothing: "antialiased",
                  fontSize: "14px",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a",
                },
              },
            }}
          />
          <button
            className="btn-pay"
            type="submit"
            disabled={!stripe || !elements}>
            {loading ? (
              <ClipLoader size={15} color={"#ffffff"} loading={loading} />
            ) : null}
            {loading
              ? isEnglish
                ? "Loading..."
                : "Cargando"
              : isEnglish
              ? "Pay"
              : "Pagar"}
          </button>
          <ToastContainer />
        </div>
      ) : (
        <div className="sr-result d-flex flex-column ">
          <div className="info justify-content-center">
            <h3>{isEnglish ? "Compelted" : "Terminada"}</h3>
          </div>
          <div className="info">
            <span>{isEnglish ? "Id" : ""} </span>
            <span>{formatAddress(result.balance_transaction)}</span>
          </div>
          <div className="info">
            <span>{isEnglish ? "amount" : "cantidad"} </span>
            <span>{result.amount}</span>
          </div>
          <div className="info">
            <span>{isEnglish ? "currency" : "divisa"} </span>
            <span>{result.currency}</span>
          </div>
          <div className="info">
            <span>{isEnglish ? "card" : "tarjeta"} </span>
            <span>{result.source.address_zip}</span>
          </div>

          <div className="info m-auto">
            <a href="http://globalboy.llc" className="btn btn-primary backbtn">
              {isEnglish ? "Back" : "Atrás"}
            </a>
          </div>
        </div>
      )}
    </form>
  );
};

const stripePromise = loadStripe(
  "pk_test_51N369fLRiwc1SyEZJyxlNNau01jIkTpMoJpDjhkjwa1e0QjZzXn0oHwR453mwCtnnWdsF7wFUun9dd4EZeuFw1uH00kbskKpR6"
);

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default App;
