import React from "react";
import Router from "next/router";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useUserBasket } from "@/lib/tq/baskets/queries";
import { Button } from "@/components/mui";

const StripeButton = () => {
  const { user, isLoading, error } = useUser();
  const { data: basket } = useUserBasket();
  if(isLoading) return null;
  console.log('start stripebutton, final error', user?.email, isLoading, error);
  
  const basketTotal = basket.items.reduce((total, item) => {
    console.log(total, item);
    return total + item.price;
  }, 0);
  console.log(basket);
  console.log(basketTotal);
  const onToken = async (token) => {
    console.log("token", token);
    const {
      email,
      card: {
        name
      },
      id:tk
    } = token;
    try {
      const result = await axios.post("/api/payments", {
        name,
        email,
        token:tk,
        amount: basketTotal,
      });
      console.log('payment api result', result);
      Router.push({
        pathname: '/thank-you',
        query: {
          receiptURL: result.data.receiptURL,
        }
      })
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StripeCheckout
      name="Eclectic Shop"
      description="The widest ranging designs for sale" 
      amount={basketTotal} // pennies
      currency="GBP"
      stripeKey={process.env.STRIPE_PUBLIC_KEY}
      locale="en"
      email={user.email}
      shippingAddress
      billingAddress={false}
      zipCode={false}
      token={onToken}
    >
      <Button variant="contained">Pay with Stripe</Button>
    </StripeCheckout>
  );
};

export default StripeButton;