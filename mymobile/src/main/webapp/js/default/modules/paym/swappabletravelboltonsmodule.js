angular.module("swappableTravelBoltOnModule", [])
.controller("swappableTravelBoltOnController.getSwappableBolton", ['$scope', 'swappableTravelBoltOnService',
  function($scope, swappableTravelBoltOnService) {
    swappableTravelBoltOnService.getSwappableBoltOns(function(response) {
      $scope.swappableTravelBoltOns = new SwappableTravelBolton($scope, response);
    });
  }
]);