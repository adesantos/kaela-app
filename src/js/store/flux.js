import React from 'react';
import firebase from "firebase";
//import { PureComponent } from "react";
//import config from "../config";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			products: []
		},
		actions: {
			getProducts: () => {
				//var db;
				/*const useStateWithLocalStorage = localStorageKey => {
					const [value, setValue] = React.useState(
					  localStorage.getItem(localStorageKey) || ''
					);
				   
					React.useEffect(() => {
					  localStorage.setItem(localStorageKey, value);
					}, [value]);
				   
					return [value, setValue];
				  };

				const [value, setValue] = useStateWithLocalStorage(db);*/
				/*firebase
					.database()// storageBucket o storage
					.ref("/products")//  /img6.jpg
					.on("value", snapshot => {
						db = snapshot.val();
			});*/
			//	console.log(dbProd);

				//return products;
				

				//console.log(prod);

				//if(val == "products"){
					
				//}


					/*
					const ref = firebase.storage().ref('/img6.jpg');
					const url = await ref.getDownloadURL();

					// ... in your render

					<Image
					source={{ uri: url }}
					/>
					*/
			}
		}
	};
};

export default getState;
