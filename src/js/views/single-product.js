import React, { useState, useEffect, useContext } from "react";
import firebase from '../config';
import {AuthContext} from "../store/AuthContext";
import { useParams } from "react-router-dom";
import { useObjectVal } from "react-firebase-hooks/database";
import { useDownloadURL } from "react-firebase-hooks/storage";

export function SingleProduct(){
    const {currentUser} = useContext(AuthContext);
	const user = currentUser? currentUser.uid: 0;
    /*PARAMS*/
    const params = useParams();
    const id = params.id;
    var emptyBag = false;
    /*LIKED BY ID*/
    const likePathBYId = firebase.database().ref("liked/"+params.idl);//BY ID
	/*LIKED*/
    const likePath = firebase.database().ref("liked/");
    const [dbLikePath, loadingLp, errorLp] =  useObjectVal(likePath);
	const liked = (dbLikePath)? dbLikePath : loadingLp;
	var emptyLike = likePath? false : true;
    /*PRODUCTS*/
    const prodRef = firebase.database().ref("products/"+id);
    const [dbproduct, loading, error] =  useObjectVal(prodRef);
    const product = (dbproduct)? dbproduct : loading;
    /*IMAGES*/
    const dbImgs = firebase.storage().ref(product.img);
    const [dbimg, loadingImg, errorImg] = useDownloadURL(dbImgs);
    const url = (dbimg)? dbimg : loadingImg;
    /*ETC*/
    const [isLiked, updateLike] = useState(params.l ==="true"?true:false);

    const [count, setCount] = useState(1);
    const price = parseFloat(product.price).toFixed(2);
    const [sizeSelected, setSizeSlect] = useState(false);
    const [size, setSize] = useState(null);
    
    /*DB BAG*/
    const bag = firebase.database().ref("bag/");
    const [dbbag, loadingB, errorB] =  useObjectVal(bag);
    emptyBag = dbbag? false : true;
    const [lastId, setLast] = useState([]);
    const [exists, setExist] = useState([]);

    const bagByid = firebase.database().ref("bag/"+exists.id);//BY ID
    const [dbbagByid, loadingBb, errorBb] =  useObjectVal(bagByid);
    const shopBag = dbbagByid? dbbagByid : loadingBb;

    /*LAST ITEM IN THE BAG TO GET THE LAST ID*/
    useEffect(() => {
        bag.limitToLast(1).once("child_added", function (snapshot) {
            var id;
            if(snapshot.exists()){
                id = snapshot.val();
                setLast(id.id);
            }else{
                emptyBag=true;
            }
        })
      }, []);

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
    /*CHECKE IF THE ITEM EXISTS*/
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
		if(isLiked){
			likePathBYId.remove();
		}else{
			if(currentUser){
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
            }
        }
        updateLike(!isLiked);
    };
    
	function handleCountMinus() {
		setCount(count - 1);
	}

	function handleCountPlus() {
        setCount(count + 1);
    }
    
    function handleSize(s){
        setSizeSlect(!sizeSelected);
        //if(s===size && !sizeSelected){
       //     setSize(null);
        //}else{
            setSize(s);
        //}
        
    }
    function addToBag(){
        if(currentUser){
            if(size && sizeSelected){
                if(emptyBag){
                    bag.child(1).set({
                        "id": 1,
                        "idItem": product.id,
                        "qty": count,
                        "price": price,
                        "userId": user,
                        "l": size==="L"?"L":"",
                        "m": size==="M"?"M":"",
                        "s": size==="S"?"S":""
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
                        var sizeS = shopBag.s? shopBag.s: (size==="S"?"S":"");
                        var sizeM = shopBag.m? shopBag.m: (size==="M"?"M":"");
                        var sizeL = shopBag.l? shopBag.l: (size==="L"?"L":"");
                        bag.child(exists.id).update({
                            'qty': validateQty, 
                            'l': sizeL, 
                            "m": sizeM,
                            "s": sizeS});
                    }else{
                        var last = Number(lastId)+1;
                        var id = last? last : 1;
                        bag.child(id).set({
                            "id": id,
                            "idItem": product.id,
                            "qty": count,
                            "price": price,
                            "userId": user,
                            "l": size==="L"?"L":"",
                            "m": size==="M"?"M":"",
                            "s": size==="S"?"S":""
                        });
                    }
                }
                alert("WOOHOO!!! New item in your bag!");
            }else{
                alert("Please Select the SIZE!");
            }
        }else{
            alert("SIGN IN TO ADD ITEMS IN YOUR BAG!");
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
                            {product.s>0?(
                                <li><button className={sizeSelected? " ": "not-selected"} onClick={() => handleSize("S")}>S</button></li>
                            ):null}
                            {product.m>0?(
                                <li><button className={sizeSelected? " ": "not-selected"} onClick={() => handleSize("M")}>M</button></li>
                            ):null}
                            {product.l>0?(
                                <li><button className={sizeSelected? " ": "not-selected"} onClick={() => handleSize("L")}>L</button></li>
                            ):null}
                        </ul>
                    </div>
                    <div className="div-buttons">
                        {!soldOut?(
                            <button type="submit" className="btn btn-pink add-bag" onClick={() => addToBag()}>ADD TO BAG</button>
                        ): <button className="btn add-bag disabled" disabled>ADD TO BAG</button>}
                        <button className="like" onClick={() => handleLike()}>
                            <i className={isLiked ? "fa fa-heart" : "fa fa-heart-o"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}