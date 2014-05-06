/*This service has being used to retrieve balance & allowance, tariff and calling plan for payg users. */
angular.module("paygAccountSummaryService", [])
.service("paygAccountSummaryService", ['$http', function($http) {
  var paygAccountSummaryService = {};

  paygAccountSummaryService.getSummary = function(callback) {
    $http.get(properties.serviceEndpoints.payg.getBalanceAndAllowance)
    .success(function(successResponse) {
      callback(successResponse);
    })
    .error(function(errorResponse) {
      callback({error: properties.errorMessage});
    });
  }

  return paygAccountSummaryService;
}]);