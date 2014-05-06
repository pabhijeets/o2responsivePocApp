angular.module("upgradeEligibilityModule", ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/upgradeoptions',
            {
                controller: "upgradeEligibilityController.getOptions",
                templateUrl: "templates/highend/upgradeoptiondetails.html"
            }
        );
  }
])

.controller("upgradeEligibilityController.getOptions", ['$scope', '$rootScope', '$filter', 'upgradeEligibilityService',
    function($scope, $rootScope, $filter, upgradeEligibilityService) {
        upgradeEligibilityService.getUpgradeEligibility(function(upgradeEligibility) {
            var upgradeEligibility = new UpgradeEligibility(upgradeEligibility);

            if (upgradeEligibility.error) {
              $scope.status = 'error';
            } else {
              $scope.status = 'success';
              $scope.showCallToAction = true;
              var upgradeEligibilityModel = new UpgradeOptionMessagesHelper($filter, $rootScope.userDetails.isCCA).constructMessages(upgradeEligibility)
              if(upgradeEligibilityModel.messages[0] === properties.upgradeEligibility.noUpgrade.DEFAULT) {
                $scope.showCallToAction = false;
              }
              if(upgradeEligibility.isMBBUser){
                $rootScope.isMBBUser = upgradeEligibility.isMBBUser;
              }
              $scope.upgradeEligibilityMessages = upgradeEligibilityModel.messages;
              $scope.displayUpgradeShop = upgradeEligibilityModel.displayUpgradeShop;
              $scope.freeUpgradeOption = upgradeEligibility.freeUpgradeOption;
              $scope.paidUpgradeOption = upgradeEligibility.paidUpgradeOption;
          }
        });
    }
])
