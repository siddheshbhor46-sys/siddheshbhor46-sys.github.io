import React from "react";

export default function Wishlist({ wishlist, incrementQuantity }) {
  return (
    <div className="container mt-4">
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-muted">No items in wishlist yet.</p>
      ) : (
        <ul className="list-group">
          {wishlist.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {item.name} - ₹{item.price}
              <button
                className="btn btn-sm btn-success"
                onClick={() => incrementQuantity(item.id)}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
