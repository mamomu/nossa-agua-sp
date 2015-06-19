angular.module('nossaAgua').controller 'rioClaroCtrl', ($rootScope, $scope, $timeout) ->

  $rootScope.sistema = "rio claro"
  $rootScope.load('20')
    
  ga('send', 'event', 'pageView', "#{$rootScope.sistema}")