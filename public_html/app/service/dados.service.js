angular.module('app').factory('Dados', function ($http) {
   
    /**
     * Retorna informações de tempo de produtoção x numero de incidentes
     * 
     * @return {Promise}
     */
    function tempoProducaoNumeroIncidentes() {
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/TEMPO_PRODUCAO");
    }
    
    return {
        tempoProducaoNumeroIncidentes:tempoProducaoNumeroIncidentes
    };
});