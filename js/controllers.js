angular.module('starter.controllers', ['ngOpenFB'])
.controller('AppCtrl', function($rootScope, $scope, $cordovaPush, $cordovaDevice, ngFB){
	$scope.fbLogin = function () {
	    ngFB.login({scope: 'email,read_stream,publish_actions'}).then(
	        function (response) {
	            if (response.status === 'connected') {
	                console.log('Facebook login succeeded');
	                $scope.closeLogin();
	            } else {
	                alert('Facebook login failed');
	            }
	        });
	};


	var androidConfig = {
        "senderID": "409426641173",
    };
    document.addEventListener("deviceready", function() {
        $cordovaPush.register(androidConfig).then(function(result) {
        	console.log(result);
        }, function(err) {
            console.log(err);
        })
        $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
            console.log(event);
            console.log(notification);
            $(".logging").val(notification + "\n\n");
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                    	console.log(notification.regid);
                        //alert('registration ID = ' + notification.regid);
			            //$(".logging").val(notification.regid + "\n\n");
                    }
                    break;
                case 'message':
					window.location = "#/app/apartment";
                    // this is the actual push notification. its format depends on the data model from the push server
                    //alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                    break;
                case 'error':
                    alert('GCM error = ' + notification.msg);
                    break;
                default:
                    alert('An unknown GCM event has occurred');
                    break;
            }
        });
    }, false);
})

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