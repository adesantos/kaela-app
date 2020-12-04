import React from "react";
//import { Link } from "react-router-dom";
import { BagProduct } from "./bag-product";

export function Bag() {
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
					<BagProduct />
				</div>
				<div className="col-4 margin-top o-summary">
					<h3>Order Summary</h3>
					<hr />
					<span>Subtotal</span>
					<span className="total">
						<b>US $00.00</b>
					</span>
					<button className="btn btn-block btn-checkout">CHECKOUT</button>
				</div>
			</div>
		</div>
	);
}