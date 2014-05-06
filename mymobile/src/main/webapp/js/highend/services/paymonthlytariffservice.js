angular.module("payMonthlyTariffService", [])
.service("payMonthlyTariffService", ['$http', function($http) {
	var payMonthlyTariffService = {};

  payMonthlyTariffService.getTariffDetail = function(callback) {
//    $http.get(properties.serviceEndpoints.paym.getTariff)
//    .success(function(successResponse) {
//      callback(successResponse);
//    }).error(function(errorResponse) {
//      callback({error: properties.errorMessage});
//    });
	  callback({"basicContract":{"accountNumber":"0111110211","endDate":1325356200000,"minimumTermInMonths":24,"tariffId":"9293","tariffName":"Tariff Name has iPhone in it so its Iphone Tariff","startDate":1262284200000,"monthlyFee":{"valueInPence":2500},"tariffStartDate":1223490600000,"description":"600 mins, Unlimited texts, Inclusive International Traveller Service, 500MB Data & Unlimited Wi-Fi","tariffFamily":"IPHONEBYNAME","billingInterval":"MONTHLY","cca":false,"leased":false,"mobileBroadBand":false,"4GCustomer":false},"hasCoreDataBolton":false});
  }

  payMonthlyTariffService.getCallingPlan = function(callback) {
//      $http.get(properties.serviceEndpoints.paym.getCallingPlan)
//          .success(function(successResponse) {
//              callback(successResponse);
//          }).error(function(errorResponse) {
//              callback({error: properties.errorMessage});
//      });
	  callback([{"id":null,"name":"Xnet peak calls","value":"45p","orderIndex":0},{"id":null,"name":"Mobile internet over GSM","value":"10p","orderIndex":0},{"id":null,"name":"O2 to O2 peak UK","value":"30p","orderIndex":0},{"id":null,"name":"Off-peak standard calls","value":"2p","orderIndex":0},{"id":null,"name":"Peak standard calls","value":"30p","orderIndex":0},{"id":null,"name":"Voicemail 901 peak","value":"30p","orderIndex":0},{"id":null,"name":"MMS (per message)","value":"25p","orderIndex":0},{"id":null,"name":"O2 to O2 off-peak UK","value":"2p","orderIndex":0},{"id":null,"name":"Xnet off-peak calls","value":"30p","orderIndex":0},{"id":null,"name":"Voicemail 901 off peak","value":"2p","orderIndex":0},{"id":null,"name":"Text (per message)","value":"12p","orderIndex":0}]);
  }

  return payMonthlyTariffService;
}]);