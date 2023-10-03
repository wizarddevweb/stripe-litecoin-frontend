import React, { useEffect } from "react"; 
import { loadStripe } from "@stripe/stripe-js"; 
import { useParams } from "react-router-dom";

function RedirectToStripe() { 
  const params = useParams();
  useEffect(()=>{
    redirect();
  },[])

  const redirect = async ()=> {
    const stripe = await loadStripe("pk_test_51MPBIpDBAsfaAFN8HVzCNsCMfVSSQalT0bkV8whQ7wKU3YEO2epTSJN6H71gmEUbgtjLZnv61ivJaoKDH20r51nS00m5Z2EBdl"); 
    const result = stripe.redirectToCheckout({ 
     sessionId: params.id, 
    });  

 
    if (result.error) { 
      console.log(result.error); 
    } 
  }
  return ( 
    <> 
      <h2>Redirecting...</h2>
    </> 
  ); 
} 
 
export default RedirectToStripe; 
