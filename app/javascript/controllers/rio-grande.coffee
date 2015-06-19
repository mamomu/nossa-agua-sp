angular.module('nossaAgua').controller 'rioGrandeCtrl', ($rootScope, $scope, $timeout) ->

  $rootScope.sistema = "rio grande"
  $rootScope.load('16')

  ga('send', 'event', 'pageView', "#{$rootScope.sistema}")