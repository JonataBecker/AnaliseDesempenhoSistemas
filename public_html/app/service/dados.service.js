angular.module('app').factory('Dados', function ($http) {
   
    /**
     * Retorna informações de tempo de produção x tempo de produção incidentes
     * 
     * @return {Promise}
     */
    function tempoProducaoTempoProducaoIncidentes() {
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/TEMPO_PRODUCAO_TEMPO_PRODUCAO_INCIDENTES");
    }
   
    /**
     * Retorna informações de tempo médio de produção x tempo médio produção incidentes
     * 
     * @param {String} dataCriacao
     * @return {Promise}
     */
    function tempoProducaoMedio(dataCriacao) {
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/TEMPO_PRODUCAO");
    }
    
    return {
        tempoProducaoTempoProducaoIncidentes:tempoProducaoTempoProducaoIncidentes,
        tempoProducaoMedio:tempoProducaoMedio
    };
});