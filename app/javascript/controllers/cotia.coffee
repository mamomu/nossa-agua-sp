angular.module('nossaAgua').controller 'cotiaCtrl', ($rootScope, $scope, $timeout) ->

  $rootScope.sistema = "cotia"
  $rootScope.load('12')
  
  ga('send', 'event', 'pageView', "#{$rootScope.sistema}")
  
  
    