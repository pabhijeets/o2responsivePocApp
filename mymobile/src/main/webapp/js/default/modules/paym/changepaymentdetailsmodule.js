angular.module("changePaymentDetailsModule", ['ngRoute'])
 .config(['$routeProvider', function($routeProvider) {
    $routeProvider
            .when('/changepaymentdetails',
            {			
            	controller: "changePaymentDetailsController.changepaymentdetailsInit",
                templateUrl: ASSET_URL + "templates/default/paym/changepaymentdetails.html"
            })
            .otherwise({
      			redirectTo: '/bills'
      		});
        }
    ])
	.controller("changePaymentDetailsController.changepaymentdetailsInit", ['$scope', '$location','paymentDetailsService',
	function($scope, $location,paymentDetailsService) {
		
		//Check if pin validation is done else redirect user to bills page
		if(paymentDetailsService.hasPinValidated()){
			$scope.payment = new PaymentType($scope, paymentDetailsService.getUserPaymentType());
			$scope.paymentDetails = new PaymentDetails($scope, paymentDetailsService.getUserPaymentDetails()).paymentDetails;
			$scope.status = 'form';
		}else{
			$location.path("/bills");
		}
	}
		
])
.controller("changeCreditCardDetailsController.setupCreditCardForm", ['$scope', '$filter', 'paymentDetailsService',
	function($scope, $filter, paymentDetailsService) {
		$scope.creditCard = new CreditCard($filter);
				
		$scope.postCreditCardPaymentDetails = function() {
			$scope.pinValidationFailed = false;
			$scope.invalidCreditCardNumber = false;
			$scope.creditCard.validateAll();
			if ($scope.creditCard.validations.isCardTypeValid && $scope.creditCard.validations.isCreditCardNumberValid
				&& $scope.creditCard.validations.isExpiryDateValid && $scope.creditCard.validations.isPinValid) {				
				$scope.status = 'loading';
				paymentDetailsService.postCreditCardPaymentDetails(new CreditCardDetailsPostForm($scope.creditCard.creditCardDetails), function(response){
					$scope.creditCard.handlePostResponse($scope, response);
				});
			}
		}
	}
])
.controller("changeDirectDebitDetailsController.setupDirectDebitForm", ['$scope', 'paymentDetailsService',
	function($scope, paymentDetailsService) {
		$scope.directDebit = new DirectDebit();
		$scope.updateDirectDebitDetails = function() {
			$scope.directDebit.pinVerificationFailed = false;
			$scope.directDebit.invalidAccountNumber = false;
			$scope.directDebit.validateDirectDebitForm();
			if (!$scope.directDebit.saveDisabled) {
				$scope.status = 'loading';
				paymentDetailsService.postDirectDebitDetails($scope.directDebit.form, function(response){
					$scope.directDebit.handlePostResponse($scope, response);
				});
			}
		}
	}
]);