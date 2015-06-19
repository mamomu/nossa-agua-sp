(function() {
  var resolve;

  resolve = {
    delay: function($q, $timeout) {
      var delay;
      delay = $q.defer();
      $timeout(delay.resolve, 1000);
      return delay.promise;
    }
  };

  angular.module('nossaAgua', ['ngAnimate', 'ngRoute']).config(function($routeProvider, $locationProvider) {
    return $routeProvider.when("/", {
      templateUrl: 'public/views/home.html',
      controller: 'nossaAguaCtrl',
      resolve: resolve
    }).when("/cantareira", {
      templateUrl: 'public/views/home.html',
      controller: 'cantareiraCtrl',
      resolve: resolve
    }).when("/alto-tiete", {
      templateUrl: 'public/views/home.html',
      controller: 'altoTieteCtrl',
      resolve: resolve
    }).when("/guarapiranga", {
      templateUrl: 'public/views/home.html',
      controller: 'guarapirangaCtrl',
      resolve: resolve
    }).when("/cotia", {
      templateUrl: 'public/views/home.html',
      controller: 'cotiaCtrl',
      resolve: resolve
    }).when("/rio-grande", {
      templateUrl: 'public/views/home.html',
      controller: 'rioGrandeCtrl',
      resolve: resolve
    }).when("/rio-claro", {
      templateUrl: 'public/views/home.html',
      controller: 'rioClaroCtrl',
      resolve: resolve
    }).otherwise({
      redirectTo: '/'
    });
  });

  angular.module('nossaAgua').run(function($rootScope, $location, $timeout, $http) {
    $rootScope.volume = "50%";
    $rootScope.location = $location;
    $http({
      method: "GET",
      url: "http://api.matheus.co/api.json"
    }).success(function(data, status, headers, config) {
      $rootScope.dados = data;
      $('#preload').delay(2000).fadeOut(200);
    }).error(function(data, status, headers, config) {
      console.log("err!");
    });
    $('a').on("click", function() {
      $('#content').fadeOut(1000);
      $('.menu').removeClass('open');
    });
    $rootScope.show = function() {
      $('#content').fadeOut(300);
      $('.menu').removeClass('open');
    };
    $rootScope.convert_case = function(str) {
      return str.toLowerCase().replace(/(^| )(\w)/g, function(x) {
        return x.toUpperCase();
      });
    };
    $rootScope.openMenu = function() {
      $('.menu').addClass('open');
    };
    $rootScope.goTo = function($id) {
      var volume;
      $rootScope.data = $id;
      $rootScope.dia = $rootScope.dados[parseInt($id, 10) + parseInt(1, 10)].value;
      volume = $rootScope.dados[$rootScope.data].value;
      volume = volume.substring(0, volume.length - 2);
      volume = volume.replace(',', '.');
      volume = 100 - volume;
      return $rootScope.volume = volume;
    };
    $rootScope.load = function(id) {
      return $timeout((function() {
        $rootScope.goTo(id);
        $('#content').fadeIn(1500);
        $('#water').css('top', $rootScope.volume + '%');
        $rootScope.water = $rootScope.volume + '%';
        $rootScope.porcentagem_ok = parseInt(100, 10) - $rootScope.volume;
        return $rootScope.porcentagem = $rootScope.porcentagem_ok.toFixed(1);
      }), 1000);
    };
    $rootScope.share = function() {
      $rootScope.sistemaOk = $rootScope.convert_case($rootScope.sistema);
      ga('send', 'event', 'Share', 'Facebook', "" + $rootScope.sistemaOk);
      $rootScope.imageUrl = encodeURIComponent($rootScope.sistema.trim());
      FB.ui({
        method: "feed",
        name: "Sistema " + $rootScope.sistemaOk + " - Nossa Água São Paulo",
        link: "" + ($rootScope.location.absUrl()),
        picture: "http://api.matheus.co/" + $rootScope.imageUrl + "/" + $rootScope.porcentagem + ".png",
        caption: "Nossa Água São Paulo",
        description: "Acompanhe facilmente os níveis das represas que abastecem São Paulo!",
        message: "A represa " + $rootScope.sistemaOk + " encontra-se com " + $rootScope.porcentagem + "% do seu volume de armazenamento."
      });
    };
    $rootScope.shareTwitter = function() {
      $rootScope.sistemaOk = $rootScope.convert_case($rootScope.sistema);
      ga('send', 'event', 'Share', 'Twitter', "" + $rootScope.sistemaOk);
      $rootScope.popUpCenter("https://twitter.com/share?text=O atual nível do Sistema " + ($rootScope.convert_case($rootScope.sistema)) + " é de " + $rootScope.porcentagem + "%25 %23NossaAguaSP", "Twitter", "600", "300");
    };
    return $rootScope.popUpCenter = function(pageURL, title, w, h) {
      var left, targetWin, top;
      left = (screen.width / 2) - (w / 2);
      top = (screen.height / 2) - (h / 2);
      targetWin = window.open(pageURL, title, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
    };
  });

}).call(this);

(function() {
  angular.module('nossaAgua').controller('altoTieteCtrl', function($rootScope, $scope, $timeout) {
    $rootScope.sistema = "alto tietê";
    ga('send', 'event', 'pageView', 'alto tiete');
    return $rootScope.load('4');
  });

}).call(this);

(function() {
  angular.module('nossaAgua').controller('cantareiraCtrl', function($rootScope, $scope, $timeout) {
    $rootScope.sistema = "cantareira";
    ga('send', 'event', 'pageView', "" + $rootScope.sistema);
    return $rootScope.load('0');
  });

}).call(this);

(function() {
  angular.module('nossaAgua').controller('nossaAguaCtrl', function($rootScope, $scope, $timeout) {
    $timeout((function() {
      $rootScope.water = "50%";
      return $scope.show = "show";
    }), 1000);
    return ga('send', 'event', 'pageView', "Home");
  });

}).call(this);

(function() {
  angular.module('nossaAgua').controller('cotiaCtrl', function($rootScope, $scope, $timeout) {
    $rootScope.sistema = "cotia";
    $rootScope.load('12');
    return ga('send', 'event', 'pageView', "" + $rootScope.sistema);
  });

}).call(this);

(function() {
  angular.module('nossaAgua').controller('guarapirangaCtrl', function($rootScope, $scope, $timeout) {
    $rootScope.sistema = "guarapiranga";
    $rootScope.load('8');
    return ga('send', 'event', 'pageView', "" + $rootScope.sistema);
  });

}).call(this);

(function() {
  angular.module('nossaAgua').controller('rioClaroCtrl', function($rootScope, $scope, $timeout) {
    $rootScope.sistema = "rio claro";
    $rootScope.load('20');
    return ga('send', 'event', 'pageView', "" + $rootScope.sistema);
  });

}).call(this);

(function() {
  angular.module('nossaAgua').controller('rioGrandeCtrl', function($rootScope, $scope, $timeout) {
    $rootScope.sistema = "rio grande";
    $rootScope.load('16');
    return ga('send', 'event', 'pageView', "" + $rootScope.sistema);
  });

}).call(this);
