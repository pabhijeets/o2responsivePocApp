function MyLatestBillDetail(obj, $filter, isCCA) {
  var getDateDifferenceInDays = function (fromDate, toDate) {
      return Math.round((toDate-fromDate)/(24*3600*1000));
  }

  this.error = obj.error;
  this.collapsed = true;

  this.nextBillDate = obj.nextBillDate;
  this.paymentDueDate = obj.paymentDueDate;
  this.billAmount = obj.billAmount ? obj.billAmount.valueInPence : null;
  this.currentBalance = obj.currentBalance ? obj.currentBalance.valueInPence : null;
  this.billDate = obj.billDate;
  this.inTreatment = obj.inTreatment;

  this.daysToNextBill = getDateDifferenceInDays(new Date().getTime(), this.nextBillDate);

  var daysToNextBillString = this.daysToNextBill + (Math.abs(this.daysToNextBill) > 1 ? " days" : " day");
  var nextBillDateString = $filter("dateFormatter")(this.nextBillDate);

  this.nextBillMessage = properties.mylatestbill
                          .nextBillMessage[this.daysToNextBill != 0 ? "BILL_DATE_NOT_TODAY" : "BILL_DATE_TODAY"]
                          .replace("<daysToNextBill>", daysToNextBillString)
                          .replace("<nextbillDate>", nextBillDateString)
                          .replace("<billType>", isCCA ? "airtime bill" : "bill");

  if (!this.paymentDueDate) {
    this.noBillMessage = properties.mylatestbill
                            .noBillMessage
                            .replace("<nextbillDate>", nextBillDateString)
                            .replace("<billType>", isCCA ? "airtime bill" : "bill");
  }

  if(this.inTreatment) {
      this.inTreatmentBillMessage = properties.mylatestbill.inTreatmentBillMessage;
  }
}