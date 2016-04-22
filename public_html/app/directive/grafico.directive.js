angular.module('app').directive('grafico', function ($timeout) {
    return {
        scope: {
            idGrafico: '@idGrafico',
            title: '@title',
            load: '&load'
        },
        templateUrl: 'app/directive/grafico.html',
        link: function ($scope) {
            $timeout(function(){
                $scope.load();
            });
        }
    };
});

