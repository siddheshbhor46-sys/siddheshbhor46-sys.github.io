import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Checkout({ productList, totalAmount }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
    paymentMethod: ""   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (productList.filter(p => p.quantity > 0).length === 0) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger">Your cart is empty!</h4>
        <p className="text-muted">Add some products before proceeding to checkout.</p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone || !formData.paymentMethod) {
      toast.error("❌ Please fill all required fields");
      return;
    }

    if (formData.paymentMethod === "cod") {
      toast.success("✅ Order placed with Cash on Delivery!");
    } else if (formData.paymentMethod === "upi") {
      if (!formData.upiId) {
        toast.error("❌ Please enter your UPI ID");
        return;
      }
      toast.success("✅ Payment successful via UPI!");
    } else if (formData.paymentMethod === "card") {
      if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
        toast.error("❌ Please enter complete card details");
        return;
      }
      toast.success("✅ Payment successful via Credit/Debit Card!");
    }

    setTimeout(() => {
      window.location.href = "/success";
    }, 1500);
  };

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>
      <h5>Order Summary</h5>
      <ul className="list-group mb-3">
        {productList.filter(p => p.quantity > 0).map(p => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            {p.name} x {p.quantity}
            <span>₹{p.quantity * p.price}</span>
          </li>
        ))}
      </ul>
      <h4>Total: ₹{totalAmount}</h4>

      <form className="mt-4" onSubmit={handleSubmit}>
        <h5>Shipping Details</h5>
        <input type="text" name="name" placeholder="Full Name" className="form-control mb-2" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" className="form-control mb-2" onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone Number" className="form-control mb-2" onChange={handleChange} />

        <h5>Payment Method</h5>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="paymentMethod" value="card" onChange={handleChange} />
          <label className="form-check-label">Credit/Debit Card</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="paymentMethod" value="upi" onChange={handleChange} />
          <label className="form-check-label">UPI</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="paymentMethod" value="cod" onChange={handleChange} />
          <label className="form-check-label">Cash on Delivery</label>
        </div>


        {formData.paymentMethod === "card" && (
          <>
            <input type="text" name="cardNumber" placeholder="Card Number" className="form-control mb-2" onChange={handleChange} />
            <input type="text" name="expiry" placeholder="Expiry (MM/YY)" className="form-control mb-2" onChange={handleChange} />
            <input type="text" name="cvv" placeholder="CVV" className="form-control mb-2" onChange={handleChange} />
          </>
        )}


        {formData.paymentMethod === "upi" && (
          <input type="text" name="upiId" placeholder="Enter UPI ID" className="form-control mb-2" onChange={handleChange} />
        )}

        <button type="submit" className="btn btn-success w-100 mt-3">
          Place Order
        </button>
      </form>
    </div>
  );
}
