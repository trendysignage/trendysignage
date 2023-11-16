import React, { useEffect, useState } from "react";
import { vendorProfile } from "../../../utils/api";

export default function Subscription() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    async function getVendorProfile() {
      try {
        const response = await vendorProfile();
        const subscription = response?.data?.data?.subscription;

        if (subscription) {
          const start = new Date(subscription.startDate);
          const end = new Date(subscription.endDate);

          setStartDate(start);
          setEndDate(end);
        }
      } catch (error) {
        console.error("Error fetching vendor profile:", error);
      }
    }

    getVendorProfile();
  }, []);

  const daysRemaining =
    startDate && endDate
      ? Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
      : null;

  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap mb-4">
        <div>
          <h1 className="mb-1">My Subscriptions</h1>
          <p className="three-layout-paragrapgh">
            Choose the best plan for you.
          </p>
        </div>
      </div>
      <div className="my-subcription-card">
        <div className="d-flex align-items-center">
          <div className="mr-5">
            <h3>Start Date</h3>
            <p>{startDate ? startDate.toLocaleDateString() : "Loading..."}</p>
          </div>
          <div>
            <h3>End Date</h3>
            <p>{endDate ? endDate.toLocaleDateString() : "Loading..."}</p>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <h5 className="m-0">Your subscription expires in:</h5>{" "}
          <p className="mb-0 ml-3">
            {daysRemaining !== null
              ? `${daysRemaining} Days`
              : "Calculating..."}
          </p>
        </div>
      </div>
    </>
  );
}
