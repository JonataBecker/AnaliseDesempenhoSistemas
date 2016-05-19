angular.module('app').controller('DadosController', function ($scope, Dados, Grafico, Data) {

    /** Informações por periodo */
    $scope.informacoes = {};
    init();

    /**
     * Adiciona gráfico de tempo de produção x tempo de produção de incidentes
     */
    $scope.addGraficoTempoProducaoTempoProducaoIncidentes = function () {
        Dados.tempoProducaoTempoProducaoIncidentes().then(function (dados) {
            Grafico.tempoProducaoTempoProducaoIncidentes(dados);
        });
    };

    /**
     * Adiciona gráfico de tempo de revisão médio x tempo produção incidentes médio
     */
    $scope.addGraficoTempoRevisaoIncidentesMedio = function () {
        Dados.tempoRevisaoIncidentesMedio(Data.formatPeriodo($scope.periodo)).then(function (arr) {
            var dataMat = [];
            arr.data.forEach(function (item) {
                dataMat.push([item.intervalo, item.incidentes]);
            });
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Tempo revisao');
            data.addColumn('number', 'Tempo de produção inicidentes');
            data.addRows(dataMat);
            var chart = new google.charts.Line(document.getElementById('tempoRevisaoIncidentesMedio'));
            chart.draw(data, {});
        });
    };

    /**
     * Adiciona gráfico de tempo de revisão médio
     */
    $scope.addGraficoTempoRevisaoMedio = function () {
        Dados.tempoRevisaoMedio(Data.formatPeriodo()).then(function (arr) {
            var dataMat = [];
            arr.data.forEach(function (item) {
                dataMat.push([item.intervalo, item.percentualRevisao]);
            });
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Tempo revisao');
            data.addColumn('number', 'Percentual de tempo gasto');
            data.addRows(dataMat);
            var chart = new google.charts.Line(document.getElementById('tempoRevisaoMedio'));
            chart.draw(data, {});
        });
    };

    /**
     * Função reponsável por rotinas de inicialização
     */
    function init() {
        $scope.periodo = new Date('2016-04-01');
        buscaInformacoes(Data.formatPeriodo($scope.periodo));
        $scope.$watch('periodo', function (value) {
            if (value) {
                var data = Data.formatPeriodo(value);
                buscaInformacoes(data);
            }
        });
    }

    /**
     * Carrega informações de acordo com o periodo
     * 
     * @param {String} periodo
     */
    function buscaInformacoes(periodo) {
        Dados.informacaoPeriodo(periodo).then(function (dados) {
            $scope.informacoes = dados.data[0];
        });
    }
});
