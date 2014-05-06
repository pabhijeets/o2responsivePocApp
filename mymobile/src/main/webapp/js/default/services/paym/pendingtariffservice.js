angular.module("pendingTariffService", [])
.service("pendingTariffService", ['$http', function($http) {
	var pendingTariffService = {};

  pendingTariffService.getPendingTariffDetail = function(callback) {
    $http.get(defaultProperties.serviceEndpoints.paym.getpendingtariff)
    .success(function(successResponse) {
      callback(successResponse);
    }).error(function(errorResponse) {
      callback({error: defaultProperties.errorMessage});
    });
  }
  return pendingTariffService;
}]);