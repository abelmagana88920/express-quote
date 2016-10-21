;(function (){
    'use strict'

    angular
        .module('app')
        .controller('QuoteResultModalCtrl', QuoteResultModalCtrl);

    QuoteResultModalCtrl.$inject = ['$scope', '$cookies', '$uibModalInstance',
                                     '$timeout', 'message', 'QueryService','DataService'];
    function QuoteResultModalCtrl($scope, $cookies, $uibModalInstance, 
                                    $timeout, message, QueryService, DataService) {
        var vm     = this,
            ids    = message.keys;
        vm.content = message; 
        vm.data    = message.data;

        vm.approve = approve;
        vm.cancel  = cancel;

        function approve () {
            DataService.post('1');
        }

        function cancel () {
            $uibModalInstance.close();
        }

    }


})();