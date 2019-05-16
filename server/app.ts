import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';
import * as routes from './routes';

import { Init } from './db/redis';

/**
 * Client Dir
 * @note `dev` default.
 */
const _clientDir = '../angular-express';

const app: express.Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(compression());

// DB Init
Init();

/**
 * Api Routes
 */
routes.init(app);

/**
 * Static
 */
app.use('/', express.static(path.resolve(__dirname, `${_clientDir}/`)));

/**
 * Spa Res Sender
 */
const renderIndex = (req: express.Request, res: express.Response) => {
  res.sendFile(path.resolve(__dirname, `${_clientDir}/index.html`));
};

/**
 * Prevent server routing and use @ng2-router.
 */
app.get('/*', renderIndex);

/**
 * Server with gzip compression.
 */
const server: http.Server  = app.listen(3000);
const serverPort: number = server.address().port;

console.log(`App is listening on port: ${serverPort}`);
