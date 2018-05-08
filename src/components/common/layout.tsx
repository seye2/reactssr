import * as React from "react";
import Footer from './footer';
import {Helmet} from 'react-helmet';
/*inject css*/

export default class Layout extends React.Component<any, any> {
    render() {
        return (
            <div className={`wrap ${this.props.hasSubDepthBar ? 'has-sub-depth' : ''}`}>
                <Helmet titleTemplate="%s 좋은 집 구하는 기술, 직방">
                    <meta name="defaultmeta" content="gazua" />
                </Helmet>
                <div className="container">
	                {this.props.children}
                </div>
	            <Footer></Footer>
            </div>
        )
    }
}


