angular.module("offersService", [])
.service("offersService", ['$http', function($http) {
    var offersService = {};

    offersService.getOffers = function(successCallback, errorCallback) {
        $http.get(defaultProperties.serviceEndpoints.common.offers)
        .success(function(successResponse) {
            successCallback(successResponse);
        })
        .error(function(errorResponse) {
            errorCallback();
        });
    }

    offersService.setOfferPreferences = function(offerPreference, successCallback, errorCallback) {
        $http.post(defaultProperties.serviceEndpoints.common.offers, {selectedOfferId:offerPreference.selectedOfferId, selectedAction:offerPreference.selectedAction}, {headers: { 'Content-Type': 'application/json' }})
        .success(function() {
            successCallback();
        })
        .error(function(errorResponse) {
            errorCallback();
        });
    }
    return offersService;
}]);