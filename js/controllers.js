var site_url = 'http://bj.1000unit.com/';
//var site_url = 'http://localhost/balconies-jakarta/';
var upload_url = site_url + 'asset/upload/';

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

                        $http.post(site_url + 'register_device/check?regid=' + registered_id)
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
    $http.get(site_url + 'apartment/list')
    .success(function(data){
        $scope.apartlist = data;
    })

    $scope.select_apart = function(id){
        $http.post(site_url + 'apartment/set_default?apart_id='+this.apart.apart_id+'&regid='+registered_id)
        .success(function(){
            alert(registered_id);
            $('#menu-toggle').show();
            window.location = '#/app/about_us';
        })
    }

    $('#menu-toggle, a.back-button').hide();
    $('p.title_page').html('Select Your Apartment');
})
.controller('about_us_ctrl',function($scope,$http,$stateParams){
    $scope.upload_url = upload_url;
	$('a.back-button').hide();
	$('p.title_page').html('About Us');
})


.controller('apartment_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;
	$('a.back-button').hide();
	$('p.title_page').html('Apartment List');


	$http.get(site_url + 'api/apartment/list')
	.success(function(data){
		$scope.data = data;
	})
})


.controller('apartment_details_ctrl', function($scope,$http,$stateParams){
	console.log('Apartment ID: ' + $stateParams.apartment_id);
	$scope.upload_url = upload_url;
	$('a.back-button').attr('href','#/app/apartment').show();
	$http.get(site_url + 'api/apartment/details?id=' + $stateParams.apartment_id)
	.success(function(data){
		$scope.data = data;
		$('p.title_page').html(data.data.name);
	})
})
.controller('apartment_highlight_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;	

	$http.get(site_url + 'api/apartment/category?id=' + $stateParams.apartment_id + '&category_id=1&level=' + $stateParams.level)
	.success(function(data){
		$scope.data = data;
		$('p.title_page').html('Highlight - ' + data.data.name);

		if($stateParams.level == 0) {
			$('a.back-button').attr('href','#/app/apartment_details/' + data.data.id).show();
		} else {
			$('a.back-button').attr('href','#/app/apartment_category_'+data.category.id+'/'+data.data.id+'/0').show();
		}
	})
})
.controller('apartment_gallery_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;	

	$http.get(site_url + 'api/apartment/category?id=' + $stateParams.apartment_id + '&category_id=2&level=' + $stateParams.level)
	.success(function(data){
		$scope.data = data;
		$('p.title_page').html('Gallery - ' + data.data.name);

		if($stateParams.level == 0) {
			$('a.back-button').attr('href','#/app/apartment_details/' + data.data.id).show();
		} else {
			$('a.back-button').attr('href','#/app/apartment_category_'+data.category.id+'/'+data.data.id+'/0').show();
		}
	})
})
.controller('apartment_info_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;	

	$http.get(site_url + 'api/apartment/category?id=' + $stateParams.apartment_id + '&category_id=3&level=' + $stateParams.level)
	.success(function(data){
		$scope.data = data;
		$('p.title_page').html('Another Info - ' + data.data.name);

		if($stateParams.level == 0) {
			$('a.back-button').attr('href','#/app/apartment_details/' + data.data.id).show();
		} else {
			$('a.back-button').attr('href','#/app/apartment_category_'+data.category.id+'/'+data.data.id+'/0').show();
		}
	})
})

.controller('class_communities_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;	
	$('p.title_page').html('Class & Communities');

	$http.get(site_url + 'api/class_communities/list')
	.success(function(data){
		$scope.data = data;
	})	
})
.controller('class_communities_details_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;	
	$('a.back-button').attr('href','#/app/class_communities').show();

	$http.get(site_url + 'api/class_communities/details?id=' + $stateParams.class_id)
	.success(function(data){
		$scope.data = data;
		$('p.title_page').html(data.name);
	})	
})

.controller('events_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;	
	$('p.title_page').html('Events Upcomming');

	$http.get(site_url + 'api/events/list')
	.success(function(data){
		$scope.data = data;
	})	
})
.controller('events_details_ctrl', function($scope,$http,$stateParams){
	$scope.upload_url = upload_url;	
	$('a.back-button').attr('href','#/app/events').show();

	$http.get(site_url + 'api/events/details?id=' + $stateParams.events_id)
	.success(function(data){
		$scope.data = data;
		$('p.title_page').html(data.name);
	})	
})