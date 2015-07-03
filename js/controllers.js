var base_url = "http://jb.abdulhafidh.com/api/";
var path_upload = "http://jb.abdulhafidh.com/upload/";
var registered_id = null;

angular.module('starter.controllers', ['ngOpenFB','ngSanitize'])
.controller('AppCtrl', function($rootScope, $scope, $cordovaPush, $cordovaDevice, ngFB, $http){
    //window.location = '#/app/select_apartment';

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


	var androidConfig = {"senderID": "409426641173"};
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
                        registered_id = notification.regid;

                        $http.post(base_url + 'register_device/check?regid=' + registered_id)
                          .success(function(res){
                            if(res.status == 'invalid') {
                                window.location = '#/app/select_apartment';
                            }
                        })
                    	//console.log(notification.regid);
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
.controller('select_apartment_ctrl', function($scope,$http,$stateParams){
    $http.get(base_url + 'apartment/list')
    .success(function(data){
        $scope.apartlist = data;
    })

    $scope.select_apart = function(id){
        $http.post(base_url + 'apartment/set_default?apart_id='+this.apart.apart_id+'&regid='+registered_id)
        .success(function(){
            alert(registered_id);
            $('#menu-toggle').show();
            window.location = '#/app/aboutus';
        })
    }

    $('#menu-toggle, a.back-button').hide();
    $('p.title_page').html('Select Your Apartment');
})
.controller('about_us_ctrl',function($scope,$http,$stateParams){
    $scope.path_upload = path_upload;

    $http.get(base_url + 'aboutus')
    .success(function(data){
        $scope.aboutus = data;
        $scope.description = data.aboutus_description;
    })

	$('a.back-button').hide();
	$('p.title_page').html('About Us');
})
.controller('apartment_ctrl', function($scope,$http,$stateParams){
    $scope.path_upload = path_upload;
    $http.get(base_url + 'apartment/list')
    .success(function(data){
        $scope.apartlist = data;
    })

	$('a.back-button').hide();
	$('p.title_page').html('Apartment List');
})
.controller('apartment_details_ctrl', function($scope,$http,$stateParams){
    $scope.path_upload = path_upload;
    $http.get(base_url + 'apartment/details?apart_id=' + $stateParams.apartment_id)
    .success(function(data){
        $scope.row = data;
        $('a.back-button').attr('href','#/app/apartment').show();
        $('p.title_page').html(data.apart_name);
    })
})
.controller('apartment_highlight_ctrl', function($scope,$http,$stateParams){
    var apartment_id = $stateParams.apartment_id;
    $http.get(base_url + 'apartment/highlight?apart_id=' + apartment_id)
    .success(function(data){
        $scope.highlight = data;
    })

	$('a.back-button').attr('href','#/app/apartment_details/' + apartment_id).show();
	$('p.title_page').html('Highlight');
})
.controller('apartment_gallery_ctrl', function($scope,$http,$stateParams){
    $('a.back-button').attr('href','#/app/apartment_details/' + $stateParams.apartment_id).show();
    $('p.title_page').html('Gallery');
})

.controller('class_ctrl', function($scope,$http,$stateParams){})
.controller('events_ctrl', function($scope,$http,$stateParams){})