import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    const data = await response.json();
    console.log(data)
    if (data.url) {
      window.location.href = data.url;
    }
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    console.log("query params :", query.toString());

    if(query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if(query.get("canceled")) {
      setMessage("Order canceled.");
    }

  }, []);

  return (
    <>
    {message ? (
      <section>
        <h2>{message}</h2>
      </section>
    ) : (
      <section>
        <div className="product">
          <img
            src="https://i.imgur.com/EHyR2nP.png"
            alt="The cover of Stubborn Attachments"
          />
          <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
          </div>
        </div>
          <button onClick={handleCheckout} type="submit">Checkout</button>
      </section>
    )}
      
     
    </>
  );
}
