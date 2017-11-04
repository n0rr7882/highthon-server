var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const config = require('./config/config');

// connect To DB
const models = require('./models');
models.sequelize
	.sync({ force: config.reset })
	.then(() => {
		console.log('✓ DB connection success.');
	})
	.catch(err => {
		console.error(err);
		console.log('✗ DB connection error. Please make sure DB is running.');
		process.exit();
	});

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
	limits: { fileSize: 50 * 1024 * 1024 }  // 50MB
}));

app.use(require('./tools/authentication'));
app.use((req, res, next) => {
	if (req.body && req.body.data) {
		req.body = JSON.parse(req.body.data);
	}
	next();
});
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500).send({
		status: { success: false, message: err.message }
	});
});

module.exports = app;
