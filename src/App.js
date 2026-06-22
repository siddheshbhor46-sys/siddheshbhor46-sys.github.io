import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import ProductGrid from "./Components/ProductGrid";
import Checkout from "./Components/Checkout";
import Success from "./Components/Success";
import Footer from "./Components/Footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";   //  import toast
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import iphone14 from "./assets/iphone14.jpg";
import iPhone15 from "./assets/iPhone15.jpg";
import AirPodcase from "./assets/AirPodcase.jpg";
import iphone16 from "./assets/iphone16.jpg";
import Macbookair from "./assets/Macbookair.jpg";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Wishlist from "./Components/Wishlist";

function App() {
  const initialProducts = [
    { id: 1, category: "Mobiles", name: "iPhone 14 Pro Max", price: 89999, quantity: 0, image: iphone14 },
    { id: 2, category: "Mobiles", name: "iPhone 15 Pro Max", price: 99999, quantity: 0, image: iPhone15 },
    { id: 3, category: "Accessories", name: "AirPods Case", price: 1999, quantity: 0, image: AirPodcase },
    { id: 4, category: "Mobiles", name: "iPhone16 Pro Max", price: 129999, quantity: 0, image: iphone16 },
    { id: 5, category: "Laptops", name: "MacBook Air", price: 99999, quantity: 0, image: Macbookair },
  ];

  // Restore cart quantities onto catalog
  const [productList, setProductList] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      return initialProducts.map(p => {
        const saved = savedCart.find(c => c.id === p.id);
        return saved ? { ...p, quantity: saved.quantity } : p;
      });
    }
    return initialProducts;
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    return savedWishlist || [];
  });

  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    return savedUser || null;
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");

  // Save only cart quantities
  useEffect(() => {
    const cartData = productList.map(p => ({ id: p.id, quantity: p.quantity }));
    localStorage.setItem("cart", JSON.stringify(cartData));
  }, [productList]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Cart logic
  const incrementQuantity = (id) => {
    setProductList(
      productList.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
    setTotalAmount(totalAmount + productList.find((p) => p.id === id).price);
  };

  const decrementQuantity = (id) => {
    const product = productList.find((p) => p.id === id);
    if (product.quantity > 0) {
      setProductList(
        productList.map((p) =>
          p.id === id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
      setTotalAmount(totalAmount - product.price);
    }
  };

  // Reset everything (cart + wishlist)
  const resetQuantity = () => {
    let newProductList = productList.map((p) => ({ ...p, quantity: 0 }));
    setProductList(newProductList);
    setTotalAmount(0);
    setWishlist([]); // clear wishlist too
    toast.info("Cart and Wishlist cleared");  
  };

  // Clear only cart
  const clearCart = () => {
    let newProductList = productList.map((p) => ({ ...p, quantity: 0 }));
    setProductList(newProductList);
    setTotalAmount(0);
    toast.success("Cart cleared successfully");   
  };

  const removeItem = (id) => {
    const product = productList.find((p) => p.id === id);
    setTotalAmount(totalAmount - product.quantity * product.price);
    setProductList(productList.map((p) =>
      p.id === id ? { ...p, quantity: 0 } : p));
    toast.warn(`${product.name} removed from cart`);   
  };

  const totalItems = productList.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <Router>
      <Navbar
        totalItems={totalItems}
        setSearchTerm={setSearchTerm}
        setSelectedCategory={setSelectedCategory}
        setSortOption={setSortOption}
        user={user}
        setUser={setUser}
        wishlistCount={wishlist.length}
        products={productList}   
        removeItem={removeItem}
        clearCart={clearCart}        
        resetQuantity={resetQuantity} 
      />
      <main className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <ProductGrid
                products={productList}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                sortOption={sortOption}
                setWishlist={setWishlist}
                wishlist={wishlist}
                removeItem={removeItem}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              user ? (
                <Checkout productList={productList} totalAmount={totalAmount} />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route
            path="/wishlist"
            element={<Wishlist wishlist={wishlist} incrementQuantity={incrementQuantity} />}
          />
        </Routes>
      </main>
      <Footer totalAmount={totalAmount} resetQuantity={resetQuantity} />
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar />
    </Router>
  );
}

export default App;
