import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import App from '../shared/app';

let dynamicPath = {
    path:reactPath.path,
    componentName:reactPath.componentName,
    initialData: JSON.parse(reactPath.initialData)
};

const Root = () => {
    return (
        <BrowserRouter>
            <App {...dynamicPath.initialData} />
        </BrowserRouter>
    )
};

ReactDOM.hydrate(
    <Root />,
    document.getElementById('root')
);

if (module.hot) {
	module.hot.accept();
}

