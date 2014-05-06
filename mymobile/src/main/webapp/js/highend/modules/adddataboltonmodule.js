angular.module("addDataBoltOnModule", ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
    $routeProvider
            .when('/adddataboltons',
            {
                controller: "addDataBoltOn.getBoltOns",
                templateUrl: "templates/highend/adddataboltons.html"
            });

        }
    ])
    .controller("addDataBoltOn.getBoltOns", ["$scope", "$location", "$anchorScroll", "allowancesService", "addBoltonsService",
        function($scope, $location, $anchorScroll, allowancesService, addBoltonsService) {
        $scope.currentView = 'select';
        $scope.disableAddBoltonButton = true;
        var selectedBoltons = $scope.selectedBoltOns = [];
        $scope.totalOneOffCost = 0;
        $scope.loading = 0;
        $scope.boltonCompletionLoading = true;


        allowancesService.getDataAllowance(function(dataAllowance) {
            if(dataAllowance) {
                $scope.allowance = new Allowance("data", dataAllowance);
                $scope.status = $scope.allowance.error ? "error" : "success";
            }
            $scope.loading++
        });
        
        addBoltonsService.getAvailableOneOffBoltons(function(availableBoltons) {
            $scope.availableBoltons = new Boltons(availableBoltons);
            $scope.loading++;
        });

        $scope.goToAllowancesPage = function() {
            $location.path("/allowances");
            $anchorScroll();
        }

        $scope.boltonSelected = function(bolton) {
            if(bolton.selected) {
                $scope.totalOneOffCost = $scope.totalOneOffCost + bolton.monthlyFee;
                selectedBoltons.push(bolton.id)
            } else {
                $scope.totalOneOffCost = $scope.totalOneOffCost - bolton.monthlyFee;
                selectedBoltons.splice(selectedBoltons.indexOf(bolton.id),1)
            }
        }

        $scope.add = function() {
            $scope.currentView = 'confirm';

           $anchorScroll();
        }

        $scope.goToSelectionPage = function() {
            $scope.currentView = 'select';

           $anchorScroll();
        }

        $scope.confirm = function() {
            addBoltonsService.addBoltOns(selectedBoltons, function(addBoltOnsResult) {
                $scope.addBoltOnsResult = addBoltOnsResult;
                $scope.boltonCompletionLoading = false;
            });
            $scope.currentView = 'success';
            
           $anchorScroll();
        }
    }
    ]);

