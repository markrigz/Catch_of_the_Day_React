import React from "react";
import PropTypes from "prop-types";

const Login = (props) => {
	return (
		<nav className="login">
			<h2>InventoryLogin</h2>
			<p>Sign in to manage your store's Inventory</p>
			<button
				className="facebook"
				onClick={() => props.authenticate("Facebook")}
			>
				Log In With Facebook
			</button>
		</nav>
	);
};

Login.propTypes = {
	authenticate: PropTypes.func.isRequired
};

export default Login;
