import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { createEngine } from 'express-react-views';
import restController from './helpers/rest-controller';
import { RESPONSE, MESSAGES } from './helpers/constants';

const { ERROR, NOT_FOUND } = RESPONSE;

const app = express();
const api = express.Router();

// Setting up react server-rendering -->
app.set('views', path.join(__dirname, '/../src'));
app.set('view engine', 'js');
app.engine('js', createEngine({ beautify: true }));
// <--

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/public', express.static('public'));
app.use('/scripts', express.static('node_modules/bootstrap/dist'));
app.use('/roboto-font', express.static('node_modules/typeface-roboto'));
app.use(bodyParser.urlencoded({ defer: true, extended: true }));
app.use(bodyParser.json());

app.use('/api', restController(api));

app.use((req, res, next) => {
    let err = new Error(MESSAGES[NOT_FOUND]);
    err.status = NOT_FOUND;
    next(err);
});

app.use((err, req, res, next) => {
    const defaultCase = new Error(MESSAGES[ERROR]);
    defaultCase.status = ERROR;

    res.status(err.status || defaultCase.status).render('index', {
        errorMsg: err.message || defaultCase.message,
        error: err || defaultCase
    });
});

const server = app.listen(8080, () => console.log('Listening to port %d', server.address().port));