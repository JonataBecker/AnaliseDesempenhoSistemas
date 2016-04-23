angular.module('app').factory('Dados', function ($http) {
   
    /**
     * Retorna informações de tempo de produtoção x numero de incidentes
     * 
     * @return {Promise}
     */
    function tempoProducaoNumeroIncidentes() {
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/TEMPO_PRODUCAO");
    }

    /**
     * Retorna informações de tempo de revisão x numero de incidentes
     * 
     * @return {Promise}
     */
    function tempoRevisaoNumeroIncidentes() {
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/TEMPO_REVISAO");
    }
    
    return {
        tempoProducaoNumeroIncidentes:tempoProducaoNumeroIncidentes,
        tempoRevisaoNumeroIncidentes:tempoRevisaoNumeroIncidentes
    };
});