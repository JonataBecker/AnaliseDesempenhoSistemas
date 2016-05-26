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
     * Retorna informações de tempo médio de revisão x tempo médio produção incidentes
     * 
     * @param {String} periodo
     * @return {Promise}
     */
    function tempoRevisaoIncidentesMedio(periodo) {
        var filtro = "?order.campo=Percentual_Revisao&order.tipo=ASC";
        if (periodo) {
//            filtro += "&filtro.campo=periodo&filtro.condicao=IGUAL&filtro.valor=" + periodo;
        }        
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/TEMPO_REVISAO" + filtro);
    }
    
    /**
     * Retorna informações de tempo médio de revisão
     * 
     * @return {Promise}
     */
    function tempoRevisaoMedio() {
        var filtro = "?order.campo=Percentual_Revisao&order.tipo=ASC";
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/TEMPO_MEDIO_REVISAO" + filtro);
    }    
    
    /**
     * Retorna informações do periodo selecionado
     * 
     * @param {String} periodo
     * @return {Promise}
     */
    function informacaoPeriodo(periodo) {
        var filtro = "";
//        if (periodo) {
//            filtro = "?filtro.campo=periodo&filtro.condicao=IGUAL&filtro.valor=" + periodo;
//        }
        return $http.get("http://localhost:8080/AnaliseDesempenhoSistemasWebService/api/INFORMACAO_PERIODO" + filtro);
    }
    
    return {
        tempoProducaoTempoProducaoIncidentes:tempoProducaoTempoProducaoIncidentes,
        tempoRevisaoMedio:tempoRevisaoMedio,
        tempoRevisaoIncidentesMedio:tempoRevisaoIncidentesMedio,
        informacaoPeriodo:informacaoPeriodo
    };
});