import React, { useState } from "react";
import product_img from "../../img/img6.jpg";
import { Link } from "react-router-dom";
//import { Context } from "../store/appContext";

export function Product() {
	//HAcer condicional si el producto viene con liked estado inicial es true
	const [isLiked, updateLike] = useState(false);
	const handleLike = () => {
		updateLike(!isLiked);
		//send update to database
	};
	return (
		<div key={1} className="">
			<Link to="/single-product">
				<img src={product_img} className="img-fluid" alt="..." />
			</Link>
			<Link to="/single-product" className="product-name">
				<span>Name</span>
			</Link>
			<button className="like" onClick={handleLike}>
				<i className={isLiked ? "fa fa-heart" : "fa fa-heart-o"} />
			</button>
			<p>
				<b>$25.00</b>
			</p>
		</div>
	);
}
