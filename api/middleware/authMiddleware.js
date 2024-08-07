const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const constants = require('../config/constants');

//verify token
const authMiddleware = asyncHandler(async (req, res, next) => {
	let token;
	if (req?.headers?.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1];
		try {
			jwt.verify(token, constants.JWT_SECRET, (err, valid) => {
				if (err && !valid) throw new Error('Token Validation Failed');
			});
			if (token) {
				const decoded = jwt.verify(token, constants.JWT_SECRET);
				const user = await User.findById(decoded.payload._id)
					.select('-password')
					.populate('role');
				req.user = user;
				next();
			}
		} catch (error) {
			throw new Error('Token Validation Failed');
		}
	} else {
		throw new Error('No token found');
	}
});

const isAdmin = asyncHandler(async (req, res, next) => {
	const { email } = req.user;
	const adminUser = await User.findOne({ email })
		.select('-password')
		.populate('role');
		
	if (adminUser.role.role !== 'Admin' && adminUser.role.role !== 'Agent') {
		throw new Error('You dont have admin rights');
	} else {
		next();
	}
});

module.exports = { authMiddleware, isAdmin,  };
