/*This service has being used to retrieve tariff*/
angular.module("tariffDetailsService", [])
.service("tariffDetailsService", ['$http', function($http) {
  var tariffDetailsService = {};

  tariffDetailsService.getDetails = function(callback) {
    $http.get(properties.serviceEndpoints.payg.getTariffDetails)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return tariffDetailsService;
}]);