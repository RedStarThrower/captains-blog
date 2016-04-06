import React, {Component} from 'react'
import Header from './header.js'
import Backbone from 'bbfire'

var NewPost = React.createClass ({

	postTitle: "",
	postContent: "",

	_handlePostTitle: function(e) {
		this.postTitle = e.target.value
	},

	_handlePostContent: function(e) {
		this.postContent = e.target.value
	},

	_savePost: function() {
		var pm = new PostModel()
		console.log(pm)
	},

	getInitialState: function() {
		return {
			postsColl: this.props.postsColl
		}
	},

	render: function() {
		//console.log(this)
		return (
			<div className="newPostPage">
				<Header />				
				<div className="navBar">
					<a href="#home">Home</a>	
					<a href="#myposts">View My Posts</a>	
					<a href="#logout">Sign Out</a>
				</div>
				<div className="newPost">
					<input placeholder="Enter Title..." onKeyDown={this._handlePostTitle} className="postTitle"/>
					<textarea placeholder="The sky is the limit..." onKeyDown={this._handlePostContent} className="postContent"/>
					<button className="addPost" onClick={this._savePost}>Save Post</button>
				</div>
			</div>
		)
	}
})

export default NewPost