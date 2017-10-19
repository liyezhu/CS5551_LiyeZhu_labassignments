'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.Search = function () {
            var keyword = document.getElementById("keyword").value;
            if (keyword != null) {
                var handler = $http.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyBRXn4UDfXu2OT7OnshOvc1NRoBhO7fzLY&part=snippet&maxResults=5"+
                    "&q="+ keyword);

                handler.success(function (data) {

                    if (data != null) {
                        for (var i = 0; i < 5; i++) {

                            $scope.venueList[i] = {
                                "videoId": data.items[i].id.videoId,
                                "title": data.items[i].snippet.title,
                                "description": data.items[i].snippet.description
                            };
                        }
                    }
                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }

        $scope.classify=function(){
            $scope.translation = "The classify of the text is: ";
            var mtext = document.getElementById("keyword").value;
            alert(mtext);
            var handler = $http.get("https://api.uclassify.com/v1/uClassify/Sentiment/classify/?readKey=RiI5dO1glGLc&text=today is a happy day");
            handler.success(function(data) {
                alert("hello");
                $scope.translation +=("Negative:"+data.negative+", Positive:"+data.positive);

            })
            handler.error(function(date) {
                alert ("There was some error processing your request. Please try after some time.");
            });
        };
    });
