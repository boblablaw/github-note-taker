import React from 'react';
import Router from 'react-router';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import helpers from '../utils/helpers';

var Profile = React.createClass({
	mixins: [Router.State, ReactFireMixin],

	getInitialState: function() {
		return {
			notes: [],
			bio: {},
			repos: []
		}
	},
	init: function(){
		let childRef = this.ref.child(this.getParams().username);
		this.bindAsArray(childRef, 'notes');

		helpers.getGithubInfo(this.getParams().username)
			.then(function(dataObj){
				this.setState({
					bio: dataObj.bio,
					repos: dataObj.repos
				})
			}.bind(this));
	},
	componentDidMount: function() {
		this.ref = new Firebase('https://note-taker-github.firebaseio.com');
		this.init();
	},
	componentWillUnmount: function() {
		this.unbind('notes');
	},
	componentWillReceiveProps: function(){
		this.unbind('notes');
		this.init();
	},
	handleAddNote: function(newNote) {
		this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
	},
	render: function() {
		let username = this.getParams().username;
		return (
			<div className="row">
        <div className="col-md-4">
          <UserProfile username={username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes 
          	username={username} 
          	notes={this.state.notes} 
          	addNote={this.handleAddNote} />
        </div>
      </div>
    )
	}
});

export default Profile;