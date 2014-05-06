angular.module("boltonsSummaryModule", [])
.controller("boltonsController.getSummary", ['$scope', 'paygBoltonsService',
    function($scope, paygBoltonsService) {
        paygBoltonsService.getBoltons(function(response) {
            if (response.error) {
                $scope.status = 'error';
            } else {
                $scope.status = 'success';
                $scope.paygBoltons = new PaygBoltons(response);
                if(response.length != 0) {
                    $scope.showCallToAction = true;
                } else {
                    $scope.showCallToAction = false;
                }
            }
        });
    }
]);