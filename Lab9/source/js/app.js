
var myapp = angular.module('myApp',[]);

myapp.controller('View1Ctrl',function($scope,$http){
    $scope.insertData = function(){
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        var result={
            'venue': []
        };
        var keyword = document.getElementById("keyword").value;
        if (keyword != null) {
            var handler = $http.get("https://api.foursquare.com/v2/venues/search?client_id=Q0ENF1YHFTNPJ31DCF13ALLENJW0P5MTH13T1SA0ZP1MUOCI&client_secret=ZH4CRZNEWBNTALAE3INIB5XG0QI12R4DT5HKAJLWKYE1LHOG&v=20160215&limit=5&near=" + keyword);

            handler.success(function (data) {

                if (data != null) {
                    var ven = data.response.venues;
                    for (var i = 0; i < 5; i++) {

                        $scope.venueList[i] = {
                            'name': ven[i].name,
                            'address':ven[i].location.formattedAddress.toString(),
                            'phone':ven[i].contact.formattedPhone
                        };


                        var config = {
                            headers : {
                                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                            }
                        }

                        var req = $http.post('http://127.0.0.1:8081/add', $scope.venueList[i]);
                        req.success(function ( data, status, headers, config) {
                            $scope.message = data;
                            console.log(data);
                        });
                        req.error(function (data, status, headers, config) {
                            alert("failure message: " + JSON.stringify({data: data}));
                        });






                    }
                }
            })
            handler.error(function (data) {
                alert("There was some error processing your request. Please try after some time.");
            });
        }


    };
    $scope.view = function(name){
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        var req = $http.post('http://127.0.0.1:8081/view',{"name":name});
        req.success(function ( data, status, headers, config) {
            $scope.message = data;

        });
        req.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });

    };

    $scope.remove = function(name){
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        };

        var req = $http.post('http://127.0.0.1:8081/remove',{"name":name});
        req.success(function ( data, status, headers, config) {
            $scope.message = data;

        });
        req.error(function (data, status, headers, config) {
            alert("failure message: " + JSON.stringify({data: data}));
        });

    };

});