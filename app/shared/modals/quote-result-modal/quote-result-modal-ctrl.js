;(function (){
    'use strict'

    angular
        .module('app')
        .controller('QuoteResultModalCtrl', QuoteResultModalCtrl);

    QuoteResultModalCtrl.$inject = ['$scope', '$cookies', '$uibModalInstance',
                                     '$timeout', 'message', 'QueryService','DataService','$filter'];
    function QuoteResultModalCtrl($scope, $cookies, $uibModalInstance, 
                                    $timeout, message, QueryService, DataService, $filter) {
        var vm     = this,
            ids    = message.keys;
        vm.content = message; 
        vm.data    = message.data;

        vm.approve = approve;
        vm.cancel  = cancel;
        vm.response = {};

        vm.content.btn_name = 'Email Quote';

        function approve () {

            if (vm.content.btn_name == 'Close') {
                $uibModalInstance.close();
                return 1;
            }    

            vm.content.btn_name = 'Sending Quote';

            var fractionSize = 2;
            var objectPost = {
                email: vm.content.vm_main.email,
                name: vm.content.vm_main.name,
                reference_number: vm.content.vm_main.reference_number,
                car_insurance_for: vm.content.vm_main.year + ' ' + vm.content.vm_main.make + ' ' +
                            vm.content.vm_main.model + ' ' + vm.content.vm_main.type,
                insurance_company: vm.content.vm_main.insurance_company,
                fair_market_value: $filter('number')(vm.content.vm_main.fair_market_value, fractionSize),
                fair_market_value_rate: $filter('number')(vm.content.vm_main.fair_market_value_rate, fractionSize),
                bodily_injury_property_damage : $filter('number')(vm.content.vm_main.bodily_injury_property_damage, fractionSize),
                bodily_injury_premium: $filter('number')(vm.content.vm_main.bodily_injury_premium, fractionSize),
                property_damage_premium: $filter('number')(vm.content.vm_main.property_damage_premium, fractionSize),
                personal_accident_amount: $filter('number')(vm.content.vm_main.personal_accident_amount, fractionSize),
                personal_accident_premium: $filter('number')(vm.content.vm_main.personal_accident_premium, fractionSize),
                annual_premiums: $filter('number')(vm.content.vm_main.annual_premiums, fractionSize),
                docstamps: $filter('number')(vm.content.vm_main.docstamps, fractionSize),
                evat: $filter('number')(vm.content.vm_main.evat, fractionSize),
                lgt: $filter('number')(vm.content.vm_main.lgt, fractionSize),
                total_premiums: $filter('number')(vm.content.vm_main.total_premiums, fractionSize)
            };

            
            
            DataService.post('send/email', objectPost)
                        .then(function (data, status, headers, config) {
                            vm.content.btn_name = 'Close';
                            console.log(data);
                         // handle success things
                        });

                


        }

        function cancel () {
            $uibModalInstance.close();
        }

    }


})();