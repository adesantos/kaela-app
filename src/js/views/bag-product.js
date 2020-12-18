import React, { useState, useContext} from "react";
import firebase from '../config';
import {AuthContext} from "../store/AuthContext";
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { useDownloadURL } from "react-firebase-hooks/storage";

export function BagProduct({prod, onChildClick, index, a}) {
	var empty = true;
	const child = prod.id;

	const {currentUser} = useContext(AuthContext);
	const user = currentUser? currentUser.uid: 0;
	/*DB PRODUCTS*/
	const prodRef = firebase.database().ref("products/"+prod.idItem);
	const [dbproduct, loading, error] =  useObjectVal(prodRef);
	const product = (dbproduct)? dbproduct : loading;

	/*DB PRODUCT IMAGES*/
	const dbImgs = firebase.storage().ref(product.img);
    const [dbimg, loadingImg, errorImg] = useDownloadURL(dbImgs);
    const url = (dbimg)? dbimg : loadingImg;

	/*DB BAG*/
	const bag = firebase.database().ref("bag/"+prod.id);
	const [dbbag, loadingB, errorB] =  useObjectVal(bag);
	const bagProducts = (dbbag)? dbbag : loadingB;

	/*LIKED*/
    const likePath = firebase.database().ref("liked/");
    const [dbLikePath, loadingLp, errorLp] =  useObjectVal(likePath);
	const liked = (dbLikePath)? dbLikePath : loadingLp;
	var emptyLike = likePath? false : true;

	/*STATES FUNCTIONS*/
	const propsQty = Number(prod.qty);
	const price = Number(prod.price);
	const [count, setCount] = useState(propsQty);
	const initialPrice = propsQty > 0? price*propsQty : price;
	const [subTotal, setSubTotal] = useState(initialPrice);

	const [sizeSelected, setSizeSlect] = useState(false);

	const i = Number(index);
	onChildClick(a);

	/*LAST ITEM IN THE LIKED TO GET THE LAST ID*/
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

	const checkSizeRemove = (size) =>{
		var resp=false;
		if((bagProducts.s!="" && bagProducts.m!="") || (bagProducts.s!="" && bagProducts.l!="") || (bagProducts.m!="" && bagProducts.l!="") || (bagProducts.s!="" && bagProducts.m!="" && bagProducts.l!="")){
			if(size){
				bag.update({[size]: 0});
				resp=true;
				setSizeSlect(true);
				countMinus();
			}else{
				alert("Please Select the SIZE!");
			}
		}else{
			bag.remove();
			setSubTotal(0);
			resp=true;
		}
		return resp;
	}

	const handleRemove = () => {
		if(emptyLike){
			likePath.child(1).set({
				"id": 1,
				"itemId": product.id,
				"uid": 0,
				"userId": user
			});
		}else{
			var last = checkLastId()+1;
			likePath.child(last).set({
				"id": last,
				"itemId": product.id,
				"uid": 0,
				"userId": user
			});
		}
		handleRemoveItem();
	}

	const handleRemoveItem = () => {
		bag.remove();
		setSubTotal(0);
	}

	checkCount(count);

	function checkCount(c){
		if(c == 0){
			handleRemoveItem();
		}
	}

	function countMinus(){
		setCount(count - 1);
		setSubTotal(subTotal - price);
		bag.update({'qty': count - 1});
		a[i][prod.id] = subTotal - price;
		onChildClick(a);
		checkCount(count-1);
	}

	function handleCountMinus(b) {
		if(checkSizeRemove()){
			countMinus();
		}
	}

	function handleCountPlus() {
		setCount(count + 1);
		setSubTotal(subTotal + price);
		bag.update({'qty': count + 1});
		a[i][prod.id] = subTotal + price;
		onChildClick(a);
	}

	return (
		<div>
			{!product?(
				loading
			): 
				<div className="row items-row">
					{empty=false}
					<div className="col-6 shop-col-item">
						<div className="row">
							<div className="col-5">
								<img src={url} className="img-fluid" alt="..." />
							</div>
							<div className="col-7 item-info">
								<span className="item-name">{product.title}</span>
								<div className="div-size col-12">
									<p>Select the size you want to delete:</p>
									<ul>
										<br/><br/>
										{bagProducts.s?(<li><button className={sizeSelected? " ": "not-selected"} onClick={() => checkSizeRemove("s")}>S</button></li>):""}
										{bagProducts.m?(<li><button className={sizeSelected? " ": "not-selected"} onClick={() => checkSizeRemove("m")}>M</button></li>):""}
										{bagProducts.l?(<li><button className={sizeSelected? " ": "not-selected"} onClick={() => checkSizeRemove("l")}>L</button></li>):""}
									</ul>
								</div>
								<div className="item-move">
									<button onClick={() => handleRemove()} className="item-wish">Move to wishlist</button>
									<button onClick={() => handleRemoveItem()} className="item-trash">
										<i className="fa fa-trash" />
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-3 shop-col-item">
						<span className="item-counter" onClick={() => handleCountMinus()}>
							{count > 0 ? "-" : ""}
						</span>
						{count}
						{count < product.qty?(
                            <span className="item-counter" onClick={() => handleCountPlus()}>
                            	+
                        	</span> 
                        ):null}
					</div>
					<div className="col-3 shop-col-item">
						<b>US$ {parseFloat(subTotal).toFixed(2)}</b>
					</div>
				</div>
				
			}
			<div>
				{empty?(
					<Link to="/products" className="product-name">
						<span>There's no items in your Wishlist.</span>
						<span> GO SHOPPING!</span>
					</Link>
				): null }
			</div>
		</div>
	);
}