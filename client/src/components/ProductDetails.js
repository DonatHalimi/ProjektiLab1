import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import "../styles/ProductDetailsStyle.css";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [Emri,setEmri]=useState("");
    const [Cmimi,setCmimi]=useState(null);
    const [Valuta,setValuta]=useState("");
    const [Detajet,setDetajet]=useState("");
    const [Foto,setFoto]=useState("");



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:6001/api/product/get/${id}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const product=data[0];
                console.log("Fetched product data:", data);
                setProduct(data);
                setEmri(product.Emri)
                setCmimi(product.Cmimi);
                setValuta(product.Valuta);
                setDetajet(product.Detajet);
                setFoto(product.Foto)
                console.log(Emri);
                console.log(Cmimi);
                console.log(Valuta);
                console.log(Detajet);
                console.log(Foto);
               
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) {
        // Render loading state if the product data is not available yet
        return <div>Loading...</div>;
    }

    const byteArray = new Uint8Array(Foto.data);
    const binaryString = byteArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64String = btoa(binaryString);


    
 

    return (
        <>
            
            <Navbar/>
           
            <div className='details-container'>
                <div className="product-image">
                <div className="cardImg">
                <img src={`data:image/jpeg;base64,${base64String}`} alt="Product" id='photo' />



              </div>
                </div>
                <div className="product-info">
                    <h2>{Emri}</h2>
                   
                    <p className="price">
                        {Valuta} {Cmimi}
                    </p>
                    <p>{Detajet}</p>
                </div>
                <div className="product-buttons">
                    <button className="cartButton">
                        <i className="fa-solid fa-shopping-cart"></i> Add To Cart
                    </button>
                    <button className="wishlistButton">
                        <i className="fa-solid fa-heart"></i> Add To Wishlist
                    </button>
                </div>
            </div>
            <div style={{ height: "500px" }}></div>
            <Footer />
            
        </>
    );
}

export default ProductDetails;
