import React from "react";
import Login from "./login"
import Singup from "./singup"

export function LoginPage() {
	return (
		<div className="col-12 padding-bottom">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">LOGIN</h4>
				</div>

				<div className="col-6 margin-top login">
					<h4>Sign In</h4>
					<hr className="w-100" />
					<form>
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
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>

				<div className="col-6 margin-top login">
					<h4>Create Account</h4>
					<hr className="w-100" />
					<form>
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
						<div className="form-group">
							<label htmlFor="exampleInputPassword1">Confirm Password</label>
							<input type="password" className="form-control" id="exampleInputPassword1" />
						</div>
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}