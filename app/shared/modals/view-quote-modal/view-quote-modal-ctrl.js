;(function (){
    'use strict'

    angular
        .module('app')
        .controller('ViewQuoteModalCtrl', ViewQuoteModalCtrl);

    ViewQuoteModalCtrl.$inject = ['$scope', '$cookies', '$uibModalInstance',
                                     '$timeout', 'message', 'QueryService','DataService','$filter'];
    function ViewQuoteModalCtrl($scope, $cookies, $uibModalInstance, 
                                    $timeout, message, QueryService, DataService, $filter) {
        var vm     = this,
            ids    = message.keys;
        vm.content = message; 
        //vm.data    = message.data;

       
        vm.cancel  = cancel;
        vm.response = {};

        vm.content.btn_name = 'Email Quote';

        vm.date_now= $filter('date')(Date.now(),'HH:mm:ss dd/MM/yyyy');
       

        DataService.post('quote/' + vm.content.id)
                        .then(function (data, status, headers, config) {
                           
                vm.data = data.data;
                console.log(vm.data);
                         // handle success things
        });
       

        function cancel () {
            $uibModalInstance.close();
        }

    }


})();