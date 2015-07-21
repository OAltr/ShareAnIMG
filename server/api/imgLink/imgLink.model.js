'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var ImgLinkSchema = new Schema({
	link: String,
	owner: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('ImgLink', ImgLinkSchema);
