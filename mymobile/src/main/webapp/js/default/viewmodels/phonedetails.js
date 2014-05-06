function PhoneDetails($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.showCallToAction = true;
		$scope.status = "success";
		this.brand = obj.brand;
		this.model = obj.model;
		this.imei = obj.imei;
		this.pukCode = obj.pukCode;
		this.gprsAndMMSSupportMessage = gprsAndMMSSupportMessage(obj);
	}

	function gprsAndMMSSupportMessage(obj) {
		var message;
		if(obj.gprsSupported && obj.mmsSupported) {
			 message = defaultProperties.phoneDetailsMessage.gprsAndMMSSupported;
		} else if (obj.gprsSupported) {
			message = defaultProperties.phoneDetailsMessage.onlyGPRSSupported;
		} else if (obj.mmsSupported) {
			message = defaultProperties.phoneDetailsMessage.onlyMMSSupported;
		} else {
			message = defaultProperties.phoneDetailsMessage.gprsAndMMSNotSupported;
		}
		return message;
	}
}