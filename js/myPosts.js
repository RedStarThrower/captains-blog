import React, {Component} from 'react'
import Header from './header.js'

var MyPosts = React.createClass ({
	render: function() {
		return (
			<div className="myPosts">
				<Header />				
				<div className="navBar">
					<a href="#home">Home</a>
					<a href="#newpost">+ New Post</a>
					<a href="#logout">Sign Out</a>
				</div>
				<p>View all my posts</p>
			</div>
		)
	}
})

export default MyPosts