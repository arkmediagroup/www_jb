angular.module('starter', ['ionic','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

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

  .state('app.apartment_highlight', {
    cache: false,
    url: "/apartment_highlight/:apartment_id",
    views: {
      'page_content': {
        templateUrl: "views/apartment/highlight.html",
        controller: 'apartment_highlight_ctrl'
      }
    }
  })

  .state('app.apartment_gallery', {
    cache: false,
    url: "/apartment_gallery/:apartment_id",
    views: {
      'page_content': {
        templateUrl: "views/apartment/gallery.html",
        controller: 'apartment_gallery_ctrl'
      }
    }
  })
  //Class =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  .state('app.class', {
    cache: false,
    url: "/class",
    views: {
      'page_content': {
        templateUrl: "views/class/list.html",
        controller: 'class_ctrl'
      }
    }
  })

  //Events =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

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


  $urlRouterProvider.otherwise('/app/about_us');
});
