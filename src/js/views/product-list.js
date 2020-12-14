import React, {useContext} from 'react';
import firebase from '../config';
import {AuthContext} from "../store/AuthContext";
import { useObjectVal } from "react-firebase-hooks/database";
import { Product } from "./product";

export function Products() {
	const {currentUser} = useContext(AuthContext);
	const user = currentUser? currentUser.uid: 0;
	/*LIKED*/
	const likePath = firebase.database().ref("liked/");
	const [dbliked, loadingL, errorL] = useObjectVal(likePath);
	const liked = (dbliked)? dbliked : loadingL;
	/*PRODUCTS*/
	const db = firebase.database().ref("products");
	const [db_product, loading, error] =  useObjectVal(db);
	var products = db_product;
	var likedId = null;
	

	function checkLike (pId){
		var like = false;
		if(!liked){
			console.log(loadingL);
		}else{
			Object.keys(liked).map(function(i) {
				if(pId==liked[i].itemId && user!=0){
					if(user==liked[i].userId){
						like = true;
						likedId = i;
					}
				}
			});
		}
		return like;
	}

	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">PRODUCTS</h4>
				</div>
				{!db_product?(
					loading
				): Object.keys(products).map(function(i) {
					var like = checkLike(products[i].id);
					return (
						<div key={i} className="col-3 margin-top">
							<Product prod={products[i]} fav={like} id={likedId}/>
						</div>
					);
						
				})}
			</div>
		</div>
	);
}



/*

!db_product?(
						loading
					): Object.keys(products).map(function(i) {
						if(!liked){
							console.log(loadingL);
						}else{
							Object.keys(liked).map(function(i) {
								if(products[i].id==liked[i].itemId){
									return (
										<div key={i} className="col-3 margin-top">
											<Product {...products[i]} like={true}/>
										</div>
									);
								}
							});
						}
						
					})

*/

	/*
	//localStorage.removeItem('products');
	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(db_product)) //retrieve item from local storage// objects = JSON.parse(localStorage.getItem("savedData")));
	  }, [db_product]);

	var localSt = JSON.parse(localStorage.getItem("products") || "[]");
	products = (!localSt? db_product : localSt);*/