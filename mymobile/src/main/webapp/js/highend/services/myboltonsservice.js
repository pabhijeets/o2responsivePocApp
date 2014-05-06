angular.module("myBoltonsService", [])
.service("myBoltonsService", ['$http', function($http) {
  var myBoltonsService = {};

  myBoltonsService.getBoltonsSummary = function(callback) {
//    $http.get(properties.serviceEndpoints.paym.getBoltonsSummary)
//    .success(function(successResponse) {
//      callback(successResponse);
//    })
//    .error(function(errorResponse) {
//      callback({error: properties.errorMessage});
//    });
	  callback([]);
  }

  return myBoltonsService;
}]);