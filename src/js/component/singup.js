import config from "../config";
import React, { useCallback } from "react";
import { withRouter } from "react-router";

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await config
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
	  }
	  
    }, [history]);

	return (
		<div className="col-12 padding-bottom login">
			<div className="row">
				<div className="col-12 text-center">
					<h4 className="margin-top">CREATE ACCOUNT</h4>
					<hr className="w-80" />
				</div>

				<div className="col-6 margin-top login">
					<form onSubmit={handleSignUp}>
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
						<button type="submit" className="btn btn-primary btn-login">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default withRouter(SignUp);