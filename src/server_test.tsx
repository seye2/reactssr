'use strict';
import * as http from 'http';

import {app} from './app';


const port = 8080;
const server = http.createServer(app);
server.listen(port);

console.log(`listening onaaa http://localhost:${port}`);

