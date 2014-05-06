function MyPhonePlan($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		$scope.showCallToAction = false;
	} else {
		$scope.status = "success";
		if (obj.ccaInfoMessage) {
			$scope.showCallToAction = false;
			this.ccaInfoMessage = obj.ccaInfoMessage;
		} else {		
			this.phoneName = obj.phoneName
			this.startDate = obj.startDate
			this.installmentDate = obj.installmentDate
			this.ccaNumber = obj.ccaNumber
			this.totalCredit = obj.totalCredit
			this.apr = obj.apr
			this.duration = obj.duration
			this.settlementAmount = obj.settlementAmount
			this.installmentAmount = obj.installmentAmount
			this.pendingAmount = obj.pendingAmount
			this.paidToDate = obj.paidToDate
			$scope.showCallToAction = true;
		}
	}
}