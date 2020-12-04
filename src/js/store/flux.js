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
				var products = getStore().products;
				var dbProd = [];
				firebase
					.database()// storageBucket o storage
					.ref("/products")//  /img6.jpg
					.on("value", snapshot => {
						var db = snapshot.val();
						//db.forEach(elem => {
							//console.log(db);
							dbProd = db;
							//prod.push(elem);
						//});
					});

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
