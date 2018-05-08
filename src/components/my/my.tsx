import * as React from "react";
import {Helmet} from "react-helmet";
import Layout from "../common/layout";

export default class My extends React.Component<any, any> {

    render() {
        return (
			<Layout>
                <Helmet>
                    <title>ROOM</title>

                    <meta property="og:title" content="ROOM" />
                    <meta property="og:description" content="ROOM Contents" />

                </Helmet>

                <div>
                    <h2>ROOM Contents</h2>
                </div>
			</Layout>
        )
    }
}


