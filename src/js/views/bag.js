import React, { useState } from "react";
import { BagProduct } from "./bag-product";
import firebase from '../config';
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";

export function Bag() {
	const bag = firebase.database().ref("bag");
	const [db_product, loading, error] =  useObjectVal(bag);
	const [subtotal, setSubtotal] = useState();
	const [total, setTotal] = useState(0);
	const [child, setChild] = useState();
	var products = db_product;
	//console.log(products);
	function handleChildClick(amount, id){
		setChild(id);
		setSubtotal(amount);
		calculateTotal(amount, id);
		//console.log(amount);
		//console.log(id);
	}
	function calculateTotal(amount, id){
		if(subtotal && child){
			if(id==child){
				setTotal(amount);
			}else{
				setTotal(subtotal+amount);
			}
		}
	}
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">SHOPPING BAG</h4>
				</div>

				<div className="col-8 margin-top">
					<div className="row">
						<div className="col-6 shop-col">Item</div>
						<div className="col-3 shop-col">Qty</div>
						<div className="col-3 shop-col">Price</div>
					</div>
					<div className="row">
						{!db_product?(
							loading
						): Object.keys(products).map(function(i) {
							if(products[i].qty>0){
								return (
									<div key={i} className="col-12">
										<BagProduct {...products[i]} onChildClick={handleChildClick} />
									</div>
								);
							}
						})}
					</div>
				</div>
				<div className="col-4 margin-top o-summary">
					<h3>Order Summary</h3>
					<hr />
					<span>Subtotal</span>
					<span className="total">
						<b>US ${parseFloat(total).toFixed(2)}</b>
					</span>
					<Link to="/checkout" className="btn btn-block btn-pink btn-checkout">
						<span>CHECKOUT</span>
					</Link>
				</div>
			</div>
		</div>
	);
}