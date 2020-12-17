import React, { useState, useEffect, useContext } from "react";
import { BagProduct } from "./bag-product";
import firebase from '../config';
import {AuthContext} from "../store/AuthContext";
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";

export function Bag() {
	const {currentUser} = useContext(AuthContext);
	const user = currentUser? currentUser.uid: 0;
	const bag = firebase.database().ref("bag");
	const [db_product, loading, error] =  useObjectVal(bag);
	const [total, setTotal] = useState(0);
	var empty = true;
	var array = [];
	var products = db_product;
	var count = 0;

	useEffect(() => {
		setTotal(0);
	}, []);

	const calculateSubTotal = (ar) =>{
		var am = 0;
		const size = Object.keys(ar).length;
		for(var i=0;i<size;i++){
			am = am + ar[i][i];
		}
		return am;
	}

	const handleChildClick = (a) =>{
		setTotal(calculateSubTotal(a));
	}

	const showNouser = (
		<Link to="/login" className="product-name">
			<span>You have to login to see your Bag!</span>
		</Link>
	);
	const EmptyList = (
		<Link to="/products" className="product-name">
			<span>There's no items in your Bag.</span>
			<span> CLICK HERE TO GO SHOPPING!</span>
		</Link>
	);
	return (
		<div className="col-12 products padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">SHOPPING BAG</h4>
				</div>

				<div className="col-8 margin-top">
					{currentUser?(
						<div className="row">
							<div className="col-6 shop-col">Item</div>
							<div className="col-3 shop-col">Qty</div>
							<div className="col-3 shop-col">Price</div>
						</div>
					):null}
					<div className="row">
						{!db_product?(
							loading
						): Object.keys(products).map(function(i) {
							if(currentUser){
								if(products[i].qty>0 && user===products[i].userId){
									empty = false;
									count = count + 1;
									var price = Number(products[i].price);
									var qty = Number(products[i].qty);
									array.push({[count-1]:price*qty});
									return (
										<div key={i} className="col-12">
											<BagProduct prod={products[i]} onChildClick={handleChildClick} index={count-1} a={array}/>
										</div>
									);
								}
							}
						})}
						<div className="text-right col-11 mt-5">
							{user==0?(
								showNouser
							):empty?(
								EmptyList
							):null}
						</div>
					</div>
				</div>
				{currentUser?(
					<div className="col-4 margin-top o-summary">
						<h3>Order Summary</h3>
						<hr />
						<span>Subtotal</span>
						<span className="total">
							<b>US ${empty?"0":parseFloat(total).toFixed(2)}</b>
						</span>
						{empty?(
							<Link to="" className="btn btn-block btn-pink btn-checkout disabled">
								<span>CHECKOUT</span>
							</Link>
						):<Link to={"/checkout/"+total} className="btn btn-block btn-pink btn-checkout"><span>CHECKOUT</span></Link>}
					</div>
				):null}
			</div>
		</div>
	);
}