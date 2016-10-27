;(function (){
    'use strict';

    angular
        .module('app')
        .controller('QuoteCtrl', QuoteCtrl);

    QuoteCtrl.$inject = ['$scope', '$state','ModalService', 'QueryService','logger','$uibModalStack','$location','DataService'];

    function QuoteCtrl($scope, $state, ModalService, QueryService,logger, $uibModalStack,$location,DataService) {
        var vm = this;
        
        vm.titleHeader = 'Quotes';
       
        vm.sort = sort;
         
        
        
        vm.removeCustomerModal = removeCustomerModal;
        vm.viewQuote = viewQuote;
        
        

        vm.data = {};
        vm.data_final = [];


         vm.pager = {};
      
        function initController() {
              vm.data_final =Object.values(vm.data.data); //reassign data because it is empty
        }

        function sort(keyname){
            vm.sortKey = keyname;   //set the sortKey to the param passed
            vm.reverse = !vm.reverse; //if true make it false and vice versa
        }
           

        function message_modal () {
            var content =  {
                header:'Message',
                message:'Hello World!'
            }
            ModalService.confirm_modal(content);
        }

        function removeCustomerModal() {
            var content =  {
                header:'Remove Customer',
                message:'Are you sure you want to remove this customer?'
            }
            ModalService.remove_customer_modal(content);
        }

        function viewQuote(id) {
            var content =  {
                header:'View Quote',
                message:'',
                id: id,
            }
            ModalService.view_quote_modal(content);   
        }



        DataService.post('quote/retrieve')
                        .then(function (data, status, headers, config) {
                           
                vm.data = data;
                initController();
                         // handle success things
        }, function (err) {
                logger.error(MESSAGE.error, err, '');
        });

        /*(function getPost () {
            var params = {}
            var route = {
                quote : "retrieve"
            }
            https://jsonplaceholder.typicode.com/users
           QueryService.query('GET', false, false, false, false, route)
           .then(function (response) {
                vm.data = response.data;
                
                // logger.success('',response, MESSAGE.success);
           }, function (err) {
                logger.error(MESSAGE.error, err, '');
           })
           .then(function(response) {
                initController();
           })
        })() */
    }
})();