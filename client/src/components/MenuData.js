// Definimi i nje vargu te te dhenave te menyse per navbar
import Cart from "./Cart";
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
        url: "#",
        cName: "nav-links",
        icon: "fa-solid fa-heart",
    },
    {
        title: "About Us",
        url: "/aboutUs",
        cName: "nav-links",
        icon: "fa-solid fa-circle-info",
    },
    {
        title: "Cart",
        url: "/Cart",
        cName: "nav-links",
        icon: "fa-solid fa-shopping-cart",
        component: <Cart/>  // Add the component prop with the Cart component
      }
      ,
    {
        title: "Log In",
        url: "/login",
        cName: "nav-links",
        icon: "fas fa-user",
    },
];