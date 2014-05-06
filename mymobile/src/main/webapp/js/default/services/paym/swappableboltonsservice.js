angular.module("swappableBoltOnService", [])
.service("swappableBoltOnService", ['$http', function($http) {
	var swappableBoltOnService = {};

      swappableBoltOnService.getSwappableBoltOns = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.getswappableboltons)
        .success(function(successResponse) {
          callback(successResponse);
        }).error(function(errorResponse) {
          callback({error: defaultProperties.errorMessage});
        });
      }

    swappableBoltOnService.getO2TravelSwappableBoltOns = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.getswappableo2travelboltons)
            .success(function(successResponse) {
                callback(successResponse);
            }).error(function(errorResponse) {
                callback({error: defaultProperties.errorMessage});
            });
    }
  return swappableBoltOnService;
}]);

