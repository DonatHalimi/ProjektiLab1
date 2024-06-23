import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { toast } from "react-toastify";
import { WishlistContext } from "../context/wishlist-context";
import "../styles/WishlistItemsStyle.css";
import "../styles/ProductStyle.css";
import AuthService from "../services/auth.service";
import CartService from "../services/cart.service";

function WishlistItem({ product }) {
  const { removeItemFromWishlist, fetchWishlistItems } = useContext(WishlistContext);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUserId(currentUser.id);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    // Fetch wishlist items when userId changes
    const fetchData = async () => {
      if (userId) {
        await fetchWishlistItems(userId);
      }
    };

    fetchData();
  }, [userId, fetchWishlistItems]);

  const handleAddOneToCart = async () => {
    if (!userId) {
      console.error("User ID is not set");
      return;
    }

    if (product && product.length > 0 && product[0].id) {
      try {
        await CartService.addItem(userId, product[0].id, 1);

        toast.success("Product added to cart!", {
          position: "top-right",
          style: {
            marginTop: "70px",
            cursor: "pointer",
            transition: "opacity 2s ease-in",
          },
          onClick() {
            navigate("/Cart");
          },
        });
      } catch (error) {
        console.error('Error adding product to cart:', error);
        toast.error('Failed to add product to cart.', {
          position: 'top-right',
          style: {
            marginTop: '70px',
            cursor: 'pointer',
            transition: 'opacity 2s ease-in',
          },
        });
      }
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      if (!userId) {
        console.error("User ID is not set");
        return;
      }

      if (product && product.length > 0 && product[0].id) {
        await removeItemFromWishlist(userId, product[0].id);

        toast.success("Product removed from wishlist!", {
          position: "top-right",
          style: {
            marginTop: "70px",
            cursor: "pointer",
            transition: "opacity 2s ease-in",
          },
        });

        window.location.reload();
      } else {
        throw new Error("Product ID is undefined or not found");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const detailedProduct = product && product.length > 0 ? product[0] : null;

  let imageBase64 = "";
  if (detailedProduct && detailedProduct.Foto && detailedProduct.Foto.data) {
    imageBase64 = arrayBufferToBase64(detailedProduct.Foto.data);
  }

  return (
    <div className="product-container">
      {detailedProduct && (
        <div className="product" key={detailedProduct.id}>
          <div className="card">
            <Link to={`/product/${detailedProduct.id}`} className="product-details-link">
              <div className="cardImg">
                {imageBase64 && (
                  <img
                    src={`data:image/jpeg;base64,${imageBase64}`}
                    alt="Product"
                    id="photo"
                  />
                )}
              </div>
              <div className="card_header">
                <h3>{detailedProduct.Emri}</h3>
                <p className="price">
                  {detailedProduct.Valuta}
                  {detailedProduct.Cmimi}
                </p>
              </div>
            </Link>

            <button
              className="cartButton"
              onClick={handleAddOneToCart}
              title="Add To Cart"
            >
              <AiOutlineShoppingCart
                style={{ color: "black", fontSize: "18px" }}
              />
            </button>

            <button
              className="wishlistButton"
              onClick={handleRemoveFromWishlist}
              title="Remove From Wishlist"
            >
              <BsTrash3
                style={{
                  color: "black",
                  fontSize: "18px",
                  fontWeight: "normal",
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WishlistItem;