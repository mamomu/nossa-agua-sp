angular.module('nossaAgua').controller 'guarapirangaCtrl', ($rootScope, $scope, $timeout) ->

  $rootScope.sistema = "guarapiranga"
  $rootScope.load('8')
  
  ga('send', 'event', 'pageView', "#{$rootScope.sistema}")