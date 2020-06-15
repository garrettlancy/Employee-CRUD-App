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
    document.getElementById("deleteMessage").hidden = true;
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

app.controller("deleteController", function ($scope, $http, $routeParams, $window) {
    $scope.confirmDelete = function (id) {
        if ($window.confirm("Are you sure?")) {
            $http({
                url: "http://localhost:8888/employee_crud_app/php/delete.php",
                params: {id: id},
                method: "get"
            })
                .then(function (response) {
                    $scope.delete = response.data;
                });

            setTimeout(function () {$window.location.href = 'http://localhost:8888/employee_crud_app/'}, 3000);

            document.getElementById("deleteMessage").hidden = false;
            setTimeout(function () {
                document.getElementById('deleteMessage').hidden = true
            }, 3000);

        } else {
            $window.location.href = 'http://localhost:8888/employee_crud_app/';
        }
    }
});

app.controller("updateController", function ($scope, $http, $routeParams) {
    document.getElementById("updateMessage").hidden = true;

    $http({
        url: "http://localhost:8888/employee_crud_app/php/read.php",
        params: {id: $routeParams.id},
        method: "get"
    }).then(function (response) {
        $scope.update = response.data;
    });

    $scope.saveUpdate = function () {
        $scope.update = {
            name: $scope.update.name,
            address: $scope.update.address,
            salary: $scope.update.salary
        };
        if ($scope.update.name === "" || $scope.update.address === "" || $scope.update.salary === "") {
            $("#failMsg").html("Missing required fields");
        } else {
            $http({
                url: "http://localhost:8888/employee_crud_app/php/update.php",
                method: "POST",
                params: {
                    id: $routeParams.id,
                    name: $scope.update.name,
                    address: $scope.update.address,
                    salary: $scope.update.salary
                }
            }).then(function (response) {
                $scope.update = response.data;

                $http({
                    url: "http://localhost:8888/employee_crud_app/php/read.php",
                    params: {id: $routeParams.id},
                    method: "get"
                }).then(function (response) {
                    $scope.update = response.data;
                });

                document.getElementById("updateMessage").hidden = false;
                setTimeout(function () {
                    document.getElementById('updateMessage').hidden = true
                }, 3000);
            });
        }
    }
});
app.controller("createController", function ($scope) {
    document.getElementById("createMessage").hidden = true;
    $scope.create = {
        name: "",
        address: "",
        salary: ""
    };
    $scope.save = function () {
        //console.log(JSON.stringify($scope.create));
        var dataString = $("#createForm").serialize();
        if ($scope.create.name === "" || $scope.create.address === "" || $scope.create.salary === "") {
            $("#failMsg").html("Missing required fields");
        } else {
            $("#failMsg").html("");
            $.ajax({
                type: 'POST',
                url: "http://localhost:8888/employee_crud_app/php/create.php",
                data: dataString,
                cache: false,
                success: function (result) {
                    $("#msg").html(result);
                    $scope.create.name = $("#name").val("");
                    $scope.create.address = $("#address").val("");
                    $scope.create.salary = $("#salary").val("");

                    document.getElementById("createMessage").hidden = false;
                    setTimeout(function () {
                        document.getElementById('createMessage').hidden = true
                    }, 3000);

                }
            });
        }
        return false;
    };
});
