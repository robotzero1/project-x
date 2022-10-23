import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/stripe-inpage-payment";
import Layout from "../components/layout";
import HeaderHamburger from "../components/header-hamburger";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// loadStripe is initialized with your real test publishable API key.
const promise = loadStripe(
  "pk_test_51IxVtkEsNAJdMMmsH80HVQ9eUtF1ft8ieGiGHUIYxcvC1yRWkjHtaT3Unl0mqXgXNDhrZp1htWifs5MrwmDszhvB00BFzQaHxx"
);

const Pay = () => {
  return (
    <Layout>
      <div>
        <HeaderHamburger menuType="back" parentLink="join" />
        <div>
          <StaticImage
            src="../images/temp-credit-card.jpg"
            alt="Credit Card"
            placeholder="dominantColor"
          />
        </div>

        <div className="App">
          <Elements stripe={promise}>
            <CheckoutForm />
          </Elements>

        </div>
      </div>
    </Layout>
  );
};
export default Pay;
