import React, { useEffect, useState, useRef } from "react";
import "./litecoin.css";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import useStore from "../store";

function Litecoin() {
  const receiver = "ltc1qxv6dpxd50ttjf4vwmjhdrpq09n6jr3n32g92ry";
  const [sender, setSender] = useState("");
  const isEnglish = useStore((state) => state.isEnglish);
  const navigate = useNavigate();
  const [rate, setRate] = useState(0);
  const [USD, setUSD] = useState(0);
  const [amount, setAmount] = useState(0);
  const effectCalled = useRef(false);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const confirmPayment = (e) => {
    if (!sender) {
      toast.error(
        `${
          isEnglish
            ? "please type your wallet address"
            : "por favor escriba la dirección de su billetera"
        }`
      );
      return;
    }

    let pay_time = new Date();

    localStorage.setItem("paid_date", pay_time.toISOString());

    setLoading(true);
    setDisabled(true);

    setTimeout(() => {
      axios
        .post("http://localhost:8000/api/litecoin/confirm", { sender })
        .then(({ data }) => {
          let confirmed_date = data.txs[0].confirmed;
          console.log(confirmed_date, localStorage.getItem("paid_date"));
          if (confirmed_date) {
            if (confirmed_date > localStorage.getItem("paid_date")) {
              toast.error(
                `${isEnglish ? "sucessfully paid" : "pagado exitosamente"}`
              );
              setLoading(false);
              navigate("/confirm");
            } else {
              toast.error(`${isEnglish ? "payment failed" : "pago fallido"}`);
              setLoading(false);
              setDisabled(false);
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          setDisabled(false);
          toast.error(err);
        });
    }, 3000);
  };

  const formatAddress = (address, first = 15, last = 6) => {
    return (
      address?.substring(0, first) +
      "..." +
      address?.substring(address?.length - last)
    );
  };

  useEffect(() => {
    if (!effectCalled.current) {
      effectCalled.current = true;
      axios
        .get("http://localhost:8000/api/litecoin/getRate")
        .then((res) => {
          let amount = 1;
          let rate = res.data.toFixed(2);
          let usd = amount * rate;
          setAmount(amount);
          setRate(rate);
          setUSD(usd);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="checkoutForm">
      <img src="./logo.png" className="logo" alt="Logo" />
      <h3 style={{ marginTop: "20px" }}>
        {isEnglish ? "Confirm payment" : "Confirmar pago"}
      </h3>
      <div id="checkout">
        <div className="info">
          <span>{isEnglish ? "Amount" : "Cantidad"}</span>
          <span>{amount} LTC</span>
        </div>
        <div className="info">
          <span>{isEnglish ? "Exchange Rate" : "Tipo de cambio"} </span>
          <span>{rate} USD</span>
        </div>
        <div className="info">
          <span>{isEnglish ? "USD Equivalent" : "Equivalente en USD"}</span>
          <span>{USD} USD</span>
        </div>
        <div className="info">
          <span>{isEnglish ? "They receive" : "Ellos recibieron"}</span>
          <span>{amount} LTC</span>
        </div>
      </div>
      <hr />
      <div id="Fee">
        <div className="info">
          <span>{isEnglish ? "Fees" : "Honorarios"}</span>
          <span>{isEnglish ? "Free" : "Honorarios"}</span>
        </div>
        <div className="info">
          <span>{isEnglish ? "Network fee" : "Tarifa de red"}</span>
          <span>$1</span>
        </div>
        <div className="info">
          <span>{isEnglish ? "Total" : "Total"}</span>
          <span>{amount} LTC</span>
        </div>
      </div>
      <div id="walletAddress">
        <span>
          {isEnglish
            ? "Please paste your wallet address"
            : "Por favor, pegue la dirección de su billetera"}
        </span>
        <input
          type="text"
          value={sender}
          onChange={(e) => setSender(e.target.value)}
        />
      </div>
      <div className="senderAddress">
        <CopyToClipboard
          text={receiver}
          onCopy={() =>
            toast.success(`${isEnglish ? "copied" : "copiada"}`, {
              autoClose: true,
            })
          }
        >
          <div className="info">
            <span id="reduced">{formatAddress(receiver)}</span>
            <div className="clip-svg">
              <svg viewBox="0 0 20 50" focusable="false">
                <path
                  d="M5.25 12.5C4.8375 12.5 4.4845 12.3533 4.191 12.0597C3.897 11.7657 3.75 11.4125 3.75 11V2C3.75 1.5875 3.897 1.23425 4.191 0.94025C4.4845 0.64675 4.8375 0.5 5.25 0.5H12C12.4125 0.5 12.7657 0.64675 13.0597 0.94025C13.3533 1.23425 13.5 1.5875 13.5 2V11C13.5 11.4125 13.3533 11.7657 13.0597 12.0597C12.7657 12.3533 12.4125 12.5 12 12.5H5.25ZM5.25 11H12V2H5.25V11ZM2.25 15.5C1.8375 15.5 1.48425 15.3533 1.19025 15.0597C0.89675 14.7657 0.75 14.4125 0.75 14V4.25C0.75 4.0375 0.822 3.85925 0.966 3.71525C1.1095 3.57175 1.2875 3.5 1.5 3.5C1.7125 3.5 1.89075 3.57175 2.03475 3.71525C2.17825 3.85925 2.25 4.0375 2.25 4.25V14H9.75C9.9625 14 10.1407 14.072 10.2847 14.216C10.4283 14.3595 10.5 14.5375 10.5 14.75C10.5 14.9625 10.4283 15.1405 10.2847 15.284C10.1407 15.428 9.9625 15.5 9.75 15.5H2.25Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
        </CopyToClipboard>
      </div>

      <div id="btn">
        <button
          id="litecoin_btn"
          onClick={(e) => confirmPayment()}
          disabled={disabled}
        >
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
      </div>
      <ToastContainer />
    </div>
  );
}

export default Litecoin;
