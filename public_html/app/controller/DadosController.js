angular.module('app').controller('DadosController', function ($scope, Dados) {

    
    $scope.teste = "asdasd";
    
    /**
     * Adiciona gráfico de tempo de produção x número de incidentens
     */
    $scope.addGraficoTempoProducao = function () {
        Dados.tempoProducaoNumeroIncidentes().then(function(arr){
//            console.log(arr);
            
            var data = [];
            var i = 0;
            arr.data.forEach(function(item){
                data.push({x: i, a: item.tempo, b: item.mediaNumeroIncidentes});
                i++;
            });
        
        
            new Morris.Line({
                element: 'tempoProducaoNumeroIncidentes',
                data: data,
                xkey: 'x',
                ykeys: ['a','b'],
                labels: ['a','b']
            });            
            
        });
        
        
    };

});