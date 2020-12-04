import React, { useContext } from "react";
//import { Product } from "./product";
//import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export function Products() {
	//aqui se cargan los elementos desde la bd con un loop pasando la info desde <product key""/> y se reciben en product.js como props
	//const {store, actions} = useContext(Context);
	//actions.getProducts();
	//console.log(products);
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">PRODUCTS</h4>
				</div>
			</div>
		</div>
	);
}
