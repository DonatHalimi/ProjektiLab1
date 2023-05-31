import React, { createContext, useState } from 'react';

export const WishlistContext = createContext({
  items: [],
  addItemToWishlist: () => {},
  removeItemFromWishlist: () => {},
});

export function WishlistContextProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  function addItemToWishlist(id) {
    const itemExists = wishlistItems.find(item => item.id === id);

    if (!itemExists) {
      setWishlistItems(prevItems => [
        ...prevItems,
        { id: id, quantity: 1 }
      ]);
    }
  }

  function removeItemFromWishlist(id) {
    setWishlistItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    );
  }

  const contextValue = {
    items: wishlistItems,
    addItemToWishlist,
    removeItemFromWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider;