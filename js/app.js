var app = angular.module("employeeApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/employees.html',
            controller: 'employeesController'
        })
        .when('/create', {
            templateUrl: 'templates/create.html',
            controller: 'createController'
        })
        .when('/read/:id', {
            templateUrl: 'templates/read.html',
            controller: 'readController'
        })
        .when('/update/:id', {
            templateUrl: 'templates/update.html',
            controller: 'updateController'
        })
        .when('/delete/:id', {
            templateUrl: 'templates/delete.html',
            controller: 'deleteController'
        })
        .otherwise({
            redirectTo: '/'
        })
});

app.controller("employeesController", function ($scope, $http) {
    $http.get("http://localhost:8888/employee_crud_app/php/employees.php")
        .then(function (response) {
            $scope.employees = response.data;
        });
});

app.controller("readController", function ($scope, $http, $routeParams) {
    $http({
        url: "http://localhost:8888/employee_crud_app/php/read.php",
        params: {id: $routeParams.id},
        method: "get"
    })
        .then(function (response) {
            $scope.read = response.data;
        });
});

app.controller("deleteController", function ($scope, $http, $routeParams) {
    $http({
        url: "http://localhost:8888/employee_crud_app/php/delete.php",
        params: {id: $routeParams.id},
        method: "get"
    })
        .then(function (response) {
            $scope.delete = response.data;
        });
});
app.controller("updateController", function ($scope, $http, $routeParams) {

    $http({
        url: "http://localhost:8888/employee_crud_app/php/read.php",
        params: {id: $routeParams.id},
        method: "get"
    })
        .then(function (response) {
            $scope.update = response.data;
        });


    $scope.saveUpdate = function () {

        $scope.update = {
            name: $scope.update.name,
            address: $scope.update.address,
            salary: $scope.update.salary
        };

        console.log(JSON.stringify($scope.update));
        if ($scope.update.name === "" || $scope.update.address === "" || $scope.update.salary === "") {
            $("#msg").html("Missing required fields");
        } else {
            $http({
                url: "http://localhost:8888/employee_crud_app/php/update.php",
                method: "POST",
                params: {id: $routeParams.id}
            })
                .then(function successCallback(response) {
                    $scope.update = response.data;
                }, function errorCallback(response) {
                    $scope.error = response.statusText;
                });
        }
    }

});
app.controller("createController", function ($scope) {
    $scope.create = {
        name:"",
        address:"",
        salary:""
    };
    $scope.save = function () {
        //console.log(JSON.stringify($scope.create));
        var dataString = $("#createForm").serialize();
        if ($scope.create.name === "" || $scope.create.address === "" || $scope.create.salary === "") {
            $("#msg").html("Missing required fields");
        } else {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8888/employee_crud_app/php/create.php',
                data: dataString,
                cache: false,
                success: function (result) {
                    $("#msg").html(result);
                    $scope.create.name = $("#name").val("");
                    $scope.create.address = $("#address").val("");
                    $scope.create.salary = $("#salary").val("");
                }
            });
        }
        return false;
    };
});
