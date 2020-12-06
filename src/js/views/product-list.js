import React, {useEffect, useState} from 'react';
import firebase from '../config';
import { useObjectVal } from "react-firebase-hooks/database";
import { Product } from "./product";

export function Products() {
	//localStorage.removeItem('products');
	const db = firebase.database().ref("products");
	const [db_product, loading, error] =  useObjectVal(db);
	var products = db_product;

	/*useEffect(() => {
		localStorage.setItem('products', JSON.stringify(db_product)) //retrieve item from local storage// objects = JSON.parse(localStorage.getItem("savedData")));
	  }, [db_product]);

	var localSt = JSON.parse(localStorage.getItem("products") || "[]");
	products = (!localSt? db_product : localSt);*/
	
	//console.log(products);
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">PRODUCTS</h4>
				</div>
					{!products?(
						loading
					): products.map((item, i) => {
						return (
							<div key={i} className="col-4 margin-top">
								<Product {...item} />
							</div>
						);
					})}
				
			</div>
		</div>
	);
}
