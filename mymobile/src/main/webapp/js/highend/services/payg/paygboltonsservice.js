/*This service has being used to retrieve payg boltons for payg users. */
angular.module("paygBoltonsService", [])
.service("paygBoltonsService", ['$http', function($http) {
  var paygBoltonsService = {};

  paygBoltonsService.getBoltons = function(callback) {
    $http.get(properties.serviceEndpoints.payg.getBoltons)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return paygBoltonsService;
}]);