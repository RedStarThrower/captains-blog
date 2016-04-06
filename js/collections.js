import Firebase from 'firebase'
import Backbone from 'bbfire'

export var PostsByUser = Backbone.Firebase.Collection.extend({
	url: "",

	initialize: function(uid) {
		this.url = `https://captains-blog.firebaseio.com/users/${uid}/posts`
	},

})