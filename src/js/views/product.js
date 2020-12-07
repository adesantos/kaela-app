import React, { useState } from "react";
import firebase from '../config';
import { Link } from "react-router-dom";
import { useDownloadURL } from "react-firebase-hooks/storage";

export function Product(props) {
	const dbImgs = firebase.storage().ref(props.img);
	const product = firebase.database().ref("products/"+props.id);
	const [imgUrl, loading, error] = useDownloadURL(dbImgs);
	const [isLiked, updateLike] = useState(props.fav);
	
	const handleLike = () => {
		updateLike(!isLiked);
		product.update({'fav': !isLiked});
	};

	return (
		<div key={1} className="">
			<Link to={"/single-product/"+props.id+"/"+props.fav}>
				<img src={(imgUrl)? imgUrl: loading} className={"img-fluid"} alt="..." />
			</Link>
			<Link to="/single-product" className="product-name">
				<span>{props.title}</span>
			</Link>
			<button className="like" onClick={handleLike}>
				<i className={isLiked ? "fa fa-heart" : "fa fa-heart-o"} />
			</button>
			<p>
				<b>${parseFloat(props.price).toFixed(2)}</b>
			</p>
		</div>
	);
}