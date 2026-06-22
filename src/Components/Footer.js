import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Footer(props) {
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0); // ✅ persists across renders

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY.current) {
        // scrolling down → hide
        setHidden(true);
      } else {
        // scrolling up → show
        setHidden(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`footer fixed-bottom shadow-sm d-flex justify-content-between align-items-center p-1 px-2 ${
        hidden ? "footer-hidden" : ""
      }`}
    >
      <button className="btn btn-sm btn-outline-danger" onClick={props.resetQuantity}>
        <i className="bi bi-arrow-counterclockwise"></i> Reset
      </button>

      <div className="fw-bold text-dark small">
        Total: ₹{props.totalAmount}
      </div>

      <button
        className="btn btn-sm btn-warning"
        onClick={() => {
          if (props.totalAmount > 0) {
            navigate("/checkout");
          } else {
            toast.error("❌ Your cart is empty!");
          }
        }}
      >
        <i className="bi bi-credit-card"></i> Pay Now
      </button>
    </footer>
  );
}
