/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var User = require('../api/user/user.model');
var Link = require('../api/imgLink/imgLink.model');

var testUserID = new ObjectId();
var adminUserID = new ObjectId();

User.find({}).remove(function() {
	User.create({
		_id: testUserID,
		provider: 'local',
		name: 'Test User',
		email: 'test@test.com',
		password: 'test'
	}, {
		_id: adminUserID,
		provider: 'local',
		role: 'admin',
		name: 'Admin',
		email: 'admin@admin.com',
		password: 'admin'
	}, function() {
			console.log('finished populating users');
		}
	);
});

Link.find({}).remove(function() {
	Link.create({
		link: 'http://www.lessons4living.com/images/penclchk.gif',
		owner: testUserID
	}, {
		link: 'https://blog.optimizely.com/wp-content/uploads/2013/06/Screen-Shot-2013-06-11-at-6.27.42-PM.png',
		owner: adminUserID
	}, {
		link: 'http://touchportal.de/wp-content/uploads/2014/06/The-Test-Fun-for-Friends-von-LOTUM-Apps-150x150.png',
		owner: testUserID
	}, {
		link: 'http://www.lessons4living.com/images/penclchk.gif',
		owner: testUserID
	}, function() {
			console.log('finished populating links');
		}
	);
});
