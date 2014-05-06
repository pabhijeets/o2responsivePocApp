angular.module("paymBoltonsService", [])
.service("paymBoltonsService", ['$http', function($http) {
  var paymBoltonsService = {};

  paymBoltonsService.getBoltonsSummary = function(callback) {
    $http.get(properties.serviceEndpoints.paym.getBoltonsSummary)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return paymBoltonsService;
}]);