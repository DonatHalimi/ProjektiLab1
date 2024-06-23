import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/wishlist-context";
import Navbar from "./Navbar";
import WishlistItem from "./wishlist-items"; // Adjusted import path
import Footer from "../components/Footer";
import EmptyWishlist from "../img/empty-wishlist.png";
import "../styles/WishlistItemsStyle.css";
import { toast } from "react-toastify";
import AuthService from "../services/auth.service"; // Import your AuthService here

const Wishlist = () => {
  const { items, removeItemFromWishlist } = useContext(WishlistContext);
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const userId = AuthService.getCurrentUser().id; // Get the logged-in user's ID

  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:6001/api/wishlist/get?user_id=${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched wishlist items:", data);
        const fetchedProductIds = data.map((item) => item.product_id);
        setProductIds(fetchedProductIds); // Set productIds state to array of product_id values
      } catch (error) {
        console.error("Error fetching wishlist items:", error);
      }
    };

    fetchWishlistItems();

    document.title = "Ruby | Wishlist";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [userId]);

  useEffect(() => {
    // Fetch additional details for products based on productIds
    const fetchProducts = async () => {
      try {
        // Assuming there's an API endpoint to fetch product details by ID
        const productDetails = await Promise.all(
          productIds.map((productId) =>
            fetch(`http://localhost:6001/api/product/get/${productId}`).then(
              (response) => response.json()
            )
          )
        );
        console.log("Fetched product details:", productDetails);
        setProducts(productDetails); // Set products state with fetched product details
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productIds.length > 0) {
      fetchProducts();
    }
  }, [productIds]);

  // Handle removal from wishlist
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeItemFromWishlist(productId); // Assuming this function handles removal
      toast.success("Produkti është larguar nga Wishlist!", {
        position: "top-right",
        style: {
          marginTop: "70px",
          cursor: "pointer",
          transition: "opacity 2s ease-in",
        },
        onClick: () => {
          navigate("/wishlist"); // Redirect to wishlist page after removal (optional)
        },
      });
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-content-wishlist">
        <h1 style={{ position: "relative", top: "50px", opacity: "0" }}>
          Wishlist
        </h1>
        {products.length > 0 ? (
          <div
            className="wishlist-items"
            style={{
              paddingTop: "50px",
              paddingBottom: "200px",
              marginTop: "140px",
              marginBottom: "200px",
              gap: "100px",
            }}
          >
            {products.map((product, index) => (
              <div key={index} className="wishlist-item">
                <WishlistItem
                  id={product.id} // Assuming product.id is the correct identifier
                  product={product}
                  onRemoveFromWishlist={() =>
                    handleRemoveFromWishlist(product.id)
                  } // Pass the correct product identifier
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="noItemsInWishlist">
            <img src={EmptyWishlist} alt="Empty Wishlist" />
            <p>Ju nuk keni ndonjë produkt në listën e dëshirave.</p>
            <Link to="/">Kthehu në faqen kryesore</Link>
          </div>
        )}
      </div>

      <div style={{ height: "550px" }}></div>

      <Footer />
    </>
  );
};

export default Wishlist;
