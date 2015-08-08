import React from 'react';
import { Router, DefaultRoute, Route } from 'react-router';

import MainPage 		from './containers/MainPage';
import HomePage			from './containers/HomePage';
import ProfilePage 	from './containers/ProfilePage';

export default (
	<Route name='app' path='/' handler={MainPage}>
		<Route name='profile' path='profile/:username' handler={ProfilePage} />
		<DefaultRoute handler={HomePage} />
	</Route>
);