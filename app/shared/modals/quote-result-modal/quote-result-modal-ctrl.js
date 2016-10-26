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
                email: vm.content.vm_main.email_extract,
                name: vm.content.vm_main.name,
                reference_number: vm.content.vm_main.reference_number,
                make: vm.content.vm_main.make,
                year: vm.content.vm_main.year,
                model: vm.content.vm_main.model,
                car_insurance_for: vm.content.vm_main.year + ' ' + vm.content.vm_main.make + ' ' +
                            vm.content.vm_main.model,
                insurance_company: vm.content.vm_main.insurance_company,
                memo: vm.content.vm_main.memo_extract,
                acts_of_god_included: vm.content.vm_main.acts_of_god_included,
                fair_market_value: $filter('number')(vm.content.vm_main.fair_market_value, fractionSize),
                fair_market_value_rate: $filter('number')(vm.content.vm_main.fair_market_value_rate, fractionSize),
                bodily_injury_property_damage : $filter('number')(vm.content.vm_main.bodily_injury_property_damage, fractionSize),
                bodily_injury_premium: $filter('number')(vm.content.vm_main.bodily_injury_premium, fractionSize),
                property_damage_premium: $filter('number')(vm.content.vm_main.property_damage_premium, fractionSize),
                personal_accident_amount: $filter('number')(vm.content.vm_main.personal_accident_amount, fractionSize),
                personal_accident_premium_free: vm.content.vm_main.personal_accident_premium_free,
                annual_premiums: $filter('number')(vm.content.vm_main.annual_premiums, fractionSize),
                docstamps: $filter('number')(vm.content.vm_main.docstamps, fractionSize),
                evat: $filter('number')(vm.content.vm_main.evat, fractionSize),
                lgt: $filter('number')(vm.content.vm_main.lgt, fractionSize),
                total_premiums: $filter('number')(vm.content.vm_main.total_premiums, fractionSize),
                user: vm.content.vm_main.user,
                template: vm.content.vm_main.template,
                expiration_date: vm.content.vm_main.expiration_date_format
            };

            
            
            DataService.post('send/email', objectPost)
                        .then(function (data, status, headers, config) {
                            vm.content.btn_name = 'Close';
                            if (data.success) {
                                alert('Your quote has been sent!');
                            } else {
                                alert('Error in sending quote');
                            }
                         // handle success things
                        });

                


        }

        function cancel () {
            $uibModalInstance.close();
        }

    }


})();