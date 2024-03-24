import Cart from "./Cart"
import Wishlist from "./Wishlist"
import FAQs from "./FAQs"

// Definimi i nje vargu te te dhenave te menyse per navbar
export const MenuData = [
    {
        title: "Home",
        url: "/Home",
        cName: "nav-links",
        icon: "fa-solid fa-house",
    },
    {
        title: "Wishlist",
        url: "/Wishlist",
        cName: "nav-links",
        icon: "fa-solid fa-heart",
        component: <Wishlist />
    },
    {
        title: "Cart",
        url: "/Cart",
        cName: "nav-links",
        icon: "fa-solid fa-shopping-cart",
        component: <Cart />
    },
    {
        title: "Contact",
        url: "/Contact",
        cName: "nav-links",
        icon: "fa-solid fa-envelope",
    },
    {
        title: "FAQs",
        url: "/FAQs",
        cName: "nav-links",
        icon: "fas fa-question-circle",
        component:<FAQs/>
    },
    {
        title: "About Us",
        url: "/AboutUs",
        cName: "nav-links",
        icon: "fa-solid fa-circle-info",
    },
    {
        title: "Log In",
        url: "/Login",
        cName: "nav-links",
        icon: "fas fa-user",
    },
]