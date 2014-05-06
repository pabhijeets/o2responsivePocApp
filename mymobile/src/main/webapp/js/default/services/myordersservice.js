angular.module("myOrdersService", [])
.service("myOrdersService", ['$http', function($http) {
    var myOrdersService = {};

    myOrdersService.getOrders = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.common.myOrders)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }
    return myOrdersService;
}]);