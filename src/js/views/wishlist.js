import React from "react";
import firebase from '../config';
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { Product } from "./product";

export function Wishlist() {
	var empty = true;
	const db = firebase.database().ref("products");
	const [db_product, loading, error] =  useObjectVal(db);
	var products = db_product;
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">PRODUCTS</h4>
				</div>
					{!db_product?(
						loading
					): Object.keys(products).map(function(i) {
						if(products[i].fav){
							empty=false;
							return (
								<div key={i} className="col-4 margin-top">
									<Product {...products[i]} />
								</div>
							)
						}
					})}
					<div>
						{empty?(
							<Link to="/products" className="product-name">
								<span>There's no items in your Wishlist.</span>
								<span> GO SHOPPING!</span>
							</Link>
						): null }
					</div>
			</div>
		</div>
	);
}
