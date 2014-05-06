angular.module("paymBoltonsModule", ['ngRoute'])
  .controller("paymBoltonsController.getBoltonsSummary", ['$rootScope', '$scope', 'paymBoltonsService',
    function($rootScope, $scope, paymBoltonsService) {
      if (!$rootScope.paymBoltons) {
        paymBoltonsService.getBoltonsSummary(function(response) {
          if (response.length != 0) {
            $rootScope.paymBoltons = new PaymBoltons(response);
            if ($rootScope.paymBoltons.myCoreOrPromotionalDataBoltonList.length == 0 && $rootScope.paymBoltons.myDataBoltonList.length == 0 && $rootScope.paymBoltons.myboltonList.length == 0) {
              $scope.showCallToAction = false;
            } else {
              $scope.showCallToAction = true;
            };
          } else {
            $scope.showCallToAction = false;
          }
          if (response.error) {
            $scope.status = 'error'
          } else {
            $scope.status = 'success'
          }
        });
      }
    }
  ]);