'use strict';

var _ = require('lodash');
var ImgLink = require('./imgLink.model');

// Get list of imgLinks
exports.index = function(req, res) {
	ImgLink.find(function (err, imgLinks) {
		if(err) { return handleError(res, err); }
		return res.status(200).json(imgLinks);
	});
};

// Get a single imgLink
exports.show = function(req, res) {
	ImgLink.findById(req.params.id, function (err, imgLink) {
		if(err) { return handleError(res, err); }
		if(!imgLink) { return res.status(404).send('Not Found'); }
		return res.json(imgLink);
	});
};

// Creates a new imgLink in the DB.
exports.create = function(req, res) {
	ImgLink.create(req.body, function(err, imgLink) {
		if(err) { return handleError(res, err); }
		return res.status(201).json(imgLink);
	});
};

// Updates an existing imgLink in the DB.
exports.update = function(req, res) {
	if(req.body._id) { delete req.body._id; }
	ImgLink.findById(req.params.id, function (err, imgLink) {
		if (err) { return handleError(res, err); }
		if(!imgLink) { return res.status(404).send('Not Found'); }
		var updated = _.merge(imgLink, req.body);
		updated.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.status(200).json(imgLink);
		});
	});
};

// Deletes a imgLink from the DB.
exports.destroy = function(req, res) {
	ImgLink.findById(req.params.id, function (err, imgLink) {
		if(err) { return handleError(res, err); }
		if(!imgLink) { return res.status(404).send('Not Found'); }
		imgLink.remove(function(err) {
			if(err) { return handleError(res, err); }
			return res.status(204).send('No Content');
		});
	});
};

function handleError(res, err) {
	return res.status(500).send(err);
}
