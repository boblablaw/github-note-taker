import React 					from 'react';
import StyleSheet 		from 'react-style';
import HomePageStyles	from './HomePageStyles.js';
import ReactLogo			from '../elements/ReactLogo'

export default class Home extends React.Component{
	render(){
		return (
			<h2 styles={HomePageStyles.foo} className="text-center">
				Search by GitHub Username Above
				<div>
				<ReactLogo type="svg" /> <ReactLogo type="png" /> <ReactLogo type="jpg" />
				</div>
			</h2>
		)
	}
};