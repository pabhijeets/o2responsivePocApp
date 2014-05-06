function Bolton(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.description = obj.description;
  this.monthlyFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : null;
  this.selected = false;
}

function Boltons(boltons) {
  this.boltonList = [];
  for (var count = 0; count < boltons.length; count++) {
      this.boltonList.push(new Bolton(boltons[count]));
  }
    this.error = boltons.error;
}