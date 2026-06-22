import React from "react";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
  }

  handleSearch = () => {
    this.props.setSearchTerm(this.state.searchInput);
  };

  render() {
    const { 
      user, 
      setUser, 
      wishlistCount, 
      totalItems, 
      products, 
      removeItem, 
      clearCart // use clearCart instead of resetQuantity
    } = this.props;

    //  Calculate cart total
    const cartTotal = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container-fluid">
          {/* Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <i className="bi bi-cart-fill me-2 text-warning"></i>
            <span className="fw-bold">Sid Cart</span>
          </Link>

          {/* Search + Filters */}
          <form
            className="d-flex flex-grow-1 mx-3 navbar-search"
            onSubmit={(e) => e.preventDefault()}
          >
            <select
              className="form-select w-auto me-2"
              onChange={(e) => this.props.setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Laptops">Laptops</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select
              className="form-select w-auto me-2"
              onChange={(e) => this.props.setSortOption(e.target.value)}
            >
              <option value="default">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>

            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={this.state.searchInput}
              onChange={(e) => this.setState({ searchInput: e.target.value })}
            />
            <button
              className="btn btn-warning ms-2"
              onClick={this.handleSearch}
            >
              <i className="bi bi-search"></i>
            </button>
          </form>

          {/* Right side */}
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            {/* Returns & Orders */}
            <li className="nav-item me-4">
              <Link to="/" className="nav-link text-light text-center">
                <span>Returns</span>
                <br />
                <small>& Orders</small>
              </Link>
            </li>

            {/* User Profile Dropdown */}
            <li className="nav-item dropdown me-4">
              <button
                className="nav-link dropdown-toggle text-light btn btn-link"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle"></i>{" "}
                {user ? user.name : "Account"}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                {user ? (
                  <>
                    <li><Link to="/orders" className="dropdown-item">My Orders</Link></li>
                    <li><Link to="/wishlist" className="dropdown-item">Wishlist</Link></li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          setUser(null);
                          localStorage.removeItem("user");
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : ( 
                  <>
                    <li><Link to="/login" className="dropdown-item">Login</Link></li>
                    <li><Link to="/signup" className="dropdown-item">Signup</Link></li>
                  </>
                )}
              </ul>
            </li>

            {/* Wishlist */}
            <li className="nav-item me-4 position-relative text-center">
              <Link to="/wishlist" className="nav-link text-light">
                <i className="bi bi-heart-fill fs-4"></i>
                {wishlistCount > 0 && (
                  <span
                    key={wishlistCount}
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle badge-bounce"
                  >
                    {wishlistCount}
                  </span>
                )}
                <br />
                <small>Wishlist</small>
              </Link>
            </li>

            {/* Cart Dropdown */}
            <li className="nav-item dropdown position-relative text-center">
              <button
                className="nav-link dropdown-toggle text-light btn btn-link"
                id="cartDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-cart-fill fs-4"></i>
                {totalItems > 0 && (
                  <span
                    key={totalItems}
                    className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle badge-bounce"
                  >
                    {totalItems}
                  </span>
                )}
                <br />
                <small>Cart</small>
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="cartDropdown"
              >
                {totalItems > 0 ? (
                  <>
                    {products.filter((p) => p.quantity > 0).map((p) => (
                      <li
                        key={p.id}
                        className="dropdown-item d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {p.name} × {p.quantity}
                        </span>
                        <button
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={() => removeItem(p.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </li>
                    ))}
                    <li><hr className="dropdown-divider" /></li>
                    <li className="dropdown-item fw-bold">
                      Total: ₹{cartTotal}
                    </li>
                    <li>
                      <Link
                        to="/checkout"
                        className="dropdown-item fw-bold text-primary"
                      >
                        Go to Checkout
                      </Link>
                    </li>
                    {/* ✅ Clear Cart button now uses clearCart */}
                    <li>
                      <button
                        className="dropdown-item text-danger fw-bold"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="dropdown-item text-muted">Cart is empty</li>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
