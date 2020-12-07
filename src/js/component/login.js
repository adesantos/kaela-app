import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import config from "../config";
import { Link } from "react-router-dom";
import {AuthContext} from "../store/AuthContext";

const Login = ({history}) => {

	const handleLogin = useCallback(
		async event => {
		  event.preventDefault();
		  const { email, password } = event.target.elements;
		  try {
			await config
			  .auth()
			  .signInWithEmailAndPassword(email.value, password.value);
			history.push("/");
		  } catch (error) {
			alert(error);
		  }
		},
		[history]
	);
	
	const {currentUser} = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to="/" />;
	}

	return (
		<div className="col-12 padding-bottom login">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">LOGIN</h4>
					<hr className="w-80" />
				</div>

				<div className="col-6 margin-top login">
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<label htmlFor="exampleInputEmail1">Email address</label>
							<input
								name="email"
								type="email"
								className="form-control"
								id="exampleInputEmail1"
								aria-describedby="emailHelp"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Password</label>
							<input name="password" type="password" className="form-control" id="exampleInputPassword1" />
						</div>
						<Link to="/singup">Create Account</Link>
						<button type="submit" className="btn btn-primary btn-login">
							Login
						</button>
					</form>
					
				</div>
				
			</div>
		</div>
	);
}

export default withRouter(Login);