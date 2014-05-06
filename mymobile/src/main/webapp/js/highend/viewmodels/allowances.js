function Allowances() {
	var filterAllowances = function(allowances, summarise) {
		if (summarise && allowances.length > 0) {
			var filteredAllowances = [];
			filteredAllowances.push(allowances[0]);
			for (var i = 1; i < allowances.length; i++) {
				if (allowances[i].warningMessage) {
					filteredAllowances.push(allowances[i]);
				}
			}
			return filteredAllowances;
		}
		else {
			return allowances;
		}
	};

	this.allowances = {
		'data' : [],
		'minutes' : [],
		'messages' : []
	};

	this.dataStatus = "loading";
	this.minutesStatus = "loading";
	this.messagesStatus = "loading";

	this.addDataAllowance = function(dataAllowance) {
		this.dataStatus = dataAllowance.error ? "error" : "success";
		if (dataAllowance.isValid || dataAllowance.error) {
			this.allowances.data.push(dataAllowance);
		}
	}

	this.addMinutesAllowance = function(minutesAllowance) {
		this.minutesStatus = minutesAllowance.error ? "error" : "success";
		this.allowances.minutes.push(minutesAllowance);
	}

	this.addMessagesAllowance = function(messagesAllowance) {
		this.messagesStatus = messagesAllowance.error ? "error" : "success";
		this.allowances.messages.push(messagesAllowance);
	}

	this.getAllowances = function(type, summarise) {
		return filterAllowances(this.allowances[type], summarise);
	}

	this.hasAllowances = function(type) {
		return this.allowances[type].length > 0;
	}

	this.hasSomeAllowances = function() {
		return (this.allowances.data.length > 0 || this.allowances.minutes.length > 0 || this.allowances.messages.length > 0)
	}

	this.errorRetrievingBothMinuteAndMessageAllowances = function() {
	    if(this.allowances.minutes.length > 0 && this.allowances.minutes[0].error
	        && this.allowances.messages.length > 0 && this.allowances.messages[0].error)
	        return true;
	    return false;
    }
}