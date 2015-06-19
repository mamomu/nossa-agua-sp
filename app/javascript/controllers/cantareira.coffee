angular.module('nossaAgua').controller 'cantareiraCtrl', ($rootScope, $scope, $timeout) ->
  
  $rootScope.sistema = "cantareira"
  ga('send', 'event', 'pageView', "#{$rootScope.sistema}")
  $rootScope.load('0')
  
  
    