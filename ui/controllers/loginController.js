(function() {
    'use strict';
    
    var loginController = function($scope, $localStorage, $location, LoginService) {
        $scope.invalidData = false;

        $scope.performLogin = function() {
            debugger;
            LoginService.authenticate($scope.username, $scope.password).then(function(res, err) {
                if (err) {
                    $scope.invalidData = true;
                    return;
                }
                
                if (res.data.success) {
                    $localStorage.token = res.data.token;
                    $location.path('/');
                } else {
                    $scope.invalidData = true;
                }
            });
        }
    };
    
    angular.module('fgallery-controllers').controller(
        'LoginController',
        [ '$scope', '$localStorage', '$location', 'LoginService', loginController ]
    );
})();