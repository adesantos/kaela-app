import React, {useContext, useState} from "react";
import firebase from '../config';
import {AuthContext} from "../store/AuthContext";
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { Product } from "./product";

export function Wishlist() {
	var empty = true;
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

	const showNouser = (
		<Link to="/login" className="product-name">
			<span>You have to login to see your Wishlist!</span>
		</Link>
	);
	const EmptyList = (
		<Link to="/products" className="product-name">
			<span>There's no items in your Wishlist.</span>
			<span> CLICK HERE TO GO SHOPPING!</span>
		</Link>
	);
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">WISHLIST</h4>
				</div>

					{!db_product?(
						loading
					): Object.keys(products).map(function(i) {
						var like = checkLike(products[i].id);
						if(like){
							empty=false;
							return (
								<div key={i} className="col-3 margin-top">
									<Product prod={products[i]} fav={like} id={likedId}/>
								</div>
							)
						}
					})}
					<div className="text-center col-12 mt-5">
						{user==0?(
							showNouser
						):empty?(
							EmptyList
						):null}
					</div>
			</div>
		</div>
	);
}
