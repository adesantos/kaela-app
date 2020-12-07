import React from 'react';
import firebase from '../config';
import { useObjectVal } from "react-firebase-hooks/database";
import { Product } from "./product";

export function Products() {
	const db = firebase.database().ref("products");
	const [db_product, loading, error] =  useObjectVal(db);
	var products = db_product;
	
	//console.log(products);
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">PRODUCTS</h4>
				</div>
					{!db_product?(
						loading
					): Object.keys(products).map(function(i) {
						return (
							<div key={i} className="col-4 margin-top">
								<Product {...products[i]} />
							</div>
						);
					})}
				
			</div>
		</div>
	);
}
	/*
	//localStorage.removeItem('products');
	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(db_product)) //retrieve item from local storage// objects = JSON.parse(localStorage.getItem("savedData")));
	  }, [db_product]);

	var localSt = JSON.parse(localStorage.getItem("products") || "[]");
	products = (!localSt? db_product : localSt);*/