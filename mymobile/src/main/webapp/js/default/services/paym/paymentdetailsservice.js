angular.module("paymentDetailsService", [])
.service("paymentDetailsService", ['$http', function($http) {
    var paymentDetailsService = {};
    var paymentType;
    var paymentDetails;
    var pinValidated;
  
    paymentDetailsService.validatePin = function(pin, callback) {
        
        pinValidated = false;

        $http.post(defaultProperties.serviceEndpoints.paym.validatePin, pin)
        .success(function(successResponse) {
            callback(successResponse);
            paymentDetails = successResponse;
            pinValidated = true;
        })
        .error(function(errorResponse, status) {
            if(status == 403){
                callback(errorResponse);
            }else{
                callback({error: true});     
            }
            
        });
    }

    paymentDetailsService.getPaymentType = function(callback) {
        $http.get(defaultProperties.serviceEndpoints.paym.paymentType)
        .success(function(successResponse) {
            callback(successResponse);
            paymentType = successResponse;
        })
        .error(function(errorResponse) {
            callback({error: true});
        });
    }

    paymentDetailsService.getUserPaymentType = function(){
        return paymentType;
    }

    paymentDetailsService.getUserPaymentDetails = function(){
        return paymentDetails;
    }

    paymentDetailsService.postCreditCardPaymentDetails= function(creditCard, callback){
        $http.post(defaultProperties.serviceEndpoints.paym.paymentdetials.changepaymentdetails.creditcard, creditCard)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse, status) {
            if(status == 400){
                callback({invalidCreditCardNumber: true});
            }else if(status == 403){
                callback(errorResponse);
            }else{
                callback({error: true});
            }
        });
    }

    paymentDetailsService.postDirectDebitDetails = function(directDebitForm, callback){
        $http.post(defaultProperties.serviceEndpoints.paym.paymentdetials.changepaymentdetails.directdebit, directDebitForm)
        .success(function(successResponse) {
            callback(successResponse);
        })
        .error(function(errorResponse, status) {
            if(status == 400){
                callback({invalidAccountNumber: true});
            }else if(status == 403){
                callback(errorResponse);
            }else{
                callback({error: true});
            }
        });
    }

    paymentDetailsService.hasPinValidated = function(){
        return pinValidated;
    }

    return paymentDetailsService;
}]);