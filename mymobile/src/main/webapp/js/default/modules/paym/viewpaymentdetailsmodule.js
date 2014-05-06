angular.module("viewPaymentDetailsModule", ['ngRoute'])
.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider
			.when('/createpin', {
				controller: "viewPaymentDetailsController.createPin",
				templateUrl: ASSET_URL + "templates/default/paym/setuppin.html"
			})
			.when('/resetpin', {
				controller: "viewPaymentDetailsController.resetPin",
				templateUrl: ASSET_URL + "templates/default/paym/resetpin.html"
			})
			.when('/changepin', {
				controller: "viewPaymentDetailsController.changePin",
				templateUrl: ASSET_URL + "templates/default/paym/changepin.html"
			})
			.otherwise({
      			redirectTo: '/bills'
      		});
	}
])
.controller("viewPaymentDetailsController.getPaymentType", ['$scope', 'paymentDetailsService',
	function($scope, paymentDetailsService) {
		paymentDetailsService.getPaymentType(function(paymentTypeResponse) {
			$scope.paymentType = new PaymentType($scope, paymentTypeResponse);
			$scope.view = "validatePin";
			$scope.$broadcast('success');
			
		});

		$scope.pinForm = new PinValidationForm();

		$scope.postPin = function() {
			$scope.status = 'loading';
			paymentDetailsService.validatePin($scope.pinForm.pin, function(paymentDetailsResponse) {
				if (paymentDetailsResponse.pinValidationFailed) {
					$scope.pinForm.pin = "";
					$scope.pinForm.pinValid = false;
				}
				$scope.paymentDetails = new PaymentDetails($scope, paymentDetailsResponse).paymentDetails;
			});
		}
	}
])
.controller("viewPaymentDetailsController.createPin", ['$scope', 'securityPinService',
	function($scope, securityPinService) {
		$scope.createPinState = new CreatePinState();
		$scope.createPin = function(pin) {
			$scope.status = 'loading';
			securityPinService.createPin(pin, function(createPinResponse) {
				$scope.createpin = new CreatePin($scope, createPinResponse);
			});
		}

	}
])
.controller('viewPaymentDetailsController.resetPin', ['$scope', 'securityPinService',
	function($scope, securityPinService) {
		$scope.resetPinView = new ResetPinView("form-entry");

		$scope.submitResetPin = function() {
			$scope.resetPinView.setState("form-submit");
			securityPinService.resetPin($scope.resetPinView.pin.toString(), $scope.resetPinView.paymentNumber.toString(), 
				function(state, remainingAttempts) {
					$scope.resetPinView.setState(state);
					remainingAttempts && $scope.resetPinView.setRemainingAttempts(remainingAttempts);
				}
			);
		};
	}
])
.controller('viewPaymentDetailsController.changePin', ['$scope', 'securityPinService',
	function($scope, securityPinService) {
		$scope.changePinView = new ChangePinView("form-entry");

		$scope.submitChangePin = function() {
			$scope.changePinView.setState("form-submit");
			securityPinService.changePin($scope.changePinView.pin.toString(), $scope.changePinView.existingPin.toString(), 
				function(state, response) {
					$scope.changePinView.setState(state, response);
				}
			);
		};
	}
]);