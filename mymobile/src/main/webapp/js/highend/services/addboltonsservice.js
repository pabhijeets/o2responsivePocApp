angular.module("addBoltonsService", [])
.service("addBoltonsService", ['$http', function($http) {
  var addBoltonsService = {};
  addBoltonsService.getAvailableOneOffBoltons = function(callback) {
//    $http.get(properties.serviceEndpoints.paym.getAvailableBoltons)
//    .success(function(successResponse) {
//      callback(successResponse);
//    })
//    .error(function(errorResponse) {
//      callback({error: properties.errorMessage});
//    });
	  callback([{"equivalenceId":"9261","classification":"Data Bundle","exclusiveGroups":["TopUp5"],"id":"9261","mutuallyExclusiveInGroup":false,"name":"One-off 500MB UK Data","description":"Allows an additional 500MB of UK data usage, for a one-off cost, to use until your next bill date.","monthlyFee":{"valueInPence":500},"status":null,"startDate":null,"expiryDate":null,"billingInterval":"ONE_OFF","category":"DATA","familyName":"ONEOFFTOPUP","cancelToken":null,"immediate":true,"hidden":false,"o2WebDaily":false,"dataOption":false,"monthly":false,"tugo":false,"default":false,"oneOff":true,"internationalFavourite":false,"o2Travel":false,"standardRatesAbroad":false,"free":false,"iphoneAllRounder":false,"blackBerryAllRounder":false,"smartPhoneAllRounder":false,"deviceType":"STANDARD","its":false,"family":false,"4G":false},{"equivalenceId":"9263","classification":"Data Bundle","exclusiveGroups":["TopUp2"],"id":"9263","mutuallyExclusiveInGroup":false,"name":"One-off 1GB UK Data","description":"Allows an additional 1GB of UK data usage, for a one-off cost, to use until your next bill date.","monthlyFee":{"valueInPence":1000},"status":null,"startDate":null,"expiryDate":null,"billingInterval":"ONE_OFF","category":"DATA","familyName":"ONEOFFTOPUP","cancelToken":null,"immediate":true,"hidden":false,"o2WebDaily":false,"dataOption":false,"monthly":false,"tugo":false,"default":false,"oneOff":true,"internationalFavourite":false,"o2Travel":false,"standardRatesAbroad":false,"free":false,"iphoneAllRounder":false,"blackBerryAllRounder":false,"smartPhoneAllRounder":false,"deviceType":"STANDARD","its":false,"family":false,"4G":false}]);
  };

  addBoltonsService.addBoltOns = function(selectedBoltOns, callback) {
    $http.post(properties.serviceEndpoints.paym.addBoltons, selectedBoltOns)
      .success(function(successResponse) {
        callback(successResponse);
      })
      .error(function(errorResponse) {
        callback({error: properties.errorMessage});
      });
  };

  return addBoltonsService;
}]);