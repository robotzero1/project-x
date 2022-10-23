import React, { useState, useEffect } from "react";
import { handleLogin, isLoggedIn } from "../services/auth"
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  signupContent,
  stripeLabel,
  stripeFormCardJoin,
  stripeFormButton,
  stripeCardError,
  spinner,
  stripeJoinStatus,
} from "../components/layout.module.css";

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "red",
    },
  },
};

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [pendingStatus, setpendingStatus] = useState("");
  const [conpleteStatus, setCompleteStatus] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [postal, setPostal] = useState("");
  const [pass, setPass] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Add to pending...
  const handleJoinPending = () => {
    const myRequest = new Request(
      "https://f.co.uk/member/stripe-join.php",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputmembername: name,
          inputmemberemail: email,
          inputmemberpass: pass,
          paymentintentid: paymentIntentId,
        }),
      }
    );

    fetch(myRequest)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log("handleJoinPending: " + data);
        if (data.hasOwnProperty("error")) {
          console.log(data.error);
        } else {
          setpendingStatus("Creating new member account. This can take a few minutes.");
          const checkMemberTable = setInterval(() => {
             checkJoinSuccess(checkMemberTable);
          }, 10000);
        }
      })
      .catch((error) => console.log(error));

    return false;
  };

  // final step to create user in database
  const checkJoinSuccess = (checkMemberTable) => {
    const myRequest = new Request(
      "https://f.co.uk/member/stripe-join.php",
      {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inputmembername: name,
          inputmemberemail: email,
          inputmemberpass: pass,
          paymentintentid: paymentIntentId,
        }),
      }
    );

    fetch(myRequest)
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        console.log("checkMemberTable: " + data);
        if (data.hasOwnProperty("error")) {
          console.log(data.error);
        }
        if (data.hasOwnProperty("status")) {
          console.log(data.status);
          if (data.status == "complete") {
            setCompleteStatus("Account Created. Please log in above.");
            clearInterval(checkMemberTable);
            handleLogin({inputuser: email, inputpass: pass})
          }
        }
      })
      .catch((error) => console.log(error));

    return false;
  };

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("https://f.co.uk/member/stripe-create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      });
  }, []);


  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const cardElement = elements.getElement(CardNumberElement);

    const payload = await stripe.confirmCardPayment(clientSecret, {

      receipt_email: email,
      payment_method: {
        type: 'card',
        card: cardElement,
        billing_details: {
          name: name,
          email: email,
          address: {
            postal_code: postal,
          },
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setPaymentStatus("Payment success!");
      setSucceeded(true);
      handleJoinPending();
    }
  };

  return (
    <div className={signupContent}>
      <h2>Join Online</h2>
      <p>Buy membership with a credit or debit card</p>
      <form id="payment-form" className={stripeFormCardJoin} onSubmit={handleSubmit}>
        <label className={stripeLabel}>
          Full Name
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />
        </label>
        <label className={stripeLabel}>
          Email Address
          <input
            type="email"
            autocomplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
          />
        </label>
        <label className={stripeLabel}>
          Create Password
          <input
            type="password"
            required
            autocomplete="new-password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Create a password"
          />
        </label>
        <p>Payments are handled by a secure payments provider. Be Local does not have access to your card details.</p>
        <label className={stripeLabel} htmlFor="cardNumber">
          Card Number
           <CardNumberElement onChange={handleChange} id="cardNumber" options={ELEMENT_OPTIONS} />
        </label>
        <label className={stripeLabel} style={{gridColumn: "1 / span 1"}} htmlFor="expiry">
          Card Expiration
          <CardExpiryElement onChange={handleChange} id="expiry" options={ELEMENT_OPTIONS} />
        </label>
        <label className={stripeLabel} style={{gridColumn: "2 / span 1"}} htmlFor="cvc">
          CVC
          <CardCvcElement onChange={handleChange} id="cvc" options={ELEMENT_OPTIONS} />
        </label>
        <label className={stripeLabel} htmlFor="postal">
          Postal Code
          <input
            id="postal"
            required
            placeholder="12345"
            value={postal}
            onChange={(e) => {
              setPostal(e.target.value);
            }}
          />
        </label>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className={stripeCardError} role="alert">
            {error}
          </div>
        )}
        <button className={stripeFormButton} type="submit" disabled={processing || disabled || succeeded}>
        <span id="button-text">
          {processing ? (
            <div className={spinner} id="spinner"></div>
          ) : (
            "Buy Now"
          )}
        </span>
        </button>

        {/* Show a success message upon completion */}
        <div className={stripeJoinStatus}>{paymentStatus}</div>
        <div className={stripeJoinStatus}>{pendingStatus}</div>
        <div className={stripeJoinStatus}>{conpleteStatus}</div>
      </form>
      <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 150 34"
            width="120px"
            style={{marginLeft:"5px"}}
          >

            <title>Powered by Stripe</title>
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M146,0H3.73A3.73,3.73,0,0,0,0,3.73V30.27A3.73,3.73,0,0,0,3.73,34H146a4,4,0,0,0,4-4V4A4,4,0,0,0,146,0Zm3,30a3,3,0,0,1-3,3H3.73A2.74,2.74,0,0,1,1,30.27V3.73A2.74,2.74,0,0,1,3.73,1H146a3,3,0,0,1,3,3Z"

            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M17.07,11.24h-4.3V22h1.92V17.84h2.38c2.4,0,3.9-1.16,3.9-3.3S19.47,11.24,17.07,11.24Zm-.1,5H14.69v-3.3H17c1.38,0,2.11.59,2.11,1.65S18.35,16.19,17,16.19Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M25.1,14a3.77,3.77,0,0,0-3.8,4.09,3.81,3.81,0,1,0,7.59,0A3.76,3.76,0,0,0,25.1,14Zm0,6.67c-1.22,0-2-1-2-2.58s.76-2.58,2-2.58,2,1,2,2.58S26.31,20.66,25.1,20.66Z"
            />
            <polygon
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              points="36.78 19.35 35.37 14.13 33.89 14.13 32.49 19.35 31.07 14.13 29.22 14.13 31.59 22.01 33.15 22.01 34.59 16.85 36.03 22.01 37.59 22.01 39.96 14.13 38.18 14.13 36.78 19.35"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M44,14a3.83,3.83,0,0,0-3.75,4.09,3.79,3.79,0,0,0,3.83,4.09A3.47,3.47,0,0,0,47.49,20L46,19.38a1.78,1.78,0,0,1-1.83,1.26A2.12,2.12,0,0,1,42,18.47h5.52v-.6C47.54,15.71,46.32,14,44,14Zm-1.93,3.13A1.92,1.92,0,0,1,44,15.5a1.56,1.56,0,0,1,1.69,1.62Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M50.69,15.3V14.13h-1.8V22h1.8V17.87a1.89,1.89,0,0,1,2-2,4.68,4.68,0,0,1,.66,0v-1.8c-.14,0-.3,0-.51,0A2.29,2.29,0,0,0,50.69,15.3Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M57.48,14a3.83,3.83,0,0,0-3.75,4.09,3.79,3.79,0,0,0,3.83,4.09A3.47,3.47,0,0,0,60.93,20l-1.54-.59a1.78,1.78,0,0,1-1.83,1.26,2.12,2.12,0,0,1-2.1-2.17H61v-.6C61,15.71,59.76,14,57.48,14Zm-1.93,3.13a1.92,1.92,0,0,1,1.92-1.62,1.56,1.56,0,0,1,1.69,1.62Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M67.56,15a2.85,2.85,0,0,0-2.26-1c-2.21,0-3.47,1.85-3.47,4.09s1.26,4.09,3.47,4.09a2.82,2.82,0,0,0,2.26-1V22h1.8V11.24h-1.8Zm0,3.35a2,2,0,0,1-2,2.28c-1.31,0-2-1-2-2.52s.7-2.52,2-2.52c1.11,0,2,.81,2,2.29Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M79.31,14A2.88,2.88,0,0,0,77,15V11.24h-1.8V22H77v-.83a2.86,2.86,0,0,0,2.27,1c2.2,0,3.46-1.86,3.46-4.09S81.51,14,79.31,14ZM79,20.6a2,2,0,0,1-2-2.28v-.47c0-1.48.84-2.29,2-2.29,1.3,0,2,1,2,2.52S80.25,20.6,79,20.6Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M86.93,19.66,85,14.13H83.1L86,21.72l-.3.74a1,1,0,0,1-1.14.79,4.12,4.12,0,0,1-.6,0v1.51a4.62,4.62,0,0,0,.73.05,2.67,2.67,0,0,0,2.78-2l3.24-8.62H88.82Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M125,12.43a3,3,0,0,0-2.13.87l-.14-.69h-2.39V25.53l2.72-.59V21.81a3,3,0,0,0,1.93.7c1.94,0,3.72-1.59,3.72-5.11C128.71,14.18,126.91,12.43,125,12.43Zm-.65,7.63a1.61,1.61,0,0,1-1.28-.52l0-4.11a1.64,1.64,0,0,1,1.3-.55c1,0,1.68,1.13,1.68,2.58S125.36,20.06,124.35,20.06Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M133.73,12.43c-2.62,0-4.21,2.26-4.21,5.11,0,3.37,1.88,5.08,4.56,5.08a6.12,6.12,0,0,0,3-.73V19.64a5.79,5.79,0,0,1-2.7.62c-1.08,0-2-.39-2.14-1.7h5.38c0-.15,0-.74,0-1C137.71,14.69,136.35,12.43,133.73,12.43Zm-1.47,4.07c0-1.26.77-1.79,1.45-1.79s1.4.53,1.4,1.79Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M113,13.36l-.17-.82h-2.32v9.71h2.68V15.67a1.87,1.87,0,0,1,2.05-.58V12.54A1.8,1.8,0,0,0,113,13.36Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M99.46,15.46c0-.44.36-.61.93-.61a5.9,5.9,0,0,1,2.7.72V12.94a7,7,0,0,0-2.7-.51c-2.21,0-3.68,1.18-3.68,3.16,0,3.1,4.14,2.6,4.14,3.93,0,.52-.44.69-1,.69a6.78,6.78,0,0,1-3-.9V22a7.38,7.38,0,0,0,3,.64c2.26,0,3.82-1.15,3.82-3.16C103.62,16.12,99.46,16.72,99.46,15.46Z"
            />
            <path
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              d="M107.28,10.24l-2.65.58v8.93a2.77,2.77,0,0,0,2.82,2.87,4.16,4.16,0,0,0,1.91-.37V20c-.35.15-2.06.66-2.06-1V15h2.06V12.66h-2.06Z"
            />
            <polygon
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              points="116.25 11.7 118.98 11.13 118.98 8.97 116.25 9.54 116.25 11.7"
            />
            <rect
              class="cls-1"
              fill="rgba(255, 255, 255, 1)"
              x="116.25"
              y="12.61"
              width="2.73"
              height="9.64"
            />
          </svg>
    </div>
  );
};
export default CheckoutForm;
