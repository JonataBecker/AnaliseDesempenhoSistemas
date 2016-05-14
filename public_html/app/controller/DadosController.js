angular.module('app').controller('DadosController', function ($scope, Dados, Grafico) {

    /**
     * Adiciona gráfico de tempo de produção x tempo de produção de incidentes
     */
    $scope.addGraficoTempoProducaoTempoProducaoIncidentes = function () {
        Dados.tempoProducaoTempoProducaoIncidentes().then(function (dados) {
            Grafico.tempoProducaoTempoProducaoIncidentes(dados);
        });
    };

    /**
     * Adiciona gráfico de tempo de produção médio x tempo produçaõ médio
     */
    $scope.addGraficoTempoProducaoMedio = function () {
        Dados.tempoProducaoMedio().then(function (arr) {
            var dataMat = [];
            arr.data.forEach(function (item) {
                dataMat.push([item.intervalo, item.incidentes]);
            });
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Tempo produção');
            data.addColumn('number', 'Tempo de produção inicidentes');
            data.addRows(dataMat);
            var chart = new google.charts.Line(document.getElementById('tempoProducaoMedio'));
            chart.draw(data, {});
        });
    };

   
});
