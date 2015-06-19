angular.module('nossaAgua').controller 'altoTieteCtrl', ($rootScope, $scope, $timeout) ->

  $rootScope.sistema = "alto tietê"
  ga('send', 'event', 'pageView', 'alto tiete')
  $rootScope.load('4')