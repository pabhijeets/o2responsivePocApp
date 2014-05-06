angular.module("rewardsService", [])
.service("rewardsService", ['$http', function($http) {
    var rewardsService = {};

    rewardsService.getRewards = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.payg.rewards)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    return rewardsService;
}]);