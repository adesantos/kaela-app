import React from "react";
import { Product } from "./product";

export function Wishlist() {
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">Wishlist</h4>
				</div>

				<div className="col-4 margin-top">
					<Product />
				</div>
				<div className="col-4 margin-top">
					<Product />
				</div>
				<div className="col-4 margin-top">
					<Product />
				</div>
			</div>
		</div>
	);
}
