angular.module('app').controller('DadosController', function ($scope, Dados) {

    /**
     * Adiciona gráfico de tempo de produção x número de incidentens
     */
    $scope.addGraficoTempoProducao = function () {
        Dados.tempoProducaoNumeroIncidentes().then(function (arr) {
            var dataMat = [];
            var i = 0;
            arr.data.forEach(function (item) {
                dataMat.push([i, item.tempo, item.mediaNumeroIncidentes]);
                i++;
            });
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Number');
            data.addColumn('number', 'Tempo de produção');
            data.addColumn('number', 'Número de incidentes');
            data.addRows(dataMat);
            var chart = new google.charts.Line(document.getElementById('tempoProducaoNumeroIncidentes'));
            chart.draw(data, {});
        });
    };
    
    /**
     * Adiciona gráfico de tempo de revisão x número de incidentens
     */
    $scope.addGraficoTempoRevisao = function () {
        Dados.tempoRevisaoNumeroIncidentes().then(function (arr) {
            var dataMat = [];
            var i = 0;
            arr.data.forEach(function (item) {
                dataMat.push([i, item.tempo, item.mediaNumeroIncidentes]);
                i++;
            });
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Number');
            data.addColumn('number', 'Tempo de revisão');
            data.addColumn('number', 'Número de incidentes');
            data.addRows(dataMat);
            var chart = new google.charts.Line(document.getElementById('tempoRevisaoNumeroIncidentes'));
            chart.draw(data, {});
        });
    };    
});
