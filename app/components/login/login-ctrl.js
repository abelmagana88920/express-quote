;(function (){
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$state'];

    function LoginCtrl ($scope, $state) {
        var vm         = this;
        vm.hello       = 'hellos';
        vm.admin       = true; 
        vm.showNavItem = true;
        vm.disable     = false;
        vm.isPassword  = false;
        vm.header      = 'Login';
        vm.loading     = 'Logging in...';
        vm.log         = 'Login';

        vm.login  = login;
        vm.forgot = forgot;
        vm.submit = submit;
        vm.display_result=false;
         

        function login (user) {
            $state.go('app.customer');
        }

        function forgot () {

        }

        function submit() {
            vm.fair_market_value_rate = vm.fair_market_value * vm.rate/100;


            if (vm.bodily_injury_property_damage == 50000) {
                vm.bodily_injury_premium = 195;
                vm.property_damage_premium = 975;
            } else if (vm.bodily_injury_property_damage == 75000) {
                vm.bodily_injury_premium = 225;
                vm.property_damage_premium = 1035;
            } else if (vm.bodily_injury_property_damage == 100000) {
                vm.bodily_injury_premium = 270;
                vm.property_damage_premium = 1095;
            } else if (vm.bodily_injury_property_damage == 150000) {
                vm.bodily_injury_premium = 345;
                vm.property_damage_premium = 1170;
            } else if (vm.bodily_injury_property_damage == 200000) {
                vm.bodily_injury_premium = 420;
                vm.property_damage_premium = 1245;
            } else if (vm.bodily_injury_property_damage == 250000) {
                vm.bodily_injury_premium = 510;
                vm.property_damage_premium = 1320;
            } else if (vm.bodily_injury_property_damage == 300000) {
                vm.bodily_injury_premium = 585;
                vm.property_damage_premium = 1395;
            } else if (vm.bodily_injury_property_damage == 400000) {
                vm.bodily_injury_premium = 675;
                vm.property_damage_premium = 1515;
            } else if (vm.bodily_injury_property_damage == 500000) {
                vm.bodily_injury_premium = 780;
                vm.property_damage_premium = 1635;
            } else if (vm.bodily_injury_property_damage == 750000) {
                vm.bodily_injury_premium = 915;
                vm.property_damage_premium = 1920;
            } else if (vm.bodily_injury_property_damage == 1000000) {
                vm.bodily_injury_premium = 1050;
                vm.property_damage_premium = 2235;
            } 

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
        }
    }

})();