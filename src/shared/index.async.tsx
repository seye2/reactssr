import * as React from "react";
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
    loader: () => import('../components/home/Main'),
    loading: Loading,
});

const My = Loadable({
    loader: () => import('../components/my/my'),
    loading: Loading,
});

export {
    Home,
    My
}

