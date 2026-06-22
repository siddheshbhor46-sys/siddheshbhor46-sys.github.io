import React from "react";
import { toast } from "react-toastify";

export default function ProductGrid({
  products,
  incrementQuantity,
  searchTerm,
  selectedCategory,
  sortOption,
  wishlist,
  setWishlist,
}) {
  // Filtering + sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      if (sortOption === "newest") return b.id - a.id;
      return 0;
    });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center mt-4">
        <h5 className="text-danger">No products found</h5>
        <p className="text-muted">Try searching with a different name.</p>
      </div>
    );
  }

  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      toast.info("Removed from Wishlist");
    } else {
      setWishlist([...wishlist, product]);
      toast.success("Added to Wishlist");
    }
  };

  return (
    <div className="row">
      {filteredProducts.map((product) => (
        <div key={product.id} className="col-md-3 mb-4">
          <div className="card shadow-sm h-100 product-card">
            <div className="product-img-container">
              <img
                src={product.image}
                className="card-img-top product-image"
                alt={product.name}
              />
            </div>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text text-success fw-bold">₹{product.price}</p>
              <p className="text-warning">⭐⭐⭐⭐☆</p>

              {/* Add to Cart button */}
              <button
                className={`btn btn-warning w-100 mt-2 add-to-cart-btn ${
                  product.quantity > 0 ? "added" : ""
                }`}
                onClick={() => {
                  incrementQuantity(product.id);
                  toast.success(`🛒 ${product.name} added to cart!`);
                }}
              >
                {product.quantity > 0 ? "Added ✓" : "Add to Cart"}
              </button>

              {/* Show quantity if added */}
              {product.quantity > 0 && (
                <div className="text-success fw-bold mt-1 text-center">
                  In Cart: {product.quantity}
                </div>
              )}

              {/* Wishlist toggle */}
              <button
                className={`btn btn-sm mt-3 ${
                  wishlist.find((item) => item.id === product.id)
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                onClick={() => toggleWishlist(product)}
              >
                <i className="bi bi-heart-fill"></i>{" "}
                {wishlist.find((item) => item.id === product.id)
                  ? "Remove Wishlist"
                  : "Add Wishlist"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
