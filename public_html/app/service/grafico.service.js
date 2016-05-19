/* global google */
angular.module('app').factory('Grafico', function () {
   
    /**
     * Retorna gráfico de tempo de produção x tempo de produção incidentes
     * 
     * @param {Array} dados
     * @return {Promise}
     */
    function tempoProducaoTempoProducaoIncidentes(dados) {
        var dataMat = [];   
        dataMat.push(['Periodo', 'Produção', 'Incidentes']);
        dados.data.forEach(function (item) {
            dataMat.push([item.periodo, item.producao, item.incidentes]);
        });
        var data = google.visualization.arrayToDataTable(dataMat);
        var chart = new google.charts.Bar(document.getElementById('tempoProducaoTempoProducaoIncidentes'));
        chart.draw(data, {});        
    }
    
    return {
        tempoProducaoTempoProducaoIncidentes:tempoProducaoTempoProducaoIncidentes
    };
});