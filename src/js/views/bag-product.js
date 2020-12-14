import React, { useState} from "react";
import firebase from '../config';
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { useDownloadURL } from "react-firebase-hooks/storage";

export function BagProduct({prod, onChildClick, a}) {
	var empty = true;
	const child = prod.id;
	//console.log(a);
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

	/*STATES FUNCTIONS*/
	const propsQty = Number(prod.qty);
	const price = Number(prod.price);
	const [count, setCount] = useState(propsQty);
	const initialPrice = propsQty > 0? price*propsQty : price;
	const [subTotal, setSubTotal] = useState(initialPrice);
	onChildClick(subTotal, child, a, false);

	const handleRemove = (val) => {
		if(!val){
			prodRef.update({'fav': true});
		}
		bag.remove();
		setSubTotal(0);
	}

	checkCount(count);

	function checkCount(c){
		if(c == 0){
			handleRemove(true);
		}
	}

	function handleCountMinus() {
		setCount(count - 1);
		setSubTotal(subTotal - price);
		bag.update({'qty': count - 1});
		onChildClick(subTotal - price, child, a, true);
		checkCount(count-1);
	}

	function handleCountPlus() {
		setCount(count + 1);
		setSubTotal(subTotal + price);
		bag.update({'qty': count + 1});
		onChildClick(subTotal + price, child, a, true);
	}

	console.log(bagProducts.s);
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
								<div>
									<br/><br/>
									<div>Size:</div>
									<div>{bagProducts.s}</div>
									<div>{bagProducts.m}</div>
									<div>{bagProducts.l}</div>
								</div>
								<div className="item-move">
									<button onClick={() => handleRemove(false)} className="item-wish">Move to wishlist</button>
									<button onClick={() => handleRemove(true)} className="item-trash">
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