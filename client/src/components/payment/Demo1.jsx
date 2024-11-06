import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


// import "./App.css";
import CheckoutDemo from "./CheckoutDemo";
import CompleteDemo from "./CompleteDemo";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51QHQEfFKk5rLKhTeROa9tJjWIhDNMfl0qFeUDmcqRBpkB1cyFdOBc2DGvvwxUGZY75jabnYf3rOlKAdgpradjefq00YfU6ibjL");

export default function Demo1() {
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8005/v1/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <Router>
      <div className="App">
        {clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <Routes>
              <Route path="/checkout" element={<CheckoutDemo dpmCheckerLink={dpmCheckerLink}/>} />
              <Route path="/complete" element={<CompleteDemo />} />
            </Routes>
          </Elements>
        )}
      </div>
    </Router>
  );
}