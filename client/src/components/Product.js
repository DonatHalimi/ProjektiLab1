import React from "react";
import "./ProductStyle.css"

function Product({ idproduct, Emri, Cmimi, Detajet, Kategoria, FotoSource }) {
    return (
        <div className="product">
            <img src={FotoSource} alt={Emri} />
            <div className="product-info">
                <h3>{Emri}</h3>
                <p>{Cmimi}</p>
                <p>{Detajet}</p>
                <p>{Kategoria}</p>
            </div>
        </div>
    );
};

export default Product;