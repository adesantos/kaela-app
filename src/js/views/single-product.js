import React, { useState, useEffect } from "react";
import firebase from '../config';
import { useParams } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { useDownloadURL } from "react-firebase-hooks/storage";

export function SingleProduct(){
    const params = useParams();
    const id = params.id;
    var emptyBag = false;
    const prodRef = firebase.database().ref("products/"+id);
    const [dbproduct, loading, error] =  useObjectVal(prodRef);
    const product = (dbproduct)? dbproduct : loading;

    const dbImgs = firebase.storage().ref(product.img);
    const [dbimg, loadingImg, errorImg] = useDownloadURL(dbImgs);
    const url = (dbimg)? dbimg : loadingImg;

    const [isLiked, updateLike] = useState(params.l);
    const [count, setCount] = useState(1);
    const price = parseFloat(product.price).toFixed(2);
    
    /*DB BAG*/
    const bag = firebase.database().ref("bag/");
    const [dbbag, loadingB, errorB] =  useObjectVal(bag);
    emptyBag = dbbag? false : true;
    const [lastId, setLast] = useState([]);
    const [exists, setExist] = useState([]);

    const bagByid = firebase.database().ref("bag/"+exists.id); //BY ID
    const [dbbagByid, loadingBb, errorBb] =  useObjectVal(bagByid);
    const shopBag = dbbagByid? dbbagByid : loadingBb;
    useEffect(() => {
        var id;
        bag.limitToLast(1).once("child_added", function (snapshot) {
            if(snapshot.exists()){
                id = snapshot.val();
            }else{
                emptyBag=true;
            }
        })
        .then(function() {
            setLast(id.id);
        });
      }, []);

    useEffect(() => {
        bag.orderByChild("idItem").equalTo(Number(id)).on("child_added", function (snapshot) {
            if(snapshot.exists()){
                setExist(snapshot.val());
            }else{
                emptyBag=true;
            }
        });
    }, []);

    const soldOut = (product.qty > 0)? false : true;

    const handleLike = () => {
		updateLike(!isLiked);
		prodRef.update({'fav': !isLiked});
	};
	function handleCountMinus() {
		setCount(count - 1);
	}

	function handleCountPlus() {
        setCount(count + 1);
    }
    
    function addToBag(){
        if(emptyBag){
            bag.child(1).set({
                "id": 1,
                "idItem": product.id,
                "qty": count,
                "size": "S",
                "price": price,
                "userId": 1
            });
        }else{
            if(exists.id){
                var itemQty = Number(shopBag.qty);
                var validateQty = 0;
                if((itemQty+count) <= product.qty){
                    validateQty = itemQty+count;
                }else{
                    validateQty = product.qty;
                }
                bag.child(exists.id).update({'qty': validateQty});
            }else{
                var last = Number(lastId)+1;
                var id = last? last : 1;
                bag.child(id).set({
                    "id": id,
                    "idItem": product.id,
                    "qty": count,
                    "size": "S",
                    "price": price,
                    "userId": 1
                });
            }
        }
    }

    return(
        <div className="col-12 single-product">
            <div className="row">
                <div className="col-6">
                    <img src={url} className="img-fluid singlep-img" alt="..."/>
                </div>
                <div className="col-6">
                    <p className="product-title">{product.title}</p>
                    <p className="product-price"><b>US$ {price}</b></p>
                    <div className="div-counter">
                        {
                        !soldOut?( 
                            <div>
                                <p>Qty</p>
                                <span className="item-counter" onClick={() => handleCountMinus()}>
                                    {count > 0 ? "-" : ""}
                                </span>
                                <span className="product-count">{count}</span>
                                {count == product.qty?(
                                    <span>Hurry Up! There's no more left</span>
                                ):
                                <span className="item-counter" onClick={() => handleCountPlus()}>
                                    +
                                </span> 
                                }
                            </div>
                        ): <p>SOLD OUT</p>}
                    </div>
                    <div className="div-size">
                        <p>Size</p>
                        <ul>
                            <li>S</li>
                            <li>M</li>
                            <li>L</li>
                        </ul>
                    </div>
                    <div className="div-buttons">
                        {!soldOut?(
                            <button type="submit" className="btn btn-pink add-bag" onClick={() => addToBag()}>ADD TO BAG</button>
                        ): <button className="btn add-bag disabled" disabled>ADD TO BAG</button>}
                        <button className="like" onClick={handleLike}>
                            <i className={isLiked ? "fa fa-heart" : "fa fa-heart-o"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}