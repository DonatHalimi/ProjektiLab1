// Definimi i nje vargu te perkohshem per te dhenat e produkteve per main page
const PRODUCTS = [
    {
        id: "price_1NDETcHB8rLE0wX1hBgetkUb",
        product_name: "Black Hoodie",
        description: "Comfortable, High Quality, Black",
        price: 15,
        currency: "$",
        thumb: require("../img/black-hoodie-1.png")
    },
    {
        id: "price_1NEGo4HB8rLE0wX1s5UWXAMj",
        product_name: "Black Shirt",
        description: "Comfortable, High Quality, Black",
        price: 10,
        currency: "$",
        thumb: require("../img/black-shirt-1.png")
    },
    {
        id: "price_1NEGokHB8rLE0wX1iOROEEuE",
        product_name: "Orange Hoodie",
        description: "Comfortable, High Quality, Orange",
        price: 15,
        currency: "$",
        thumb: require("../img/orange-hoodie-1.png")
    },
    {
        id: "price_1NEGpOHB8rLE0wX1BTzH7T6F",
        product_name: "Gray Hoodie",
        description: "Comfortable, High Quality, Gray",
        price: 15,
        currency: "$",
        thumb: require("../img/gray-hoodie-1.png")
    },
    {
        id: "price_1NDESDHB8rLE0wX1TGxQmkVO",
        product_name: "Violet T-Shirt",
        description: "Comfortable, High Quality, Violet",
        price: 10,
        currency: "$",
        thumb: require("../img/violet-t-shirt-1.png")
    },
    {
        id: "price_1NEGqZHB8rLE0wX1JAnjHfWL",
        product_name: "Gray T-Shirt",
        description: "Comfortable, High Quality, Gray",
        price: 10,
        currency: "$",
        thumb: require("../img/gray-t-shirt-1.png")
    },
    {
        id: "price_1NEGrIHB8rLE0wX19bPhqKkV",
        product_name: "Red T-Shirt",
        description: "Comfortable, High Quality, Red",
        price: 10,
        currency: "$",
        thumb: require("../img/red-t-shirt-1.png")
    },
    {
        id: "price_1NEGrvHB8rLE0wX1VYmBla3m",
        product_name: "Black Shorts",
        description: "Comfortable, High Quality, Black",
        price: 15,
        currency: "$",
        thumb: require("../img/black-shorts-1.png")
    },
    {
        id: "price_1NEGsSHB8rLE0wX112okeiko",
        product_name: "Black Hoodie",
        description: "Comfortable, High Quality, Black",
        price: 15,
        currency: "$",
        thumb: require("../img/black-hoodie-2.png")
    },
    {
        id: "price_1NEGsuHB8rLE0wX1eyYXOAAg",
        product_name: "Gray Hoodie",
        description: "Comfortable, High Quality, Black",
        price: 15,
        currency: "$",
        thumb: require("../img/gray-hoodie-2.png")
    },
];

function getProductData(id) {
    let productData = PRODUCTS.find(product => product.id === id);

    /*if(productData == undefined){
        console.log("Product data does not exist for ID :" + id);
        return undefined
    }
    */
    return productData;
}

export { PRODUCTS, getProductData };