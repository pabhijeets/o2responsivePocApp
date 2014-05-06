function UserDetails(obj) {
  this.mobileNumber = obj.registeredMobileNumber ? obj.registeredMobileNumber.value : undefined;
  this.emailAddress = obj.emailAddress;
  this.accountId = obj.accountId;
  this.ismonthly = obj.monthlyUser;
  this.isCCA = obj.cca;
  this.error = obj.error;
}