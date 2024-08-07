const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

//localserver
const db = 'mongodb://localhost:27017/eswade';

//remote server
//const db = 'mongodb://<IP Address >:27017/eswade';

//Static content

app.use('/uploads', express.static(path.join(__dirname, 'public')));
const { notFound, errorHandler } = require('./middleware/errorHandler');
const cors = require('cors');
//morgan logger
const morgan = require('morgan');

const jwt = require('jsonwebtoken');
app.options('*', cors());

//mongoose options
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
// Connect to MongoDB
const connection = mongoose
	.connect(db, options)
	.then(() => {
		console.log('Conneted to Database');
	})
	.catch((err) => console.log('Failed to connect to database' + err));

//Runs when failing to connect to database
mongoose.connection.on('disconnected', () =>
	console.log(' Database server is disconnected')
);
//Runs when triying to connect to database
mongoose.connection.on('connecting', () =>
	console.log('Triyng to connect to database')
);

// bodypaser middleware
app.use(bodyParser.json());
//CORS middleware
app.use(cors());
//Morgan middleware
app.use(morgan('dev'));

//roles route


const structure = require('./routes/structure.route');

//units route
const units = require('./routes/unit.route.');

//roles route
const roles = require('./routes/role.route');

//homesteads route
const homesteads = require('./routes/homestead.route');

//buildings route
const buildings = require('./routes/building.route');

//person route
const person = require('./routes/person.route');

//status routes
const status = require('./routes/status.route');

//status routes
const users = require('./routes/user.route');

//graves routes
const graves = require('./routes/grave.route');

//field routes
const fields = require('./routes/field.route');

//tree routes
const trees = require('./routes/tree.route');

//person route
app.use('/api/v1/person', person);

//intervantion routes
const intervantion = require('./routes/intervantion.route');

//person route
app.use('/api/v1/intervention', intervantion);

//compansation routes
const compansation = require('./routes/compensation.route');

//compansation route
app.use('/api/v1/compensate', compansation);

//units route middleware
app.use('/api/v1/units', units);

//tree route
app.use('/api/v1/trees', trees);

//field route
app.use('/api/v1/fields', fields);

//structure route
app.use('/api/v1/structure', structure);

//impact route
app.use('/api/v1/graves', graves);

//status route
app.use('/api/v1/status', status);

//building route
app.use('/api/v1/buildings', buildings);

//roles route
app.use('/api/v1/roles', roles);

// user route
app.use('/api/v1/users', users);

//rss routeusers
app.use('/api/v1/homesteads', homesteads);

//eroor middleware

// app.use(notFound)
app.use(errorHandler);

//Starts server
app.listen(port, () => {
	console.clear();
	console.log(`Server running at port ${port}`);
});

module.exports = connection;
