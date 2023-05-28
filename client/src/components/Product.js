import React, { useEffect, useState } from "react";
import ProductStyle from "../styles/ProductStyle.css";

function Product({ idproduct, Emri, Cmimi, Valuta, Kategoria, Foto }) {
    const [fotoUrl, setFotoUrl] = useState("");

    useEffect(() => {
        if (Foto instanceof Blob) {
            setFotoUrl(URL.createObjectURL(Foto));
        }
    }, [Foto]);

    return (
        <div className="product">
            {fotoUrl && <img src={fotoUrl} alt={Emri} />}
            <div className="product-info">
                <h3>{Emri}</h3>
                <p>{Valuta}</p>
                <p>{Cmimi}</p>
                <p>{Kategoria}</p>
            </div>
        </div>
    );
}

export default Product;