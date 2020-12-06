import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./js/component/scrollToTop";
import 'font-awesome/css/font-awesome.min.css';
//import firebase from "firebase";
//import {AuthProvider} from "./js/store/AuthContext"
//import PrivateRoute from './js/component/priv-route';

import { Banner } from "./js/component/banner";
import { Home } from "./js/views/home";
import Login  from "./js/component/login";
import Singup  from "./js/component/singup";
import { Wishlist } from "./js/views/wishlist";
import { Bag } from "./js/views/bag";
import { Products } from "./js/views/product-list";
import { SingleProduct } from "./js/views/single-product";
import injectContext from "./js/store/appContext";

import { Navbar } from "./js/component/navbar";
import { Footer } from "./js/component/footer";

//create your first component
const App = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter>
				<ScrollToTop>
					<Navbar />
					<div className="container-fluid">
						<div className="row">
							<Switch>
								<Route exact path="/">
									<Banner />
									<Home />
								</Route>
								<Route exact path="/login">
									<Login />
								</Route>
								<Route exact path="/singup">
									<Singup />
								</Route>
								<Route exact path="/wishlist">
									<Wishlist />
								</Route>
								<Route exact path="/bag">
									<Bag />
								</Route>
								<Route exact path="/products">
									<Products />
								</Route>
								<Route exact path="/single-product/:id/:l">
									<SingleProduct />
								</Route>
								<Route>
									<h1>Not found!</h1>
								</Route>
							</Switch>
						</div>
					</div>
					<Footer />
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(App);

