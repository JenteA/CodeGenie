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
            controller: 'MainCtrl'
        })
        .when('/Test', {
            templateUrl: 'Templates/Test.html',
            controller: 'MainCtrl'
        })
        .when('/NieuweLes', {
            templateUrl: 'Templates/Nieuweles.html',
            controller: "LesCtrl"
        })
    $routeProvider.otherwise({
        redirectTo: '/Welkom'
    });
});


// create the controller and inject Angular's $scope
app.controller('MainCtrl', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Hello View!';
});

app.controller("LesCtrl", function ($scope) {
    $scope.inputs = [
        {value: 'titel' }
    ];
    $scope.add = function () {
        $scope.inputs.push({
            value: ''
        });
    };
});
