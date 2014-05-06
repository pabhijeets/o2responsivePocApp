angular.module("desktopBoltonsModule", [])
.controller("boltonsController.getActiveAndPendingRechargeBoltons", ['$scope', 'paygBoltonsService',
    function($scope, paygBoltonsService) {
        paygBoltonsService.getBoltons(function(response) {
            if (response.error) {
                $scope.status = 'error';
            } else {
                $scope.status = 'success';
                $scope.paygBoltons = new DesktopPaygBoltons(response);
            }
        });
    }
]);