function SwappableBoltons($scope, obj) {
	if (obj.error) {
		$scope.status = "error";
		return;
	} else {
		$scope.status = "success";
	}

	if (jQuery.isEmptyObject(obj.swappableBoltOnsForTariff)){
		this.boltonSection = 'NO_BOLTONS';
		return;
	}

	this.allCoreDataBoltOns = obj.swappableBoltOnsForTariff.allCoreDataBoltOns;
	this.allPromotionalBoltOns = obj.swappableBoltOnsForTariff.promotionalBoltOns;
	this.currentBoltOn = obj.currentBoltOn;
	this.webDailyBolton = obj.swappableBoltOnsForTariff.webDailyBoltOn;
	this.boltonSection = null;
	this.deviceChangeWarningMessage = "";
	this.deviceTypes = [];
	this.coreDataBoltOnsForDevice = [];
	this.selectedBolton = null; 
	this.webDailyCoreDataBoltonsList = [];
	this.selectedDevice = null;
	this.hasWebDailyBoltOnForSelectedDeviceType = false;

	var swappableCoreBoltons =  filter(this.allCoreDataBoltOns, function(obj) {
		return !obj.o2WebDaily;
	}, this);

	//set view
	if (swappableCoreBoltons.length != 0) {
			this.boltonSection = 'CORE_DATA';
			var description = getDeviceTypeDescription(this.currentBoltOn.deviceType);
			//set device type for select box
			each(obj.swappableBoltOnsForTariff.deviceTypes, function(deviceType) {
				var deviceTypeObj = {name: deviceType, description: getDeviceTypeDescription(deviceType)};
				this.deviceTypes.push(deviceTypeObj);
				//set current device type on page load
				if (this.currentBoltOn.deviceType === deviceTypeObj.name) {
					this.selectedDevice = deviceTypeObj;
				};
			}, this);
			//prepare default list of swappable boltons
			this.prepareSwappableCoreBoltOnsListForSelctedDevice(this.selectedDevice.name);
			this.hasWebDailyBoltOnFor(this.selectedDevice.name);
	} else if (this.allPromotionalBoltOns && this.allPromotionalBoltOns.length != 0 ){
		this.boltonSection = 'PROMOTIONAL';
	} else if (this.webDailyBolton){
		this.boltonSection = 'WEB_DAILY';
	} 
}

SwappableBoltons.prototype.prepareSwappableCoreBoltOnsListForSelctedDevice = function(deviceType) {
	if (deviceType === 'SMARTPHONE' || deviceType === 'STANDARD') {
		this.coreDataBoltOnsForDevice = filter(this.allCoreDataBoltOns, function(obj) {
			return (obj.deviceType === 'SMARTPHONE' || obj.deviceType === 'STANDARD') && !obj.o2WebDaily;
		}, this);
	} else {
		this.coreDataBoltOnsForDevice = filter(this.allCoreDataBoltOns, function(obj) {
			return obj.deviceType === deviceType && !obj.o2WebDaily;
		}, this);
	};
};

SwappableBoltons.prototype.hasWebDailyBoltOnFor = function(deviceType) {
	this.hasWebDailyBoltOnForSelectedDeviceType = false;
  if (deviceType === 'SMARTPHONE' || deviceType === 'STANDARD') {
		this.webDailyCoreDataBoltonsList = filter(this.allCoreDataBoltOns, function(obj) {
			return (obj.deviceType === 'SMARTPHONE' || obj.deviceType === 'STANDARD') && obj.o2WebDaily;
		}, this);
	} else {
		this.webDailyCoreDataBoltonsList = filter(this.allCoreDataBoltOns, function(obj) {
			return obj.deviceType === deviceType && obj.o2WebDaily;
		}, this);
	};
  if (this.webDailyCoreDataBoltonsList.length != 0) {
		this.hasWebDailyBoltOnForSelectedDeviceType = true;
  };
};

SwappableBoltons.prototype.detectDeviceChange = function() {
	this.selectedBolton = null;
	this.deviceChangeWarningMessage = '';
	this.prepareSwappableCoreBoltOnsListForSelctedDevice(this.selectedDevice.name);
	this.hasWebDailyBoltOnFor(this.selectedDevice.name);
	if (this.currentBoltOn.deviceType === 'IPHONE' && this.selectedDevice.name != 'IPHONE') {
		this.deviceChangeWarningMessage = "As you've selected '" + this.selectedDevice.description + "' this means you won't have access to some iPhone features.";
	}
	if (this.currentBoltOn.deviceType === 'BLACKBERRY' && this.selectedDevice.name != 'BLACKBERRY') {
		this.deviceChangeWarningMessage = "As you've selected '" + this.selectedDevice.description + "' this means you won't have access to some Blackberry features.";
	};
};

function getDeviceTypeDescription(deviceType) {
	if (deviceType === "IPHONE") {
		return "iPhone";
	} else if (deviceType === "BLACKBERRY") {
		return "BlackBerry";
	} else if (deviceType === "SMARTPHONE") {
		return "Smartphone";
	} else if (deviceType === "STANDARD") {
		return "Standard phone";
	}
}