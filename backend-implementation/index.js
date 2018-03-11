import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createEngine } from 'express-react-views';
import restController from './rest-controller';

const app = express();
const router = express.Router();

// Setting up react server-rendering -->
app.set('views', path.join(__dirname, '/../src'));
app.set('view engine', 'js');
app.engine('js', createEngine({ beautify: true }));
// <--

restController(router);

app.use('/public', express.static('public'));
app.use('/scripts', express.static('node_modules/bootstrap/dist'));
app.use('/roboto-font', express.static('node_modules/typeface-roboto'));
app.use(bodyParser({ defer: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(8080, () => console.log('Listening to port %d', server.address().port));