import React from "react";
import { Link } from "react-router-dom";

export function PreCheckout(){
    return(
        <div className="col-12">
            <div className="row">

                <div className="col-6 margin-top">
                    <h2>Shipping Information</h2>
                    <hr className="w-100" />
                </div>
                <div className="col-6 margin-top o-summary">
					<h3>Order Summary</h3>
					<hr />
					<span>Subtotal</span>
					<span className="total">
						<b>US</b>
					</span>
					<Link to="/checkout" className="btn btn-block btn-pink btn-checkout">
						<span>CHECKOUT</span>
					</Link>
				</div>
            </div>
        </div>
    );
}