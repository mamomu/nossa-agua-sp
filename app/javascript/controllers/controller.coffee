angular.module('nossaAgua').controller 'nossaAguaCtrl', ($rootScope, $scope, $timeout) ->
  
  $timeout (->
    $rootScope.water = "50%"
    $scope.show = "show"
  ), 1000

  ga('send', 'event', 'pageView', "Home")

  
  # $timeout (->
  #   $scope.home = "home"
  # ), 2500
  