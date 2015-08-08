import React 	from 'react';
import Router from 'react-router';

export default class SearchGithub extends React.Component {
	handleSubmit() {
		let router = this.context.router;
		let username = this.refs.username.getDOMNode().value;
		this.refs.username.getDOMNode().value = '';
		router.transitionTo('profile', {username});
	}

	render() {
		return (
			<div className="col-sm-12">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form-group col-sm-7">
						<input type="text" className="form-control" ref="username" />
					</div>
					<div className="form-group col-sm-5">
						<button type="submit" className="btn btn-block btn-primary">Search Github</button>
					</div>
				</form>
			</div>
		)
	}
};

SearchGithub.contextTypes = {
	router: React.PropTypes.func.isRequired
};