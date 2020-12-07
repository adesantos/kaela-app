import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

import {AuthProvider} from "./js/store/AuthContext";

import { Banner } from "./js/component/banner";
import { Home } from "./js/views/home";
import Login  from "./js/component/login";
import SignUp  from "./js/component/singup";
import { Wishlist } from "./js/views/wishlist";
import { Bag } from "./js/views/bag";
import { Products } from "./js/views/product-list";
import { SingleProduct } from "./js/views/single-product";

import { Navbar } from "./js/component/navbar";
import { Footer } from "./js/component/footer";

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div className="d-flex flex-column h-100">
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
											<SignUp />
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
				</div>
			</Router>
      </AuthProvider>
	);
}

export default (App);

