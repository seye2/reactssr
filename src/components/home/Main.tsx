import * as React from "react";
import {Helmet} from "react-helmet";
import Layout from "../common/layout";


export default class Main extends React.Component<any, any> {
    render() {
        console.log(this.props);
        return (
			<Layout>
                <Helmet>
                    <title>HOME</title>

                    <meta property="og:title" content="HOME" />
                    <meta property="og:description" content="HOME Contents" />

                </Helmet>

                <div>
                    <h2>
                        HOME Contents
                    </h2>
                </div>

			</Layout>
        )
    }
}


