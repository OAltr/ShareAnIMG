'use strict';

describe('Controller: MainCtrl', function () {

	// load the controller's module
	beforeEach(module('shareAnImgApp'));
	beforeEach(module('socketMock'));

	var MainCtrl,
			scope,
			$httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/api/imgLinks')
			.respond([{link: 'http://www.lessons4living.com/images/penclchk.gif'},
				{link: 'https://blog.optimizely.com/wp-content/uploads/2013/06/Screen-Shot-2013-06-11-at-6.27.42-PM.png'},
				{link: 'http://touchportal.de/wp-content/uploads/2014/06/The-Test-Fun-for-Friends-von-LOTUM-Apps-150x150.png'},
				{link: 'http://www.lessons4living.com/images/penclchk.gif'}]);

		scope = $rootScope.$new();
		MainCtrl = $controller('MainCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of links to the scope', function () {
		$httpBackend.flush();
		expect(scope.allLinks.length).toBe(4);
	});
});
