/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ImgLink = require('./imgLink.model');

exports.register = function(socket) {
	ImgLink.schema.post('save', function (doc) {
		onSave(socket, doc);
	});
	ImgLink.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

function onSave(socket, doc, cb) {
	socket.emit('imgLink:save', doc);
}

function onRemove(socket, doc, cb) {
	socket.emit('imgLink:remove', doc);
}
