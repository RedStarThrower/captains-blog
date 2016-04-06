// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"

// universal utils: cache, fetch, store, resource, fetcher, router, vdom, etc
// import * as u from 'universal-utils'

// the following line, if uncommented, will enable browserify to push
// a changed fn to you, with source maps (reverse map from compiled
// code line # to source code line #), in realtime via websockets
// -- browserify-hmr having install issues right now
// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(() => {
//         app()
//     })
// }

// Check for ServiceWorker support before trying to install it
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./serviceworker.js').then(() => {
//         // Registration was successful
//         console.info('registration success')
//     }).catch(() => {
//         console.error('registration failed')
//             // Registration failed
//     })
// } else {
//     // No ServiceWorker Support
// }

import DOM from 'react-dom'
import React, {Component} from 'react'
import Backbone from 'bbfire'
import Firebase from 'firebase'
import SplashPage from './splashPage.js'
import Header from './header.js'
import Dashboard from './dashboard.js'
import NewPost from './newPost.js'
import MyPosts from './myPosts.js'

function app() {
    // start app
    // new Router()
    
    var PostsByUser = Backbone.Firebase.Collection.extend({
   		url: "",

		initialize: function(uid) {
			this.url = `https://captains-blog.firebaseio.com/users/${uid}/posts`
		},
  	})	

     var BlogRouter = Backbone.Router.extend({
    	routes: {
    		"splash": "showSplashPage",
    		"home": "showDashboard",
    		"logout": "handleLogOut",
    		"newpost": "showNewPostPage",
    		"myposts": "showMyPostsPage",
    		"*default": "showSplashPage"
    	},

    	initialize: function() {
    		this.ref = new Firebase("https://captains-blog.firebaseio.com")
    		var auth = this.ref.getAuth()
    		
    		if (!auth) location.hash = "splash"
			
			this.on("all", function() {
				if (!this.ref.getAuth()) location.hash = "splash"
			}, this)
    	},

    	showSplashPage: function() {
    		var boundSignerUpper = this._signUserUp.bind(this)
    		var boundLoggerInner = this._logUserIn.bind(this)

    		DOM.render(<SplashPage error={null} signerUpper={boundSignerUpper} loggerInner={boundLoggerInner}/>, document.querySelector('.container'))
    	},

    	showDashboard: function() {
    		DOM.render(<Dashboard email={this.ref.getAuth().password.email}/>, document.querySelector('.container'))
    	},

    	showNewPostPage: function() {
    		//console.log('current user', this.ref.getAuth() )
       		var pbu = new PostsByUser( this.ref.getAuth().uid )
       		DOM.render(<NewPost postsColl={pbu} />, document.querySelector('.container'))
    	},

    	showMyPostsPage: function() {
    		DOM.render(<MyPosts />, document.querySelector('.container'))
    	},

    	handleLogOut: function() {
    		this.ref.unauth()
    		location.hash = "splash"
    	},

    	_logUserIn: function (submittedEmail, submittedPassword) {
    		var ref = this.ref
    		var boundSignerUpper = this._signUserUp.bind(this)
          	var boundLoggerInner = this._logUserIn.bind(this)
    		var handler = function(error, authData) {
          		if (error) {
            		console.log("Login Failed!", error);
            		DOM.render(<SplashPage error={error} signerUpper={boundSignerUpper} loggerInner={boundLoggerInner}/>,document.querySelector('.container'))
          		} else {
            		console.log("Authenticated successfully with payload:")
            		console.log(authData)

            		location.hash = "home"
          		}
        	}
        
        ref.authWithPassword({
          email    : submittedEmail,
          password : submittedPassword
        }, handler);

    	},

    	_signUserUp: function(submittedEmail, submittedPassword) {    		 		
    		var ref = this.ref
    		var boundSignerUpper = this._signUserUp.bind(this)
    		var boundLoggerInner = this._logUserIn.bind(this)

       		var storeUser = function(userData) {
    			ref.child('users').child(userData.uid).set({email: submittedEmail, posts: ""})
    		}

    		var handler = function(error, userData) {
    			if (error) {
    				console.log("Error creating user:", error)
    				DOM.render(<SplashPage error={error} loggerInner={boundLoggerInner} signerUpper={boundSignerUpper} />,document.querySelector('.container'))
    			}
    			else {
    				console.log("Successfully created user account with uid:", userData.uid); storeUser(userData)
    					boundLoggerInner(submittedEmail, submittedPassword, function() {
    						location.hash = 'home'})    					
       			}
    		}

    		ref.createUser({
    			email: submittedEmail,
    			password: submittedPassword
    		}, handler)
    	}
    })

    var br = new BlogRouter()

    Backbone.history.start()
    
}

app()
