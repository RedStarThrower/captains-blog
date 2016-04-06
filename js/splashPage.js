import React, {Component} from 'react'
import Header from './header.js'

var SplashPage = React.createClass ({

	email: '',
	password: '',

	_handleEmailEntry: function(e) {
		this.email = e.target.value
	},

	_handlePasswordEntry: function(e) {
		this.password = e.target.value
	},

	_handleSignUp: function() {
		this.props.signerUpper(this.email, this.password)
	},

	_handleLogIn: function() {
		this.props.loggerInner(this.email, this.password)
	},

	render: function() {
		//console.log(this)
		var errorMsg = ""
		if (this.props.error !== null)
			errorMsg = "There was a problem with your email or password. Please try again."
		return (
			<div className="splash">
				<Header />
				<div className="loginContainer">
					<p>Welcome, Captain. Please sign in to make a new entry in your log. </p>
					<p className="error">{errorMsg}</p>
					<input placeholder="Enter email" onChange={this._handleEmailEntry} />
					<input type="password" placeholder="Enter password" onChange={this._handlePasswordEntry} />
					<button onClick={this._handleLogIn}>Sign In</button>
					<button onClick={this._handleSignUp}>Sign Up</button>
				</div>
			</div>
		)
	}
})

export default SplashPage

