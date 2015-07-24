'use strict';

angular.module('shareAnImgApp')
	.controller('MainCtrl', function ($scope, $http, Auth, socket, angularGridInstance) {
		$scope.allLinks = [];
		$scope.isLoggedIn = Auth.isLoggedIn;

		$http.get('/api/imgLinks').success(function(allLinks) {
			$scope.allLinks = allLinks;

			// TODO: To Fix #1 either:
				// - find a way to do a working reload of the grid
				// or
				// - load the images using $http and then add ta an image array
			$scope.refresh = function() {
				angularGridInstance.gallery.refresh();
			};

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
