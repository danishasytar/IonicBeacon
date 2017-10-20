// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("ExampleController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, $ionicPopup, $ionicModal) {

    $scope.beacons = {};

    console.log(new Date())

    $ionicPlatform.ready(function() {

        $cordovaBeacon.requestWhenInUseAuthorization();
        var isconnected = 0;

        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
            var uniqueBeaconKey;
            console.log(pluginResult.beacons[0].uuid)

            if (pluginResult.beacons.length > 0){
              // for(var i=0;i<pluginResult.beacons.length;i++){

                if(pluginResult.beacons[0].uuid == "5a4bcfce-174e-4bac-a814-092e77f6b7e5"){
                  var area1TimeIn = new Date();
                  var area1TimeInMilli = new Date(milliseconds);
                  console.log(n)
                  console.log(m)
                  var myPopup = $ionicPopup.show({                   
                     title: 'The Terminal',
                     subTitle: 'Counter 1 In',
                  });
                }
                else if(pluginResult.beacons[0].uuid == "74278bda-b644-4520-8f0c-720eaf059935"){
                  var area1TimeOut = new Date();
                  var area1TimeOutMilli = new Date(milliseconds);
                  console.log(n)
                  console.log(m)
                  var myPopup = $ionicPopup.show({
                     title: 'The Terminal',
                     subTitle: 'Counter 1 Out',
                  });
                }

                var area1InQueueTime = area1TimeOutMilli - area1TimeInMilli;

                var postObject = new Object();
                postObject.time = area1InQueueTime;
                postObject.intime = area1TimeIn;
                postObject.outtime = area1TimeOut;
                var req = {
                  method: 'POST',
                  url: 'https://sheltered-reef-87652.herokuapp.com/api/v1/area1',
                  data: postObject
                };

                $http(req).success(function(resp) {
                  console.log(resp)
                }).error(function(err) {
                  console.log(err)
                })
              // }



            }



  

            for(var i = 0; i < pluginResult.beacons.length; i++) {
                uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
            }
            $scope.$apply();
        });


        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "e276c0c0-d740-52e8-b778-9ae6e514269e"));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "5A4BCFCE-174E-4BAC-A814-092E77F6B7E5"));
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "74278BDA-B644-4520-8F0C-720EAF059935"));

    });

        $ionicModal.fromTemplateUrl('modalin.html', function(modal) {
          $scope.leadPersondModal = modal;
        }, {
          scope: $scope,
          animation: 'slide-in-up'
        });


    $scope.showModalIn = function() {



      $scope.leadPersondModal.show();

    }


});
