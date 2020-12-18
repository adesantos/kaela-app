import React, { useState, useContext, useEffect } from "react";
import firebase from '../config';
import {AuthContext} from "../store/AuthContext";
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { useDownloadURL } from "react-firebase-hooks/storage";

export function Product({prod, fav, id}) {
	const {currentUser} = useContext(AuthContext);
	const user = currentUser? currentUser.uid: 0;

	/*LIKED BY ID*/
	const likePathBYId = firebase.database().ref("liked/"+id);//BY ID
	/*LIKED*/
	const likePath = firebase.database().ref("liked/");
	const [dbLikePath, loadingLp, errorLp] =  useObjectVal(likePath);
	const liked = (dbLikePath)? dbLikePath : loadingLp;
	var emptyLike = dbLikePath? false : true;
	/*IMAGES*/ 
	const dbImgs = firebase.storage().ref(prod.img);
	const [imgUrl, loading, error] = useDownloadURL(dbImgs);
	/*PRODUCT*/
	const product = firebase.database().ref("products/"+prod.id);
	const [isLiked, updateLike] = useState(fav);

	function checkLastId (){
		var likeId = false;
		if(!liked){
			console.log(loadingLp);
		}else{
			Object.keys(liked).map(function(i) {
				likeId = i;
			});
		}
		return Number(likeId);
	}

	const handleLike = () => {
		if(fav && id!=null){
			likePathBYId.remove();
		}else{
			if(currentUser){
				if(emptyLike){
					likePath.child(1).set({
						"id": 1,
						"itemId": prod.id,
						"uid": 0,
						"userId": user
					});
				}else{
					var last = checkLastId()+1;
					likePath.child(last).set({
						"id": last,
						"itemId": prod.id,
						"uid": 0,
						"userId": user
					});
				}
			}
		}
		updateLike(!isLiked);
	};
	

	return (
		<div key={1} className="">
			<Link to={"/single-product/"+prod.id+"/"+fav+"/"+id}>
				<img src={(imgUrl)? imgUrl: loading} className={"img-fluid"} alt="..." />
			</Link>
			<Link to={"/single-product/"+prod.id+"/"+fav+"/"+id} className="product-name">
				<span>{prod.title}</span>
			</Link>
			<button className="like" onClick={() => handleLike()}>
				<i className={isLiked ? "fa fa-heart" : "fa fa-heart-o"} />
			</button>
			<p>
				<b>${parseFloat(prod.price).toFixed(2)}</b>
			</p>
		</div>
	);
}