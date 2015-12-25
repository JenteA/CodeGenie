var app = angular.module('CodeGenie', ['ngRoute']);

/*
Bij Single Page applications willen we geen page refreshes en daarom gebruiken we Angular's routing functionaliteit.

We gebruiken $routingProvider om onze routes te beschrijven, en deze service injecteert onze html bestanden in de layout

*/
app.config(function ($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/Welkom', {
            templateUrl: 'Templates/Welkom.html',
            controller: 'MainCtrl'
        })
        .when('/About', {
            templateUrl: 'Templates/About.html',
            controller: 'MainCtrl'
        })

        .when('/Home', {
            templateUrl: 'Templates/Home.html',
            controller: 'MainCtrl'
        })

        .when('/Contact', {
            templateUrl: 'Templates/Contact.html',
            controller: 'MainCtrl'
        })
        .when('/Registreer', {
            templateUrl: 'Templates/Registreer.html',
            controller: 'MainCtrl'
        })
        .when('/Indienen', {
            templateUrl: 'Templates/Indienen.html',
            controller: 'MainCtrl'
        })
        .when('/Admin', {
            templateUrl: 'Templates/Admin.html',
            controller: 'LesCtrl',
            resolve: {
                lesPromise: ['lessons', function(lessons){
                    return lessons.getAll();
                }]
            }
        })
        .when('/Test', {
            templateUrl: 'Templates/Test.html',
            controller: 'MainCtrl'
        })
        .when('/NieuweLes', {
            templateUrl: 'Templates/Nieuweles.html',
            controller: "LesCtrl",
            resolve: {
                lesPromise: ['lessons', function(lessons){
                    return lessons.getAll();
                }]
            }
        })
        .when('/lessons/:lesId', {
            templateUrl: 'Templates/NieuweOpdracht.html',
            controller: "OpdrachtCtrl"
    })
    $routeProvider.otherwise({
        redirectTo: '/Welkom'
    });
});

app.factory('lessons', ['$http', function ($http) {
    var o = {
        lessons: []
    };
    o.getAll = function () {
        return $http.get('/lessons').success(function (data) {
            angular.copy(data, o.lessons);
        });
    };
    o.create = function (lesson) {
        return $http.post('/lessons', lesson).success(function (data) {
            o.lessons.push(data);
        });
    };
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

app.controller('OpdrachtCtrl', ['$scope', '$routeParams', 'lessons', function($scope, $routeParams, lessons){
    $scope.lesId = $routeParams.lesId;
    $scope.inputs = [
        {value: '' }
    ];
    $scope.add = function () {
        $scope.inputs.push({
            value: ''
        });
    };
}]);
