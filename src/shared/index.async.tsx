import * as React from "react";


function asyncComponent(getComponent) {
    return class AsyncComponent extends React.Component<any, any> {
        static Component = null;

        constructor(props) {
            super(props);

            this.state = { Component: AsyncComponent.Component };
        }

        componentWillMount() {
            if (!this.state.Component) {
                getComponent().then(({default: Component}) => {
                    AsyncComponent.Component = Component;
                    this.setState({ Component })
                })
            }
        }
        render() {
            const { Component } = this.state;
            if (Component) {
                return <Component {...this.props} />
            }
            return null
        }
    }
}

const Home = asyncComponent(() => import('../components/home/Main'));
const My = asyncComponent(() => import('../components/my/my'));

export {
    Home,
    My
}

