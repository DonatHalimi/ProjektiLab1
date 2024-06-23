import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import CartService from "../services/cart.service";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCartCount = async () => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            try {
                const cart = await CartService.getCart(currentUser.id);
                const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
                setCartCount(count);
            } catch (error) {
                console.error("Error fetching cart count:", error);
            }
        }
    };

    useEffect(() => {
        fetchCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, fetchCartCount }}>
            {children}
        </CartContext.Provider>
    );
};
