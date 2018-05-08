import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import Main from '../components/home/Main';
import {Home,My} from './index.async';

import Gnb from '../components/common/gnb';

//61103708318510
//386481
class App extends React.Component {
	render() {
		return (
			<div className="wrapper">

				<Gnb {...this.props}></Gnb>

                {/*<Route path="/" component={Main}/>*/}
                <Route exact path="/" render={
                    (props) => (
						<Home {...this.props} />
                    )
                } />
				<Switch>

                    <Route path="/home" render={
                        (props) => (
							<Home {...this.props} />
                        )
                    } />
					<Route path="/my" render={
                        (props) => (
							<My {...this.props} />
                        )
                    } />
				</Switch>
			</div>
		);
	}
}

export default App;


61103689018399
258466
