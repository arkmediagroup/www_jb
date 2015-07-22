angular.module('starter', ['ionic','starter.controllers','ionic.service.core', 'ionic.service.push','ngOpenFB'])

.run(function($ionicPlatform, $ionicPopup, $timeout, ngFB) {
  ngFB.init({appId: '399023356964955'});
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $ionicPlatform.registerBackButtonAction(function () {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Jakarta Balconies',
     template: 'Are you sure you want to exit?'
    });
    confirmPopup.then(function(res) {
     if(res) {
      navigator.app.exitApp();
     }
    });
  }, 100);
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID for the server
    app_id: 'ce564208',
    // The API key all services will use for this app
    api_key: 'AIzaSyC-4X-TOTtdNFy52CEYe-DytzWv7caEWlk',
    // The GCM project number
    gcm_id: '409426641173'
  });
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    cache: false,
    url: "/app",
    abstract: true,
    templateUrl: "views/page.html",
    controller: 'AppCtrl'
  })

  .state('app.about_us', {
    cache: false,
    url: "/about_us",
    views: {
      'page_content': {
        templateUrl: "views/about_us.html",
        controller: 'about_us_ctrl'
      }
    }
  })

  .state('app.select_apartment', {
    cache: false,
    url: "/select_apartment",
    views: {
      'page_content': {
        templateUrl: "views/select_apartment.html",
        controller: 'select_apartment_ctrl'
      }
    }
  })

  //Apartment =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  .state('app.apartment', {
    cache: false,
    url: "/apartment",
    views: {
      'page_content': {
        templateUrl: "views/apartment/list.html",
        controller: 'apartment_ctrl'
      }
    }
  })

  .state('app.apartment_details', {
    cache: false,
    url: "/apartment_details/:apartment_id",
    views: {
      'page_content': {
        templateUrl: "views/apartment/details.html",
        controller: 'apartment_details_ctrl'
      }
    }
  })

  .state('app.apartment_category_1', {
    cache: false,
    url: "/apartment_category_1/:apartment_id/:level",
    views: {
      'page_content': {
        templateUrl: "views/apartment/highlight.html",
        controller: 'apartment_highlight_ctrl'
      }
    }
  })

  .state('app.apartment_category_2', {
    cache: false,
    url: "/apartment_category_2/:apartment_id/:level",
    views: {
      'page_content': {
        templateUrl: "views/apartment/gallery.html",
        controller: 'apartment_gallery_ctrl'
      }
    }
  })

  .state('app.apartment_category_3', {
    cache: false,
    url: "/apartment_category_3/:apartment_id/:level",
    views: {
      'page_content': {
        templateUrl: "views/apartment/info.html",
        controller: 'apartment_info_ctrl'
      }
    }
  })

  //Class Communities
  .state('app.class_communities', {
    cache: false,
    url: "/class_communities",
    views: {
      'page_content': {
        templateUrl: "views/class/list.html",
        controller: 'class_communities_ctrl'
      }
    }
  })
  .state('app.class_communities_details', {
    cache: false,
    url: "/class_communities_details/:class_id",
    views: {
      'page_content': {
        templateUrl: "views/class/details.html",
        controller: 'class_communities_details_ctrl'
      }
    }
  })

  //Class Communities
  .state('app.events', {
    cache: false,
    url: "/events",
    views: {
      'page_content': {
        templateUrl: "views/events/list.html",
        controller: 'events_ctrl'
      }
    }
  })
  .state('app.events_details', {
    cache: false,
    url: "/events_details/:events_id",
    views: {
      'page_content': {
        templateUrl: "views/events/details.html",
        controller: 'events_details_ctrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/app/about_us');
});
