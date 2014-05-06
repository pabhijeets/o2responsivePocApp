angular.module("tariffDetailsModule", [])
    .controller("tariffController.getDetails", ['$scope', 'tariffDetailsService',
        function($scope, tariffDetailsService) {
            tariffDetailsService.getDetails(function(response) {
                response = response.prepayUserAccount;
                $scope.tariffDetails = new TariffDetails($scope, response);
                if(response.pendingTariff) {
                    $scope.pendingTariffDetails = new PendingTariffDetails($scope, response);
                }
            });
        }
]);