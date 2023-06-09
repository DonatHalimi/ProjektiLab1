// // Definimi i nje vargu te perkohshem per te dhenat e produkteve per main page
// const PRODUCTS = [
//     {
//         id: "price_1NDETcHB8rLE0wX1hBgetkUb",
//         product_name: "Black Hoodie",
//         description: "Stay warm and comfortable with our stylish hoodie. Made from high-quality materials, this hoodie is perfect for any season. It features a cozy hood with adjustable drawstrings and a front pocket to keep your hands warm. The relaxed fit and soft fabric make it ideal for everyday wear. Whether you're lounging at home or heading out for a casual outing, our hoodie is a must-have in your wardrobe.",
//         price: 15,
//         currency: "$",
//         thumb: require("../img/black-hoodie-1.png")
//     },
//     {
//         id: "price_1NEGo4HB8rLE0wX1s5UWXAMj",
//         product_name: "Black T-Shirt",
//         description: "Our T-Shirts are made from high-quality cotton fabric, ensuring a soft and comfortable feel. With a classic crew neck and short sleeves, these T-Shirts are perfect for everyday wear. They feature a relaxed fit that allows for easy movement and a casual look. Available in various colors and sizes, these T-Shirts are versatile and can be paired with jeans, shorts, or skirts for a stylish and effortless outfit. Add this essential wardrobe staple to your collection and enjoy both comfort and style.",
//         price: 10,
//         currency: "$",
//         thumb: require("../img/black-t-shirt-1.png")
//     },
//     {
//         id: "price_1NEGokHB8rLE0wX1iOROEEuE",
//         product_name: "Orange Hoodie",
//         description: "Stay warm and comfortable with our stylish hoodie. Made from high-quality materials, this hoodie is perfect for any season. It features a cozy hood with adjustable drawstrings and a front pocket to keep your hands warm. The relaxed fit and soft fabric make it ideal for everyday wear. Whether you're lounging at home or heading out for a casual outing, our hoodie is a must-have in your wardrobe.",
//         price: 15,
//         currency: "$",
//         thumb: require("../img/orange-hoodie-1.png")
//     },
//     {
//         id: "price_1NEGpOHB8rLE0wX1BTzH7T6F",
//         product_name: "Gray Blouse",
//         description: "Elevate your style with our elegant blouse. Made from high-quality fabric, this blouse offers a perfect blend of comfort and sophistication. The flattering silhouette and delicate details make it a versatile piece for both casual and formal occasions. Whether you pair it with jeans for a chic everyday look or dress it up with a skirt for a special event, our blouse is a wardrobe essential. Stay fashionable and confident with this timeless wardrobe staple.",
//         price: 15,
//         currency: "$",
//         thumb: require("../img/gray-hoodie-1.png")
//     },
//     {
//         id: "price_1NDESDHB8rLE0wX1TGxQmkVO",
//         product_name: "Violet T-Shirt",
//         description: "Our T-Shirts are made from high-quality cotton fabric, ensuring a soft and comfortable feel. With a classic crew neck and short sleeves, these T-Shirts are perfect for everyday wear. They feature a relaxed fit that allows for easy movement and a casual look. Available in various colors and sizes, these T-Shirts are versatile and can be paired with jeans, shorts, or skirts for a stylish and effortless outfit. Add this essential wardrobe staple to your collection and enjoy both comfort and style.",
//         price: 10,
//         currency: "$",
//         thumb: require("../img/violet-t-shirt-1.png")
//     },
//     {
//         id: "price_1NEGqZHB8rLE0wX1JAnjHfWL",
//         product_name: "Gray T-Shirt",
//         description: "Our T-Shirts are made from high-quality cotton fabric, ensuring a soft and comfortable feel. With a classic crew neck and short sleeves, these T-Shirts are perfect for everyday wear. They feature a relaxed fit that allows for easy movement and a casual look. Available in various colors and sizes, these T-Shirts are versatile and can be paired with jeans, shorts, or skirts for a stylish and effortless outfit. Add this essential wardrobe staple to your collection and enjoy both comfort and style.",
//         price: 10,
//         currency: "$",
//         thumb: require("../img/gray-t-shirt-1.png")
//     },
//     {
//         id: "price_1NEGrIHB8rLE0wX19bPhqKkV",
//         product_name: "Red T-Shirt",
//         description: "Our T-Shirts are made from high-quality cotton fabric, ensuring a soft and comfortable feel. With a classic crew neck and short sleeves, these T-Shirts are perfect for everyday wear. They feature a relaxed fit that allows for easy movement and a casual look. Available in various colors and sizes, these T-Shirts are versatile and can be paired with jeans, shorts, or skirts for a stylish and effortless outfit. Add this essential wardrobe staple to your collection and enjoy both comfort and style.",
//         price: 10,
//         currency: "$",
//         thumb: require("../img/red-t-shirt-1.png")
//     },
//     {
//         id: "price_1NEGrvHB8rLE0wX1VYmBla3m",
//         product_name: "Black Shorts",
//         description: "Elevate your summer wardrobe with our stylish and comfortable shorts. Made from lightweight and breathable fabric, these shorts are designed to keep you cool and relaxed on warm days. With a flattering fit and versatile style, they are perfect for casual outings, beach trips, or even lounging at home. The elastic waistband ensures a comfortable and adjustable fit, while the range of vibrant colors and patterns allows you to express your personal style. Stay trendy and comfortable this summer with our fashionable shorts.",
//         price: 15,
//         currency: "$",
//         thumb: require("../img/black-shorts-1.png")
//     },
//     {
//         id: "price_1NEGsSHB8rLE0wX112okeiko",
//         product_name: "Black Hoodie",
//         description: "Stay warm and comfortable with our stylish hoodie. Made from high-quality materials, this hoodie is perfect for any season. It features a cozy hood with adjustable drawstrings and a front pocket to keep your hands warm. The relaxed fit and soft fabric make it ideal for everyday wear. Whether you're lounging at home or heading out for a casual outing, our hoodie is a must-have in your wardrobe.",
//         price: 15,
//         currency: "$",
//         thumb: require("../img/black-hoodie-2.png")
//     },
//     {
//         id: "price_1NEGsuHB8rLE0wX1eyYXOAAg",
//         product_name: "Gray Hoodie",
//         description: "Stay warm and comfortable with our stylish hoodie. Made from high-quality materials, this hoodie is perfect for any season. It features a cozy hood with adjustable drawstrings and a front pocket to keep your hands warm. The relaxed fit and soft fabric make it ideal for everyday wear. Whether you're lounging at home or heading out for a casual outing, our hoodie is a must-have in your wardrobe.",
//         price: 15,
//         currency: "$",
//         thumb: require("../img/gray-hoodie-2.png")
//     },
// ];

// function getProductData(id) {
//     let productData = PRODUCTS.find(product => product.id === id);

//     /*if(productData == undefined){
//         console.log("Product data does not exist for ID :" + id);
//         return undefined
//     }
//     */
//     return productData;
// }

// export { PRODUCTS, getProductData };