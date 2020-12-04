import React, { useState } from "react";
import Img from "../../img/img5.jpg";
//import { Link } from "react-router-dom";

export function BagProduct(total, onChildClick) {
	const [count, setCount] = useState(1);
	const price = 8.0; //ESTO VIENE DE LA BD
	const [subTotal, setSubTotal] = useState(price);

	function handleCountMinus() {
		setCount(count - 1);
		setSubTotal(subTotal - price);
		//onChildClick(subTotal);
	}

	function handleCountPlus() {
		setCount(count + 1);
		setSubTotal(subTotal + price);
		//onChildClick(subTotal);
	}

	return (
		<div className="row items-row">
			<div className="col-6 shop-col-item">
				<div className="row">
					<div className="col-5">
						<img src={Img} className="img-fluid" alt="..." />
					</div>
					<div className="col-7 item-info">
						<span className="item-name">Black Top</span>
						<div className="item-move">
							<span className="item-wish">Move to wishlist</span>
							<span className="item-trash">
								<i className="fa fa-trash" />
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="col-3 shop-col-item">
				<span className="item-counter" onClick={() => handleCountMinus()}>
					{count > 0 ? "-" : ""}
				</span>
				{count}
				<span className="item-counter" onClick={() => handleCountPlus()}>
					+
				</span>
			</div>
			<div className="col-3 shop-col-item">
				<b>US$ {subTotal}</b>
			</div>
		</div>
	);
}