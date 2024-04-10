import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import useRequest from "../hooks/use-request";
import Router from "next/router";

export default function CheckoutForm({order}) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the ConfirmationToken using the details collected by the Payment Element
    // and additional shipping information
    const { error, confirmationToken } = await stripe.createConfirmationToken({
      elements,
      params: {
        shipping: {
          name: "Jenny Rosen",
          address: {
            line1: "1234 Main Street",
            city: "San Francisco",
            state: "CA",
            country: "US",
            postal_code: "94111",
          },
        },
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // creating the ConfirmationToken. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
      return;
    }

    // Create the PaymentIntent
    // const res = await fetch("/create-confirm-intent", {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify({
    //     confirmationTokenId: confirmationToken.id,
    //   }),
    // });

    const res = await doRequest({ token: confirmationToken.id });

    //const data = await res.json();

    // Handle any next actions or errors. See the Handle any next actions step for implementation.
    //handleServerResponse(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        Submit
      </button>
      {errorMessage && <div>{errorMessage}</div>}
      {errors}
    </form>
    
  );
}
