angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope,$http,$stateParams){})

.controller('about_us_ctrl', function($scope,$http,$stateParams){
	$('a.back-button').hide();
	$('p.title_page').html('About Us');
})
.controller('apartment_ctrl', function($scope,$http,$stateParams){
	$('a.back-button').hide();
	$('p.title_page').html('Apartment List');
})
.controller('apartment_details_ctrl', function($scope,$http,$stateParams){
	$('a.back-button').attr('href','#/app/apartment').show();
	$('p.title_page').html('Thamrin City');	
})
.controller('apartment_highlight_ctrl', function($scope,$http,$stateParams){
	$('a.back-button').attr('href','#/app/apartment_details/1').show();
	$('p.title_page').html('Highlight');
})
.controller('apartment_gallery_ctrl', function($scope,$http,$stateParams){})

.controller('class_ctrl', function($scope,$http,$stateParams){})
.controller('events_ctrl', function($scope,$http,$stateParams){})