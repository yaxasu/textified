"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { BounceLoader } from "react-spinners";

type Props = { isPro: boolean };

const SubscriptionButton = (props: Props) => {
  const [loading, setLoading] = React.useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Button
        disabled={loading}
        onClick={handleSubscription}
        className="hover:cursor-pointer hover:text-neutral-400 transition"
      >
        {props.isPro ? (
          "Manage Subscriptions"
        ) : loading ? (
          <BounceLoader color="#fff" size={20} />
        ) : (
          "Get Pro"
        )}
      </Button>
    </div>
  );
};

export default SubscriptionButton;
