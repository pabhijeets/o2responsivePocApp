function MyRecentCharges(obj) {
  this.error = obj.error;
  this.collapsed = true;
    
  this.voiceCharge = obj.voiceCharge ? obj.voiceCharge.valueInPence : null;
  this.messageCharge = obj.messageCharge ? obj.messageCharge.valueInPence : null;
  this.dataCharge = obj.dataCharge ? obj.dataCharge.valueInPence : null;
  this.internationalCharge = obj.internationalCharge ? obj.internationalCharge.valueInPence : null;
  this.otherCharge = obj.otherCharge ? obj.otherCharge.valueInPence : null;
  this.directToBillCharge = obj.directToBillCharge ? obj.directToBillCharge.valueInPence : null;
  this.totalCharge = obj.totalCharge ? obj.totalCharge.valueInPence : null;
  this.userHasBeenBilledBefore = obj.userHasBeenBilledBefore ? obj.userHasBeenBilledBefore : null;
}