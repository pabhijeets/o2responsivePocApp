angular.module("myLatestBillModule", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/balanceInformation',
            {
                templateUrl: "templates/highend/balanceinformation.html"
            }
        );
}
    ])
  .controller("myLatestBillController.getSummary", ['$scope','$rootScope', 'myLatestBillDetailsService', '$filter',
    function($scope, $rootScope, myLatestBillDetailsService, $filter) {
      myLatestBillDetailsService.getBillDetails(function(response) {
        $scope.myLatestBillDetail = new MyLatestBillDetail(response, $filter, $rootScope.userDetails.isCCA);
        if (response.error) {
          $scope.status = 'error';
        }
        else {
          $scope.status = 'success';
          if($rootScope.userDetails.isCCA) {
              $scope.title="Latest airtime bill";
          }
          if ($scope.myLatestBillDetail.paymentDueDate != null) {
            $scope.showCallToAction = true;
          }
          if ($scope.myLatestBillDetail.inTreatment) {
            $scope.additionalSummary = $scope.myLatestBillDetail.inTreatmentBillMessage.summary;
          }
        }
      });
    }
  ]);