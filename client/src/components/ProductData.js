// Definimi i nje vargu te perkohshem per te dhenat e produkteve per main page
 const PRODUCTS = [
    {
        id: 1,
        product_name: "Black Hoodie",
        description: "Comfortable, High Quality, Black",
        price: 15,
        currency: "$",
        thumb: require("../img/black-hoodie-1.png")
    },
    {
        id: 2,
        product_name: "Black Shirt",
        description: "Comfortable, High Quality, Black",
        price: 10,
        currency: "$",
        thumb: require("../img/black-shirt-1.png")
    },
    {
        id: 3,
        product_name: "Orange Hoodie",
        description: "Comfortable, High Quality, Orange",
        price: 15,
        currency: "$",
        thumb: require("../img/orange-hoodie-1.png")
    },
    {
        id: 4,
        product_name: "Gray Hoodie",
        description: "Comfortable, High Quality, Gray",
        price: 15,
        currency: "$",
        thumb: require("../img/gray-hoodie-1.png")
    },
    {
        id: 5,
        product_name: "Violet T-Shirt",
        description: "Comfortable, High Quality, Violet",
        price: 10,
        currency: "$",
        thumb: require("../img/violet-t-shirt-1.png")
    },
    {
        id: 6,
        product_name: "Gray T-Shirt",
        description: "Comfortable, High Quality, Gray",
        price: 10,
        currency: "$",
        thumb: require("../img/gray-t-shirt-1.png")
    },
    {
        id: 7,
        product_name: "Red T-Shirt",
        description: "Comfortable, High Quality, Red",
        price: 10,
        currency: "$",
        thumb: require("../img/red-t-shirt-1.png")
    },
    {
        id: 8,
        product_name: "Black Shorts",
        description: "Comfortable, High Quality, Black",
        price: 15,
        currency: "$",
        thumb: require("../img/black-shorts-1.png")
    },
    {
        id: 9,
        product_name: "Black Hoodie",
        description: "Comfortable, High Quality, Black",
        price: 15,
        currency: "$",
        thumb: require("../img/black-hoodie-2.png")
    },
    // {
    //     id: 10,
    //     product_name: "Gray Hoodie",
    //     description: "Comfortable, High Quality, Black",
    //     price: 15,
    //     currency: "$",
    //     thumb: require("../img/gray-hoodie-2.png")
    // },
];


function getProductData(id){
    let productData =PRODUCTS.find(product => product.id === id);

    /*if(productData == undefined){
        console.log("Product data does not exist for ID :" + id);
        return undefined
    }
    */
    return productData;
}

export {PRODUCTS, getProductData};