angular.module("myBoltonsModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/boltonsdetails',
            {
                controller: "myBoltonsController.getBoltonsSummary",
                templateUrl: "templates/highend/myboltonsdetails.html"
            }
        );
  }
])
.controller("myBoltonsController.getBoltonsSummary", ['$scope', 'myBoltonsService',
  function($scope, myBoltonsService) {
    myBoltonsService.getBoltonsSummary(function(response) {
      if(response.length != 0) {
        $scope.myBoltons = new MyBoltons(response);
        if ($scope.myBoltons.myCoreOrPromotionalDataBoltonList.length ==0 && $scope.myBoltons.myDataBoltonList.length == 0 && $scope.myBoltons.myboltonList.length == 0) {
          $scope.showCallToAction = false;
        } else {
          $scope.showCallToAction = true;
        };
      } else {
        $scope.showCallToAction = false;
      }
      if (response.error) {
        $scope.status = 'error'
      }
      else {
        $scope.status = 'success'
      }
    });
  }
]);