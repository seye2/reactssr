import * as React from "react";
import { Link } from 'react-router-dom';

export default class Gnb extends React.Component<any, any> {
	render() {
		return (
			<div className="header" id="header">
				<div>Navigation</div>

				<ul>
					<li>
						<Link to="/home">home</Link>
					</li>
					<li>
						<Link to="/my">my</Link>
					</li>
				</ul>
			</div>
		)
	}
}


