angular.module("myLatestBillDetailsService", [])
.service("myLatestBillDetailsService", ['$http', function($http) {
  var myLatestBillDetailsService = {};

  myLatestBillDetailsService.getBillDetails = function(callback) {
//    $http.get(properties.serviceEndpoints.paym.getBillDetails)
//    .success(function(successResponse) {
//      callback(successResponse);
//    })
//    .error(function(errorResponse) {
//      callback({error: properties.errorMessage});
//    });
	  
	  //callback({error: properties.errorMessage});
    callback({"nextBillDate":1298764800000,"paymentDueDate":1320537600000,"billAmount":{"valueInPence":66667},"currentBalance":{"valueInPence":-1},"billDate":1317423600000,"inTreatment":false,"cca":false});
  };
  return myLatestBillDetailsService;
}]);