import React from "react";
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
export default function ShowOrder({ order, currentUser }) {
  const [timeLeft, setTimeLeft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      {timeLeft} seconds until order expires
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51MYuGQHUL4MbTdC8P3Nv02kZxYloqopPyQSlwPR1uIlP8VDU3cCjozdhhS89vcEEBb04dH2rZ22aE9tkKJz49Ga900Th7CsKYg"
        amount={order.ticket.price * 100}
        currency="GBP"
        email={currentUser.email}
      />
      {errors}
    </div>
  );
}

ShowOrder.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};
