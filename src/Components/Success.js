import React from "react";

export default function Success() {
  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">🎉 Thank You for Your Order!</h2>
      <p className="lead">Your payment has been processed successfully.</p>
      <p>We’ll send you a confirmation email with your order details shortly.</p>
      <hr />
      <button
        className="btn btn-primary mt-3"
        onClick={() => window.location.href = "/"}
      >
        Continue Shopping
      </button>
    </div>
  );
}
