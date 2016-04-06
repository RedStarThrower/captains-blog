import React, {Component} from 'react'
import Header from './header.js'

var Dashboard = React.createClass ({
	render: function() {
		console.log(this)
		return (
		<div className="dashboard">			
			<Header/>
			<p className="greeting">Welcome, {this.props.email}</p>
			<div className="navBar">
				<a href="#newpost">+ New Post</a>
				<a href="#myposts">View My Posts</a>	
				<a href="#logout">Sign Out</a>
			</div>			
		</div>
		)
	}
})

export default Dashboard

