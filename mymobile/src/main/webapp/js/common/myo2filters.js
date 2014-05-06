angular.module("myo2Filters", [])

.filter('dateFormatter', ["$filter", function($filter) {
	return function(input, shortYear) {
		if(shortYear) {      
			return input ? $filter('date')(input, "dd MMM ''''yy") : null;
		}
		else {      
			return input ? $filter('date')(input, "dd MMM yyyy") : null;
		}
	};
}])

.filter('currencyFormatter', ["$filter", function($filter) {
	return function(input, poundValue) {
		if (input == undefined || input == null) {
			return "\u00A30.00";
		}

		if(poundValue) {
			return "\u00A3" + $filter('number')(input, 2);
		}

		if (input >= 0) {
			return "\u00A3" + $filter('number')(input/100, 2);
		} else {
			return "-" + "\u00A3" + $filter('number')(-input/100, 2);
		}
	};
}])


.filter('boltonCurrencyFormatter', ["$filter", function($filter) {
	return function(input) {
		return input==0 ? 'Free':$filter('currencyFormatter')(input);
	};
}])

.filter('dataAllowanceFormatter', function() {
	return function(dataAllowance, roundDown, precision) {
		precision = precision || 2;
		var decimalAdjustment = Math.pow(10, precision);
		roundDown = roundDown || false;
		dataAllowance = dataAllowance || 0;

		var unit = "KB";
		if (dataAllowance >= 1024 && dataAllowance < 1048576) {
			dataAllowance /= 1024;
			unit = "MB";
		}
		else if (dataAllowance >= 1048576) {
			dataAllowance /= 1048576;
			unit = "GB";
		}

	//round-up (ceil) or round-down (floor)
	//need manipulate number of decimal places, as javascript can not do floor and ceil on floats
	dataAllowance *= decimalAdjustment; //shift decimal place to the right by 'precision' number of places
	dataAllowance = roundDown ? Math.floor(dataAllowance) : Math.ceil(dataAllowance);
	dataAllowance /= decimalAdjustment; //shift decimal place back
	return {allowanceValue: dataAllowance.toFixed(precision), allowanceUnit: unit};
};
})

.filter('minutesAllowanceFormatter', function() {
	return function(seconds) {
		seconds = seconds || 0;
		var minutes = Math.floor(seconds / 60);
		minutes = minutes.toFixed();
		var balanceSeconds = seconds % 60;
		return minutes + ":" + (balanceSeconds < 10 ? "0"+balanceSeconds : balanceSeconds);
	};
})

.filter('orderStatusFormatter', function() {
	return function(orderStatus) {
		return defaultProperties.widgets.common.myorders.orderStatus[orderStatus];
	};
})
.filter('percentageFormatter', function() {
  return function(value) {
    value = value || 0;
    return value.toFixed(2) + "%";
  };
})
.filter('encode', function() {
  return function(value) {
    value = encodeURIComponent(value);
    return value;
  };
})
.filter('stringifyduration', function() {
  return function(value) {
    if (value === 'MONTHLY') {
    	return ' a month';
    };
  };
});