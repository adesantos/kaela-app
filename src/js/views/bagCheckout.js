import React, { useState} from "react";
import firebase from '../config';
import { Link } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { useDownloadURL } from "react-firebase-hooks/storage";

export function BagCheckout(props) {
	/*DB PRODUCTS*/
	const prodRef = firebase.database().ref("products/"+props.idItem);
	const [dbproduct, loading, error] =  useObjectVal(prodRef);
	const product = (dbproduct)? dbproduct : loading;

	/*DB PRODUCT IMAGES*/
	const dbImgs = firebase.storage().ref(product.img);
    const [dbimg, loadingImg, errorImg] = useDownloadURL(dbImgs);
    const url = (dbimg)? dbimg : loadingImg;

	/*DB BAG*/
	const bag = firebase.database().ref("bag/"+props.id);
	const [dbbag, loadingB, errorB] =  useObjectVal(bag);
	const bagProducts = (dbbag)? dbbag : loadingB;

	/*STATES FUNCTIONS*/
	const propsQty = Number(props.qty);
	const price = Number(props.price);
	const initialPrice = propsQty > 0? price*propsQty : price;
	const [subTotal, setSubTotal] = useState(initialPrice);

	return (
        <div className="col-2">
            {!product?(
				loading
			):
                <div>
                    <img src={url} className="img-fluid" alt="..." />
                    <p className="bagcheckout-title mb-0">{product.title}</p>
                    <p className="bagcheckout-title">US$ {parseFloat(subTotal).toFixed(2)}</p>
                </div>
            }
        </div>
	);
}