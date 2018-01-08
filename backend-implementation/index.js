const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
/*const babelConfig = require('babel-register')({
	ignore: ["*.css", "*.scss", "*.svg"],
	only: /src/,
	extensions: ['.jsx', '.js']
});*/

// Setting up react server-rendering -->
app.set('views', path.join(__dirname, '/../src'));
app.set('view engine', 'js');
app.engine('js', require('express-react-views').createEngine());
// <--

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload-img', (req, res) => {
	// TODO
});

app.get('/download-img', (req, res) => {
	// TODO
});

app.use(express.static('public'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
 
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
	  message: err.message,
	  error: err
	});
});

app.listen('8080', () => console.log('Listening to port 8080'));