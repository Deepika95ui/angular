angular.module('simpleFlightSearch',[])
.controller("MainCtrl", ['$scope', '$http',function($scope, $http) {
        $scope.totalFlights = [];
        $scope.flightNumberError=false;
        $scope.dateError=false;
        $scope.search = function(fNumber, origin, destination, date) {
            if((fNumber || (origin && destination)) && date)
            {
                 $scope.dateError=false;
                  $scope.flightNumberError=false;
                $http({
                    url :'http://localhost:3000/api/flights/',
                    method: "GET",
                    params : { fNumber:fNumber, origin:origin, destination:destination, date:date}
                })
                .success(function(flightData) {
                $scope.totalFlights = flightData;
             });
            } else if(!date) {
                $scope.flightNumberError=false;
                $scope.dateError=true;
                return;
            }
            else if(!(fNumber || (origin && destination)))
             {
                 $scope.dateError=false;
                $scope.flightNumberError=true;
                return;
            } 
            else{
                 $scope.flightNumberError=true;
                  $scope.dateError=true;
            }
        };
}]);

