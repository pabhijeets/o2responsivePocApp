function MobileNumbers($scope, obj) {
	$scope.status = "success";
	if(!obj.error) {
		for (var i = 0; i < obj.length; i++) {
			this.push(obj[i].value);
		}
	}
}

//Make this model object an array
MobileNumbers.prototype = Object.create(Array.prototype, {});