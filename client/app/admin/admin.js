'use strict';

angular.module('shareAnImgApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('admin', {
				url: '/admin',
				templateUrl: 'app/admin/admin.html',
				controller: 'AdminCtrl',
				needAdmin: true
			});
	});
