(function() {
    'use strict';
    
    var loginService = function($http) {
        
        var authenticate = function(username, password) {
            if (!username || !password)
                throw new Error('Username or password not provided');

            return $http.post('/v1/auth', {
                username: username,
                password: password
            });
        }
        
        return {
            authenticate: authenticate
        }
    };
    
    angular.module('fgallery-services').service(
        'LoginService',
        [ '$http', loginService ]
    );
})();