import React, { useContext } from "react";
import firebase from '../config';
import {AuthContext} from "../store/AuthContext";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export const Navbar = () => {
	const {currentUser} = useContext(AuthContext);
    if(currentUser){
		var email, uid;
		email = currentUser.email;
		uid = currentUser.uid;
		console.log(uid);
	}
	return (
		<nav className="navbar navbar-expand-lg">
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon" />
			</button>
			<div id="navbarNav" className="collapse navbar-collapse">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/products" className="nav-link">
							LINGERIE
						</Link>
					</li>
				</ul>
			</div>

			<div className="kaela-brand">
				<Link to="/" className="navbar-brand">
					KAELA SHOP
				</Link>
			</div>

			<div className="justify-content-end">
				<ul className="navbar-nav">
					{
						!currentUser?(
							<li className="nav-item">
								<Link to="/login" className="nav-link">
									<i className="fa fa-user" />
								</Link>
							</li>
						):
						<li className="nav-item dropdown">
							<DropdownButton variant="none" id="" title={<i className="fa fa-user" />}>
								<Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
								<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
								<hr className="w-100"/>
								<Dropdown.Item href="/login" onClick={() => firebase.auth().signOut()}>Sign Out</Dropdown.Item>
							</DropdownButton>
						</li>
					}
					<li className="nav-item">
						<Link to="/wishlist" className="nav-link" href="#">
							<i className="fa fa-heart" />
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/bag" className="nav-link" href="#">
							<i className="fa fa-shopping-bag" />
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
/*

<li className="nav-item">
						<a className="nav-link" href="#">
							SHOP
						</a>
					</li>
<li className="nav-item">
						<form className="form-inline my-2 my-lg-0 search">
							<input
								className="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<a className="btn my-2 my-sm-0" type="submit">
								<i className="fa fa-search" />
							</a>
						</form>
					</li>
					*/