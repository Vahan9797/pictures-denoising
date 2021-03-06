import express, { Router } from 'express';
import { json, urlencoded } from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import { createEngine } from 'express-react-views';
import restController from './helpers/rest-controller';
import { RESPONSE, MESSAGES, MAX_FILE_SIZE } from './helpers/constants';
import env from './config/environment';

const { ERROR, NOT_FOUND } = RESPONSE;

const app = express();
const api = Router();

// Setting up react server-rendering -->
app.set('views', path.join(__dirname, '/../src'));
app.set('view engine', env('VIEW_ENGINE'));
app.engine(env('VIEW_ENGINE'), createEngine({ beautify: true }));
// <--

app.get('/', (req, res) => {
  res.render('index', { browserSyncUrl: !env('NODE_ENV', 'production') && `${env('PROTOCOL')}://${env('HOST')}:${+env('PORT') + 1}` });
});

app.use('/public', express.static('public'));
app.use('/scripts', express.static('node_modules/bootstrap/dist'));
app.use('/roboto-font', express.static('node_modules/typeface-roboto'));
app.use(urlencoded({ limit: MAX_FILE_SIZE.size, defer: true, extended: true }));
app.use(json({ limit: MAX_FILE_SIZE.size }));

if(!env('NODE_ENV', 'production')) {
  app.use(morgan('dev'));
}

app.use('/api', restController(api));

app.use((req, res, next) => {
  let err = new Error(MESSAGES[NOT_FOUND]);
  err.status = NOT_FOUND;
  next(err);
});

app.use((err, req, res, next) => {
  const defaultCase = new Error(MESSAGES[ERROR]);
  err.status = err.status || ERROR;
  defaultCase.status = ERROR;
  res.status(err.status || defaultCase.status).render('index', {
    errorMsg: err.message || defaultCase.message,
    error: err || defaultCase
  });
});

const server = app.listen(env('PORT') || 8080, () => console.log('Listening to port %d', server.address().port));