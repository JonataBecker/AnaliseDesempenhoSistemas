angular.module('app').controller('SimuladorController', function ($scope, Dados) {

    /** Informações por periodo */
    $scope.informacoes = {};
    $scope.faixas = [];
    $scope.faixasPercentualCorrecao = [];
    init();

    /**
     * Adiciona gráfico de tempo de revisão médio
     */
    $scope.addGraficoTempoRevisaoMedio = function () {
        if ($scope.faixas.length === 0) {
            return;
        }
        var dataMat = [];
        $scope.faixas.forEach(function (item) {
            dataMat.push([item.intervalo, parseInt(item.percentualProducao)]);
        });
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Tempo revisao');
        data.addColumn('number', 'Percentual de tempo gasto');
        data.addRows(dataMat);
        var chart = new google.charts.Line(document.getElementById('tempoRevisaoMedio'));
        chart.draw(data, {});
    };
    
    /**
     * Função responsável pela troca de percentuais de produção
     * 
     * @param {Number} index
     */
    $scope.changeValue = function(index) {
        if ($scope.interterval) {
            clearTimeout($scope.interterval);
        }
        $scope.interterval = setTimeout(function(){
            while(true) {
                var total = $scope.faixas.map((obj) => parseInt(obj.percentualProducao)).reduce((ant, pro) => ant + pro);
                if (total === 100) {
                    $scope.$apply();
                    calculaTempoCorrecao();
                    $scope.addGraficoTempoRevisaoMedio();
                    return;
                }
                var changeIndex = index;
                // Se possui indice anterior
                if ($scope.indexAnterior !== undefined) {
                    changeIndex = $scope.indexAnterior + 1;
                }
                if (changeIndex > 9) {
                    changeIndex = 0;
                }
                // Se indice for igual ao indice em processamento
                if (changeIndex === index) {
                    changeIndex++;
                }
                if (changeIndex > 9) {
                    changeIndex = 0;
                }
                $scope.indexAnterior = changeIndex;
                $scope.faixas[changeIndex].percentualProducao = parseInt($scope.faixas[changeIndex].percentualProducao) + ((total > 100) ? -1 : 1);
                if ($scope.faixas[changeIndex].percentualProducao < 0) {
                    $scope.faixas[changeIndex].percentualProducao = 0;
                }
                if ($scope.faixas[changeIndex].percentualProducao >= 100) {
                    $scope.faixas[changeIndex].percentualProducao = 100;
                }
            }
        }, 200);
    };
    
    /**
     * Retorna faixa de percentuais
     * 
     * @param {String} intervalo
     * @returns {Object}
     */
    function getFaixa(intervalo) {
        var objIntervalo = $scope.faixasPercentualCorrecao.filter((obj) => obj.intervalo === intervalo);
        if (objIntervalo.length === 0) {
            return undefined;
        }
        return objIntervalo[0];
    }

    /**
     * Retorna percentual de correção
     * 
     * @param {Object} faixaCorrecao
     * @returns {Number}
     */
    function getPercentualCorrecao(faixaCorrecao) {
        if (!faixaCorrecao) {
            return 0;
        }
        return faixaCorrecao.incidentes;
    }
    
    /**
     * Retorna percentual de revisão
     * 
     * @param {Object} faixaCorrecao
     * @returns {Number}
     */
    function getPercentualRevisao(faixaCorrecao) {
        if (!faixaCorrecao) {
            return 0;
        }
        return parseFloat(faixaCorrecao.percentualRevisaoMedio);
    }
    
    /**
     * Executa calcula do tempo correção
     */
    function calculaTempoCorrecao() {
        if ($scope.faixas.length === 0 || 
                $scope.faixasPercentualCorrecao.length === 0 || 
                !$scope.informacoes.totalProducaoHoras) {
            return;
        }
        var tempoRevisao = 0;
        var total = 0;
        $scope.faixas.forEach(function(faixa){
            var faixaCorrecao = getFaixa(faixa.intervalo);
            var totalHoras = ($scope.informacoes.totalProducaoHorasMinutos * (faixa.percentualProducao / 100));
            total += totalHoras * (getPercentualCorrecao(faixaCorrecao) / 100);
            tempoRevisao += totalHoras * (getPercentualRevisao(faixaCorrecao) / 100);
        });
        $scope.informacoes.horasCorrecao = total / 60; 
        $scope.informacoes.horasRevisao = tempoRevisao / 60; 
        $scope.informacoes.horasTotal = $scope.informacoes.horasRevisao + $scope.informacoes.totalImplementacaoHoras; 
        $scope.$apply();
    }

    /**
     * Função responsável pelas rotinas iniciais
     */
    function init() {
        Dados.tempoRevisaoMedio().then(function (arr) {
            var faixas = [];
            arr.data.forEach(function(faixa){
                faixas.push(faixa);
            });
            $scope.faixas = faixas;
            calculaTempoCorrecao();
            setTimeout(function(){
                $scope.addGraficoTempoRevisaoMedio();
            },1000);
        });
        Dados.tempoRevisaoIncidentesMedio().then(function (arr) {
            $scope.faixasPercentualCorrecao = arr.data;
            calculaTempoCorrecao();
        });        
        Dados.informacaoPeriodo().then(function (dados) {
            $scope.informacoes = dados.data[0];
            calculaTempoCorrecao();
        });        
    }
});

