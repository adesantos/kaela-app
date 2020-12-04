import React, { useState } from "react";
import product_img from "../../img/img6.jpg";

export function SingleProduct(){
    const [isLiked, updateLike] = useState(false);
    const [count, setCount] = useState(1);
	const price = 8.0; //ESTO VIENE DE LA BD
	//const [subTotal, setSubTotal] = useState(price);


    const handleLike = () => {
		updateLike(!isLiked);
		//send update to database
	};
	function handleCountMinus() {
		setCount(count - 1);
		//setSubTotal(subTotal - price);
		//onChildClick(subTotal);
	}

	function handleCountPlus() {
		setCount(count + 1);
		//setSubTotal(subTotal + price);
		//onChildClick(subTotal);
	}
    return(
        <div className="col-12 single-product">
            <div className="row">
                <div className="col-6">
                    <img src={product_img} className="img-fluid singlep-img" alt="..."/>
                </div>
                <div className="col-6">
                    <p className="product-title">Burgundy Mesh Crossed Top</p>
                    <p className="product-price"><b>US$ {price}</b></p>
                    <div className="div-counter">
                        <p>Qty</p>
                        <span className="item-counter" onClick={() => handleCountMinus()}>
                            {count > 0 ? "-" : ""}
                        </span>
                        <span className="product-count">{count}</span>
                        <span className="item-counter" onClick={() => handleCountPlus()}>
                            +
                        </span>
                    </div>
                    <div className="div-size">
                        <p>Size</p>
                        <ul>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                        </ul>
                    </div>
                    <div className="div-buttons">
                        <button className="btn btn-pink add-bag">ADD TO BAG</button>
                        <button className="like" onClick={handleLike}>
                            <i className={isLiked ? "fa fa-heart" : "fa fa-heart-o"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}