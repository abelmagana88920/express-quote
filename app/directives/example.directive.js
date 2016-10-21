;(function (){
    'use strict';

    angular
        .module('app')
        .directive('exampleDirective', exampleDirective);

    function exampleDirective () {
        return {
                        restrict: 'E',
                        transclude: true,
                        templateUrl: 'app/directives/dir_view/uSortPageDirective.html',
                        scope: {
                             productObject: '=',
                             numberObject: '=',
                             index: '@',
                             parent: '@',
                             wowValue: '@',
                             sizeGrid: '@',
                             menuCategory: '=',
                             modalDisplay: '@',
                             totalCart: '@'
                        },
                        controller: function ($scope) { 

                        
                        },
                       
                        link: function($scope, element, attrs) {
                                       
                        }
        };
    }



})();