resolve = 
  delay: ($q, $timeout) ->
    delay = $q.defer()
    $timeout delay.resolve, 1000
    delay.promise

angular
  .module('nossaAgua',[
    'ngAnimate',
    'ngRoute'
  ])
  .config ($routeProvider, $locationProvider ) ->
    $routeProvider
      .when "/",
        templateUrl: 'public/views/home.html'
        controller: 'nossaAguaCtrl'
        resolve: resolve
      .when "/cantareira",
        templateUrl: 'public/views/home.html'
        controller: 'cantareiraCtrl'
        resolve: resolve
      .when "/alto-tiete",
        templateUrl: 'public/views/home.html'
        controller: 'altoTieteCtrl'
        resolve: resolve
      .when "/guarapiranga",
        templateUrl: 'public/views/home.html'
        controller: 'guarapirangaCtrl'
        resolve: resolve
      .when "/cotia",
        templateUrl: 'public/views/home.html'
        controller: 'cotiaCtrl'
        resolve: resolve
      .when "/rio-grande",
        templateUrl: 'public/views/home.html'
        controller: 'rioGrandeCtrl'
        resolve: resolve
      .when "/rio-claro",
        templateUrl: 'public/views/home.html'
        controller: 'rioClaroCtrl'
        resolve: resolve
      .otherwise
        redirectTo: '/'

angular
  .module('nossaAgua').run ($rootScope, $location, $timeout, $http) ->
    $rootScope.volume = "50%"
    $rootScope.location = $location
    $http(
      method: "GET"
      url: "http://api.matheus.co/api.json"
    ).success((data, status, headers, config) ->
      $rootScope.dados = data
      $('#preload').delay(2000).fadeOut(200)
      return
    ).error (data, status, headers, config) ->
      console.log "err!"
      return

    $('a').on "click", ->
      $('#content').fadeOut(1000)
      $('.menu').removeClass('open')
      return

    $rootScope.show = ->
      $('#content').fadeOut(300)
      $('.menu').removeClass('open')
      return

    $rootScope.convert_case = (str) ->
      str.toLowerCase().replace /(^| )(\w)/g, (x) ->
        x.toUpperCase()

    $rootScope.openMenu = ->
      $('.menu').addClass('open')
      return

    $rootScope.goTo = ($id) ->
      $rootScope.data = $id
      $rootScope.dia = $rootScope.dados[parseInt($id, 10) + parseInt(1, 10)].value
      volume = $rootScope.dados[$rootScope.data].value
      volume = volume.substring(0, volume.length - 2)
      volume = volume.replace(',', '.')
      volume = 100 - volume

      $rootScope.volume = volume

    $rootScope.load = (id) ->
      $timeout (->
        $rootScope.goTo(id)
        $('#content').fadeIn(1500)
        $('#water').css 'top', $rootScope.volume + '%'
        $rootScope.water = $rootScope.volume + '%'
        $rootScope.porcentagem_ok = parseInt(100, 10) - $rootScope.volume
        $rootScope.porcentagem = $rootScope.porcentagem_ok.toFixed(1)
      ), 1000


    $rootScope.share = () ->
      $rootScope.sistemaOk = $rootScope.convert_case($rootScope.sistema)
      ga('send', 'event', 'Share', 'Facebook', "#{$rootScope.sistemaOk}")
      $rootScope.imageUrl = encodeURIComponent($rootScope.sistema.trim())
      FB.ui
        method: "feed"
        name: "Sistema #{$rootScope.sistemaOk} - Nossa Água São Paulo"
        link: "#{$rootScope.location.absUrl()}"
        picture: "http://api.matheus.co/#{$rootScope.imageUrl}/#{$rootScope.porcentagem}.png"
        caption: "Nossa Água São Paulo"
        description: "Acompanhe facilmente os níveis das represas que abastecem São Paulo!"
        message: "A represa #{$rootScope.sistemaOk} encontra-se com #{$rootScope.porcentagem}% do seu volume de armazenamento."

      return

    $rootScope.shareTwitter = ->
      $rootScope.sistemaOk = $rootScope.convert_case($rootScope.sistema)
      ga('send', 'event', 'Share', 'Twitter', "#{$rootScope.sistemaOk}")
      $rootScope.popUpCenter("https://twitter.com/share?text=O atual nível do Sistema #{$rootScope.convert_case($rootScope.sistema)} é de #{$rootScope.porcentagem}%25 %23NossaAguaSP", "Twitter", "600", "300")
      return



    $rootScope.popUpCenter = (pageURL, title, w, h) ->
      left = (screen.width / 2) - (w / 2)
      top = (screen.height / 2) - (h / 2)
      targetWin = window.open(pageURL, title, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left)
      return
