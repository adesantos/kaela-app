import React, {useState, useEffect, useRef, useContext} from 'react';
import firebase from '../config';
import { useParams } from "react-router-dom";
import {AuthContext} from "../store/AuthContext";
import { BagCheckout } from "../views/bagCheckout";
import { useObjectVal } from "react-firebase-hooks/database";

export function Checkout() {
    const {currentUser} = useContext(AuthContext);
	  const user = currentUser? currentUser.uid: 0;
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    const paypalRef = useRef();
    const params = useParams();
    const product = {
        price: params.total,
        description: 'QUANTITY'
    };

    const bag = firebase.database().ref("bag");
    const [db_product, loadingB, errorB] =  useObjectVal(bag);
    var products = db_product;

    useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: product.description,
                    amount: {
                      currency_code: 'USD',
                      value: product.price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              setPaidFor(true);
              console.log(order);
            },
            onError: err => {
              setError(err);
              console.error(err);
            },
          })
          .render(paypalRef.current);
      }, [product.description, product.price]);


    if (paidFor) {
        return (
          <div>
            <h1>Congrats! Your items are on their way!</h1>
          </div>
        );
      }
  
    return (
        <div className="col-12 text-center">
            <div className="row items-row bag-checkout">
              {!db_product?(
                  loadingB
                ): Object.keys(products).map(function(i) {
                  if(products[i].qty>0 && user===products[i].userId){
                    return (
                      <BagCheckout key={i} {...products[i]}/>
                    );
                  }
                })}
            </div>
            {error && <div>Uh oh, an error occurred! {error.message}</div>}
            <div><h3>TOTAL US${params.total}</h3></div>
            <div ref={paypalRef} />
        </div>
    );
}
