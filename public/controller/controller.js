var myApp = angular.module('myApp', []);

myApp.controller('ContactCtrl', ['$scope', '$http', function ($scope, $http) {

    // GET data from Server

    var refresh = function () {
        $http({
            method: 'GET',
            url: "/contactList"
        }).then(function (success) {
            console.log("data comes from server")
            $scope.contactList = success.data;
            console.log($scope.contactList)
        }, function (error) {
            console.log(error + "data not loaded")
        });
    };

    refresh()
    // post data to server
    $scope.addcontact = function () {
        console.log($scope.contact);

        $http.post("/contactList", $scope.contact).then(function (data, status) {
            console.log(data);
            refresh()
        })
    };
    // removing data from server and controller

    $scope.remove = function (id) {
        $http.delete('/contactList/' + id, $scope.contact).success(function (data, status) {
            console.log(data);
            refresh()
        });
    };

    // edit data
  $scope.edit = function(id) {
  console.log(id);
  $http.get('/contactList/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

    // update
    $scope.update = function () {
        console.log($scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id).success(function (response) {
            refresh();
        })
    };
}]);