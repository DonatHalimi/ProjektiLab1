import Cart from "./Cart";
import Wishlist from "./Wishlist";

// Definimi i nje vargu te te dhenave te menyse per navbar
export const MenuData = [
    {
        title: "Home",
        url: "/",
        cName: "nav-links",
        icon: "fa-solid fa-house",
    },
    {
        title: "Categories",
        url: "#",
        cName: "nav-links",
        icon: "fa-solid fa-tshirt",
    },
    {
        title: "Wishlist",
        url: "/Wishlist",
        cName: "nav-links",
        icon: "fa-solid fa-heart",
        component: <Wishlist />
    },
    {
        title: "About Us",
        url: "/AboutUs",
        cName: "nav-links",
        icon: "fa-solid fa-circle-info",
    },
    {
        title: "Cart",
        url: "/Cart",
        cName: "nav-links",
        icon: "fa-solid fa-shopping-cart",
        component: <Cart />
    }
    ,
    {
        title: "Log In",
        url: "/login",
        cName: "nav-links",
        icon: "fas fa-user",
    },
];