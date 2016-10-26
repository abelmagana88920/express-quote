;(function (){
    'use strict';

    angular
        .module('app')
        .controller('CalculateCtrl', CalculateCtrl);

    CalculateCtrl.$inject = ['$scope', '$state','ModalService','_','$http','$filter'];

    function CalculateCtrl ($scope, $state, ModalService,_,$http,$filter) {

        var vm         = this;
        vm.loadMemo = loadMemo;

        vm.submit = submit;
        vm.display_result=false;

        function loadMemo($query) {
            return $http.get('assets/jsonfile/memo.json', { cache: true}).then(function(response) {
              var countries = response.data;
              return countries.filter(function(country) {
                return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
              });
            });
        }
         /*$scope.loadMemo = function($query) {
            return $http.get('assets/jsonfile/memo.json', { cache: true}).then(function(response) {
              var countries = response.data;
              return countries.filter(function(country) {
                return country.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
              });
            });
          }; */

    
        function submit() {

             if (typeof vm.acts_of_god_included == "undefined") vm.acts_of_god_included = false; //set false
             
             vm.email_extract = _.pluck(vm.email,'text').join(', ');
             vm.memo_extract = _.pluck(vm.memo,'name').join(', ');

             vm.expiration_date_format = $filter('date')(vm.expiration_date, 'MMMM dd, yyyy');


             vm.ref_num = Math.ceil(new Date().getTime()/270);
             vm.ref_name = 'EQ';
             //vm.acts_of_god_rate = 0.25/100;

            vm.fair_market_value_rate = vm.fair_market_value * vm.rate/100;

            //if (vm.acts_of_god_included)  vm.fair_market_value_rate  =  vm.fair_market_value_rate + ( vm.fair_market_value * vm.acts_of_god_rate);

            vm.reference_number = vm.ref_num + '-' + vm.ref_name; 

        
            if (vm.classification == 'PC') {
                 switch (parseInt(vm.bodily_injury_property_damage)) {
                    case 50000:
                                vm.bodily_injury_premium = 195;
                                vm.property_damage_premium = 975;
                                break;
                    case 75000:
                                vm.bodily_injury_premium = 225;
                                vm.property_damage_premium = 1035;
                                break;
                    case 100000:
                                vm.bodily_injury_premium = 270;
                                vm.property_damage_premium = 1095;
                                break;
                    case 150000:
                                vm.bodily_injury_premium = 345;
                                vm.property_damage_premium = 1170;
                                break;
                    case 200000:
                                vm.bodily_injury_premium = 420;
                                vm.property_damage_premium = 1245;
                                break;
                    case 250000:
                                vm.bodily_injury_premium = 510;
                                vm.property_damage_premium = 1320;
                                break;
                    case 300000:
                                vm.bodily_injury_premium = 585;
                                vm.property_damage_premium = 1395;
                                break;
                    case 400000:
                                vm.bodily_injury_premium = 675;
                                vm.property_damage_premium = 1515;
                                break;
                    case 500000:
                                vm.bodily_injury_premium = 780;
                                vm.property_damage_premium = 1635;
                                break;
                    case 750000:
                                vm.bodily_injury_premium = 915;
                                vm.property_damage_premium = 1920;
                                break;
                    case 1000000:
                                vm.bodily_injury_premium = 1050;
                                vm.property_damage_premium = 2235;
                                break;        
                    default:
                                break;
                }
            } else if (vm.classification == 'M') {
                 switch (parseInt(vm.bodily_injury_property_damage)) {
                    case 50000:
                                vm.bodily_injury_premium = 75;
                                vm.property_damage_premium = 450;
                                break;
                    case 75000:
                                vm.bodily_injury_premium = 90;
                                vm.property_damage_premium = 510;
                                break;
                    case 100000:
                                vm.bodily_injury_premium = 105;
                                vm.property_damage_premium = 555;
                                break;
                    case 150000:
                                vm.bodily_injury_premium = 120;
                                vm.property_damage_premium = 645;
                                break;
                    case 200000:
                                vm.bodily_injury_premium = 135;
                                vm.property_damage_premium = 720;
                                break;
                    case 250000:
                                vm.bodily_injury_premium = 150;
                                vm.property_damage_premium = 795;
                                break;
                    case 300000:
                                vm.bodily_injury_premium = 0;
                                vm.property_damage_premium = 0;
                                break;
                    case 400000:
                                vm.bodily_injury_premium = 0;
                                vm.property_damage_premium = 0;
                                break;
                    case 500000:
                                vm.bodily_injury_premium = 0;
                                vm.property_damage_premium = 0;
                                break;
                    case 750000:
                                vm.bodily_injury_premium = 0;
                                vm.property_damage_premium = 0;
                                break;
                    case 1000000:
                                vm.bodily_injury_premium = 0;
                                vm.property_damage_premium = 0;
                                break;        
                    default:
                                break;
                }
            }


            



            vm.personal_accident_amount = 250000;
            vm.personal_accident_premium_free = 'FREE';


            vm.annual_premiums = vm.fair_market_value_rate +
                                    vm.bodily_injury_premium+
                                    vm.property_damage_premium;

            vm.docstamps = 0.125 * vm.annual_premiums;
            vm.evat = 0.12 * vm.annual_premiums;
            vm.lgt = 0.002 * vm.annual_premiums;

            vm.total_premiums = vm.annual_premiums+
                                vm.docstamps+
                                vm.evat+
                                vm.lgt;

            vm.display_result = true;


            var content =  {
                header:'Quote Result',
                vm_main: vm
            }
            ModalService.quote_result_modal(content);


        }
    }

})();