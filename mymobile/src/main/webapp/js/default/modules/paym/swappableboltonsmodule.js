angular.module("swappableBoltOnModule", ["ngRoute"])
    .controller("swappableBoltOnController.getSwappableBoltons", ['$scope', '$window', 'swappableBoltOnService',
      function($scope, $window, swappableBoltOnService) {
        swappableBoltOnService.getSwappableBoltOns(function(response) {
          $scope.swappableBoltOns = new SwappableBoltons($scope, response);
        });
        $scope.continueWithSelectedBolton = function(selectedDataBoltOn) {
            if (selectedDataBoltOn.o2WebDaily) {
                $window.location.href = defaultProperties.mymobileBaseUrl + '/paymonthly/mytariffandboltons/removedatabolton?selectedDataBoltOn=' + selectedDataBoltOn.id;
            } else{
                $window.location.href = defaultProperties.mymobileBaseUrl + '/paymonthly/mytariffandboltons/swapdatabolton?selectedDataBoltOn=' + selectedDataBoltOn.id;
            };
        }
      }
    ])
    .controller("swappableBoltOnController.getSwappableO2TravelBoltons", ['$scope', '$window', 'swappableBoltOnService',
        function($scope, $window, swappableBoltOnService) {
            swappableBoltOnService.getO2TravelSwappableBoltOns(function(response) {
                $scope.swappableO2TravelBolton = new SwappableO2TravelBolton($scope, response);
            });

            $scope.continueWithSelectedBolton = function(swappableO2TravelBolton) {
                    $window.location.href = defaultProperties.mymobileBaseUrl + '/paymonthly/mytariffandboltons/swaptravelbolton?selectedDataBoltOn=' + swappableO2TravelBolton.id;
            }
        }
    ]);

