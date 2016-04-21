angular.module('app').controller('AppController', function ($scope) {
    $scope.$on('$viewContentLoaded', function (event) {
        $('#side-menu').metisMenu();
    });
});