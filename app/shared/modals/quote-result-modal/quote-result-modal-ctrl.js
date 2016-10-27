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

        vm.date_now= $filter('date')(Date.now(),'HH:mm:ss dd/MM/yyyy');
       


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
                memo: vm.content.vm_main.memo_extract || '',
                acts_of_god_included: vm.content.vm_main.acts_of_god_included,

                fair_market_value: vm.content.vm_main.fair_market_value,
                fair_market_value_rate: vm.content.vm_main.fair_market_value_rate, 
                bodily_injury_property_damage : vm.content.vm_main.bodily_injury_property_damage, 
                bodily_injury_premium: vm.content.vm_main.bodily_injury_premium, 
                property_damage_premium: vm.content.vm_main.property_damage_premium, 
                personal_accident_amount: vm.content.vm_main.personal_accident_amount,
                personal_accident_premium_free: vm.content.vm_main.personal_accident_premium_free,
                annual_premiums: vm.content.vm_main.annual_premiums, 
                docstamps: vm.content.vm_main.docstamps, 
                evat: vm.content.vm_main.evat, 
                lgt: vm.content.vm_main.lgt, 
                total_premiums: vm.content.vm_main.total_premiums,

                fair_market_value_format: $filter('number')(vm.content.vm_main.fair_market_value, fractionSize),
                fair_market_value_rate_format: $filter('number')(vm.content.vm_main.fair_market_value_rate, fractionSize),
                bodily_injury_property_damage_format : $filter('number')(vm.content.vm_main.bodily_injury_property_damage, fractionSize),
                bodily_injury_premium_format: $filter('number')(vm.content.vm_main.bodily_injury_premium, fractionSize),
                property_damage_premium_format: $filter('number')(vm.content.vm_main.property_damage_premium, fractionSize),
                personal_accident_amount_format: $filter('number')(vm.content.vm_main.personal_accident_amount, fractionSize),
                annual_premiums_format: $filter('number')(vm.content.vm_main.annual_premiums, fractionSize),
                docstamps_format: $filter('number')(vm.content.vm_main.docstamps, fractionSize),
                evat_format: $filter('number')(vm.content.vm_main.evat, fractionSize),
                lgt_format: $filter('number')(vm.content.vm_main.lgt, fractionSize),
                total_premiums_format: $filter('number')(vm.content.vm_main.total_premiums, fractionSize),
                user: vm.content.vm_main.user,
                template: vm.content.vm_main.template,
                expiration_date: $filter('date')(vm.content.vm_main.expiration_date,'yyyy-MM-dd'),
                expiration_date_format: vm.content.vm_main.expiration_date_format,
                date_now: vm.date_now,  

                cellphone: vm.content.vm_main.cellphone,
                landline: vm.content.vm_main.landline,
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