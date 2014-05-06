angular.module("myAllowancesModule", [])
.controller("myAllowancesController.getSummary", ['$scope', 'allowancesService', function($scope, allowancesService) {
    $scope.allowances = new Allowances();
    $scope.loading = 0;

    var addNonDataAllowance = function (allowances, allowance, type) {
        if (type == "minutes") {
            allowances.addMinutesAllowance(new Allowance(type, allowance));
        }
        else if (type == "messages") {
            allowances.addMessagesAllowance(new Allowance(type, allowance));
        }
    }

    var populateNonDataAllowances = function (allowanceResponse, allowanceType, allowances) {
        if(allowanceResponse.error) {
            addNonDataAllowance(allowances, allowanceResponse, allowanceType)
        } else {
            for (var i = 0; i < allowanceResponse.length; i++) {
                addNonDataAllowance(allowances, allowanceResponse[i], allowanceType)
            }
        }
    };

    //data
	allowancesService.getDataAllowance(function(response) {
        if(response) {
            $scope.allowances.addDataAllowance(new Allowance("data", response));
        }
        $scope.loading++;
        if ($scope.loading == 3) {
			$scope.status = "success";
        }
        if ($scope.allowances.dataStatus != "error") {
			$scope.allowances.dataStatus = "success";
        }
    });


    //minutes
	allowancesService.getMinutesAllowance(function(response) {
        if(response) {
            populateNonDataAllowances(response, "minutes", $scope.allowances);
        }
        $scope.loading++;
        if ($scope.loading == 3) {
			$scope.status = "success";
        }
        if ($scope.allowances.minutesStatus != "error")
			$scope.allowances.minutesStatus = "success";
  	});

    //messages
    allowancesService.getMessagesAllowance(function(response) {
        if(response) {
            populateNonDataAllowances(response, "messages", $scope.allowances);
        }
        $scope.loading++;
        if ($scope.loading == 3) {
			$scope.status = "success";
        }
        if ($scope.allowances.messagesStatus != "error")
			$scope.allowances.messagesStatus = "success";
    });

}]);