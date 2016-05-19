angular.module('app').factory('Data', function () {
    
    /**
     * Função responsável por adicionar zeros a esqueda
     * 
     * @param {Number} num
     * @param {Number} quantidade
     * @returns {String}
     */
    function zeros(num, quantidade) {
        if (!num) {
            return num;
        }
        if (num.toString().length >= quantidade) {
            return num;
        }
        var buff = "";
        for (var i = 0; i < (quantidade - num.toString().length); i++) {
            buff += "0";
        }
        return buff + num;
    }

    /**
     * Função responsável pela formatação de data em formato de Periodo
     * 
     * @param {Date} data
     * @returns {String}
     */
    function formatPeriodo(data) {
        if (!data) {
            return "";
        }
        return data.getFullYear() + '-' + zeros(data.getMonth() + 1, 2);
    }

    return {
        formatPeriodo: formatPeriodo
    };
});