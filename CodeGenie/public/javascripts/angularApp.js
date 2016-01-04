var app = angular.module('CodeGenie', ['ui.router', 'auth0', 'angular-storage', 'angular-jwt']);

/*
Bij Single Page applications willen we geen page refreshes en daarom gebruiken we Angular's routing functionaliteit.

We gebruiken $routingProvider om onze routes te beschrijven, en deze service injecteert onze html bestanden in de layout

*/
app.config(['$stateProvider', '$urlRouterProvider', 'authProvider', '$httpProvider', '$locationProvider', 'jwtInterceptorProvider', function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
    $stateProvider

    // route for the home page
        .state('welkom', {
            url: '/Welkom',
            templateUrl: 'Templates/Welkom.html',
            controller: 'MainCtrl'
        })
        .state('about', {
            url: '/About',
            templateUrl: 'Templates/About.html',
            controller: 'MainCtrl'
        })
        .state('home', {
            url: '/Home',
            templateUrl: 'Templates/Home.html',
            controller: 'MainCtrl'
        })
        .state('contact', {
            url: '/Contact',
            templateUrl: 'Templates/Contact.html',
            controller: 'MainCtrl'
        })
        .state('registreer', {
            url: '/Registreer',
            templateUrl: 'Templates/Registreer.html',
            controller: 'MainCtrl'
        })
        .state('indienen', {
            url: '/Indienen',
            templateUrl: 'Templates/Indienen.html',
            controller: 'indienenCtrl',
            data: {requiresLogin : true},
            resolve: {
                lesPromise: ['lessons', function (lessons) {
                    return lessons.getAll();
                }]
            }
        })
        .state('admin', {
            url: '/Admin',
            templateUrl: 'Templates/Admin.html',
            controller: 'LesCtrl',
            data: {requiresLogin : true},
            resolve: {
                lesPromise: ['lessons', function (lessons) {
                    return lessons.getAll();
                }]
            }
        })
        .state('test', {
            url: '/Test',
            templateUrl: 'Templates/Test.html',
            controller: 'MainCtrl'
        })
        .state('nieuweLes', {
            url: '/NieuweLes',
            templateUrl: 'Templates/Nieuweles.html',
            controller: "LesCtrl",
            data: {requiresLogin : true},
            resolve: {
                lesPromise: ['lessons', function (lessons) {
                    return lessons.getAll();
                }]
            }
        })
        .state('lessen', {
            url: '/lessons/:id',
            templateUrl: 'Templates/NieuweOpdracht.html',
            controller: "OpdrachtCtrl",
            data: {requiresLogin : true},
            resolve: {
                les: ['$stateParams', 'lessons', function ($stateParams, lessons) {
                    return lessons.get($stateParams.id);
                }]
            }
        })
        .state('lessenIndienen', {
            url: '/lessons/:id/indienen',
            templateUrl: 'Templates/Opdracht.html',
            controller: "OpdrachtIndienCtrl",
            resolve: {
                les: ['$stateParams', 'lessons', function ($stateParams, lessons) {
                    return lessons.get($stateParams.id);
                }]
            }
        })
        .state('lessenIngediend', {
            url: '/lessons/:id/gemaakteOpdracht',
            templateUrl: 'Templates/lesIngediend.html',
            controller: "OpdrachtIngediendCtrl",
            data: {requiresLogin : true},
            resolve: {
                les: ['$stateParams', 'lessons', function ($stateParams, lessons) {
                    return lessons.getIngediend($stateParams.id);
                }]
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'Templates/Login.html',
            controller: "LoginCtrl",
        })
        .state('logout', {
            url: '/logout',
            templateUrl: 'Templates/Logout.html',
            controller: "LogoutCtrl",
        })
    $urlRouterProvider.otherwise('/Home');

    authProvider.init({
        domain: 'codegenie.eu.auth0.com',
        clientID: 'z2pYYzga31lsxKxEJsXt8vPmWOyUXAEP',
        loginState: 'login'
    });
    // We're annotating this function so that the `store` is injected correctly when this file is minified
    jwtInterceptorProvider.tokenGetter = ['store', function (store) {
        // Return the saved token
        return store.get('token');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
}]);

app.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/');
      }
    }
  });
})

// factory to retrieve lessons and create them
app.factory('lessons', ['$http', function ($http) {
    var o = {
        lessons: []
    };
    o.getAll = function () {
        return $http.get('/lessons').success(function (data) {
            angular.copy(data, o.lessons);
        });
    };
    o.get = function (id) {
        return $http.get('/lessons/' + id).then(function (res) {
            console.log(res.data);
            return res.data;
        });
    };
    o.getIngediend = function (id) {
        return $http.get('/lessons/' + id + '/inleverenOpdrachten').then(function (res) {
            return res.data;
        })
    }
    o.create = function (lesson) {
        return $http.post('/lessons', lesson).success(function (data) {
            o.lessons.push(data);
        });
    };
    o.addOpdracht = function (id, opdracht) {
        return $http.post('/lessons/' + id + '/opdrachten', opdracht);
    }
    o.inleverOpdracht = function (id, opdracht) {
        return $http.post('/lessons/' + id + '/inleverenOpdrachten', opdracht);
    }
    return o;
}]);

// create the controller and inject Angular's $scope
app.controller('MainCtrl', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Hello View!';
});

app.controller("LesCtrl", ['$scope', 'lessons', function ($scope, lessons) {
    $scope.lessons = lessons.lessons;
    $scope.addLesson = function () {
        if (!$scope.les || $scope.les == '') {
            return;
        }
        lessons.create({
            lesTitel: $scope.les
        });
        $scope.les = '';
    };
}]);

app.controller('OpdrachtCtrl', ['$scope', 'lessons', 'les', function ($scope, lessons, les) {
    $scope.lessons = lessons.lessons;
    $scope.les = les;
    $scope.inputs = [
        {
            value: '',
            radval: ''
        }
    ];
    $scope.add = function () {
        $scope.inputs.push({
            value: ''
        });
    };
    $scope.Opdracht = function () {
        var needsCode;
        angular.forEach($scope.inputs, function (item, i) {
            if ((!item.value || item.value == '') && (!item.radval || item.radval == '')) {
                return;
            } else {
                if (item.radval == 'ja') {
                    needsCode = true;
                } else {
                    needsCode = false;
                }
                lessons.addOpdracht(les._id, {
                    opdrachtTitel: item.value,
                    heeftCode: needsCode
                });
                console.log(item);
                item.value = '';
                item.radval = '';
            }
        });
    };
}]);
app.controller('indienenCtrl', ['$scope', 'lessons', function ($scope, lessons) {
    $scope.lessons = lessons.lessons;
}]);
app.controller('OpdrachtIndienCtrl', ['$scope', 'lessons', 'les', function ($scope, lessons, les) {
    $scope.les = les;
    var isMade;
    $scope.indienen = function () {
        angular.forEach($scope.les.opdrachten, function (item, i) {
            if (!item.radval || item.radval == '') {
                return;
            } else {
                console.log(item.opdrachtTitel);
                if (item.radval == 'ja') {
                    isMade = true;
                } else {
                    isMade = false;
                }
                if (!item.value) {
                    item.value = '';
                }
                console.log(item.opdrachtTitel);
                lessons.inleverOpdracht(les._id, {
                    opdrachtID: item._id,
                    opdrachttitel: item.opdrachtTitel,
                    isGemaakt: isMade,
                    code: item.value
                });
                item.radval = '';
                item.value = '';
            }
        });
    };
}]);
app.controller('OpdrachtIngediendCtrl', ['$scope', 'les', function ($scope, les) {
    $scope.les = les;
    console.log($scope.les.gemaakteOpdrachten);
}]);

app.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
        $scope.login = function () {
            auth.signin({}, function (profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/');
            }, function () {
                // Error callback
            });
        };
        $scope.logout = function () {
            auth.signout();
            store.remove('profile');
            store.remove('token');
        };


}]);
app.controller('LogoutCtrl', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
        $scope.logout = function () {
            auth.signout();
            store.remove('profile');
            store.remove('token');
        };


}]);
