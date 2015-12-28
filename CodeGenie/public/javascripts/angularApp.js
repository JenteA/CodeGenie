var app = angular.module('CodeGenie', ['ui.router']);

/*
Bij Single Page applications willen we geen page refreshes en daarom gebruiken we Angular's routing functionaliteit.

We gebruiken $routingProvider om onze routes te beschrijven, en deze service injecteert onze html bestanden in de layout

*/
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
            controller: 'MainCtrl'
        })
        .state('admin', {
            url: '/Admin',
            templateUrl: 'Templates/Admin.html',
            controller: 'LesCtrl',
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
            resolve: {
                lesPromise: ['lessons', function (lessons) {
                    return lessons.getAll();
                }]
            }
        })
        .state('lessen', {
            url: '/lessons/:lesId',
            templateUrl: 'Templates/NieuweOpdracht.html',
            controller: "OpdrachtCtrl",
            resolve: {
                les: ['$stateParams', 'lessons', function($stateParams, lessons) {
                    return lessons.get($stateParams.lesId);
                }]
            }
        })
    $urlRouterProvider.otherwise('/Home');
}]);

// factory to retrieve lessons and create them
app.factory('lessons', ['$http', function ($http) {
    var o = {
        lessons: []
    };
    o.getAll = function() {
        return $http.get('/lessons').success(function (data) {
            angular.copy(data, o.lessons);
        });
    };
    o.get = function(Id) {
        return $http.get('/lessons/' + Id).then(function(res){
            console.log(res.data);
            return res.data;
        });
    };
    o.create = function(lesson) {
        return $http.post('/lessons', lesson).success(function (data) {
            o.lessons.push(data);
        });
    };
    o.addOpdracht = function(lesId, opdracht) {
        return $http.post('/lessons/' + lesId + '/opdrachten', opdracht);
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

app.controller('OpdrachtCtrl', ['$scope', 'lessons', function ($scope, lessons) {
    $scope.lessons = lessons.lessons;
    $scope.inputs = opdrachten.opdrachten;
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
            }
            else
            {
                if (item.radval == 'ja') {
                    needsCode = true;
                }
                else
                {
                    needsCode = false;
                }
                lessons.addOpdracht({
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