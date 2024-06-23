import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";

export const WishlistContext = createContext({
  items: [],
  addItemToWishlist: () => { },
  removeItemFromWishlist: () => { },
});

export function WishlistContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) {
          setUserId(currentUser.id);
          fetchWishlistItems(currentUser.id);
        } else {
          console.error("User ID is not set");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const fetchWishlistItems = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:6001/api/wishlist?user_id=${userId}`);
      setWishlistItems(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  const addItemToWishlist = async (productId) => {
    try {
      if (!userId) {
        console.error("User ID is not set");
        return;
      }

      // Check if the product is already in the wishlist
      const itemExists = wishlistItems.some(item => item.product_id === productId);
      if (itemExists) {
        console.warn("Product is already in the wishlist");
        return;
      }

      const response = await axios.post(
        "http://localhost:6001/api/wishlist/add",
        { productId, user_id: userId }
      );
      const newItem = response.data.data;
      setWishlistItems([...wishlistItems, newItem]);
      console.log("Product added to wishlist:", newItem);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  const removeItemFromWishlist = async (userId, productId) => {
    try {
      console.log("Current wishlistItems before deletion:", wishlistItems);
      const response = await axios.get(
        `http://localhost:6001/api/wishlist/item?user_id=${userId}&product_id=${productId}`
      );
      const wishlistItemId = response.data.data.id;

      await axios.delete(`http://localhost:6001/api/wishlist/delete/${wishlistItemId}`);

      setWishlistItems((prevItems) => {
        if (!Array.isArray(prevItems)) {
          console.error("wishlistItems is not an array:", prevItems);
          return [];
        }
        return prevItems.filter((item) => item.id !== wishlistItemId);
      });

      console.log("Product removed from wishlist:", wishlistItemId);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const contextValue = {
    items: wishlistItems,
    addItemToWishlist,
    removeItemFromWishlist,
    fetchWishlistItems
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider;
