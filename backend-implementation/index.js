const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Setting up react server-rendering -->
app.set('views', path.join(__dirname, '/../src'));
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine({ beautify: true }));
// <--

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload-img', (req, res) => {
	
});

app.get('/download-img', (req, res) => {
	// TODO
});

app.use('/public', express.static('public'));
app.use('/scripts', express.static('node_modules/bootstrap/dist'));
app.use('/roboto-font', express.static('node_modules/typeface-roboto'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
	const defaultCase = new Error('Internal Server Error');
	defaultCase.status = 500;

	res.status(err.status || defaultCase.status).render('index', {
	  errorMsg: err.message || defaultCase.message,
	  error: err || defaultCase
	});
});

app.listen('8080', () => console.log('Listening to port 8080'));