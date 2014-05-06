function Offers($scope, obj) {
    if (obj.error) {
        $scope.status = "error";
    }else{
	$scope.status = "success";
	}
	this.offers = obj;
};

function OfferPreference(selectedOfferId, selectedAction) {
	this.selectedOfferId = selectedOfferId;
	this.selectedAction = selectedAction;
}