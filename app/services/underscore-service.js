;(function (){
    'use strict';

    angular
        .module('app')
        .factory('_', _);

    _.$inject = ['$window'];

    function _($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }
    
})();
