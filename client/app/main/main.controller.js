'use strict';

angular.module('shareAnImgApp')
	.controller('MainCtrl', function ($scope, $http, Auth, socket) {
		$scope.allLinks = [];
		$scope.isLoggedIn = Auth.isLoggedIn;

		$http.get('/api/imgLinks').success(function(allLinks) {
			$scope.allLinks = allLinks;
			socket.syncUpdates('imgLink', $scope.allLinks);
		});

		$scope.userIsOwner = function(link) {
			return link.owner === Auth.getCurrentUser()._id;
		};

		$scope.addLink = function() {
			if($scope.newLink === '') {
				return;
			}
			$http.post('/api/imgLinks', { link: $scope.newLink, owner: Auth.getCurrentUser()._id });
			$scope.newLink = '';
		};

		$scope.deleteLink = function(link) {
			$http.delete('/api/imgLinks/' + link._id);
		};

		$scope.$on('$destroy', function () {
			socket.unsyncUpdates('imgLink');
		});
	});
