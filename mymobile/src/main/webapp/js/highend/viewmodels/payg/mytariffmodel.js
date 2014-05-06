function MyTariffSummary(obj) {
	this.error = obj.error;
    this.tariffName = obj.currentTariff ? obj.currentTariff.tariffName : null;
    this.benefits = obj.currentTariff ? obj.currentTariff.benefits : null;
}