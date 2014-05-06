angular.module("swappableTravelBoltOnService", [])
.service("swappableTravelBoltOnService", ['$http', function($http) {
	var swappableTravelBoltOnService = {};

  swappableTravelBoltOnService.getSwappableBoltOns = function(callback) {
    $http.get(defaultProperties.serviceEndpoints.paym.getswappabletravelboltons)
    .success(function(successResponse) {
      callback(successResponse);
    }).error(function(errorResponse) {
      callback({error: defaultProperties.errorMessage});
    });
  }
  return swappableTravelBoltOnService;
}]);