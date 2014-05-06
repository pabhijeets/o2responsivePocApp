function MyBolton(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.status = getStatus(obj.status);
  this.boltOnFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : null;
  this.startDate = obj.startDate;
  this.endDate = obj.expiryDate;
  this.billingInterval = getBillingInterval(obj.billingInterval);
  this.description = obj.description;
}

function getStatus(status){
  if(status ==='ACTIVE'){
    return 'Active';
  }else if(status==='PENDING_ADDITION'){
    return 'Pending for addition';
  }else if(status==='PENDING_REMOVAL'){
    return 'Pending for removal';
  }else if(status === 'PENDING_MODIFICATION'){
    return 'Pending for modification';
  }else{
    return status;
  }
}

function getBillingInterval(interval){
  if(interval ==='MONTHLY'){
    return 'per month';
  }else if(interval==='ONE_OFF'){
    return 'one-off';
  }
}

function getTitle(boltons){
  if(!boltons.hasCoreOrPromotionalDataBolton || boltons.hasCoreDataBolton){
    return 'Data allowance Bolt On';
  } 
  else if(boltons.hasCoreOrPromotionalDataBolton && !boltons.hasCoreDataBolton){
    return 'Inclusive Bolt On';
  }
}

function MyBoltons(boltons) {
  this.myboltonList = [];
  this.myCoreOrPromotionalDataBoltonList = [];
  this.myDataBoltonList = [];
  this.dataBoltOnsCount=0;
  this.otherBoltOnsCount=0;
  this.reasonForPendingRemoval = false;


  for (var count = 0; count < boltons.length; count++) {
    if (boltons[count].category === 'CORE_DATA' || boltons[count].category === 'PROMOTIONAL') {
      if (boltons[count].category === 'CORE_DATA') {
        this.hasCoreDataBolton = true;
      }
      if (boltons[count].status == 'ACTIVE'){
        this.hasActiveCoreOrPromotionalDataBolton = true;
      }
      this.myCoreOrPromotionalDataBoltonList.push(new MyBolton(boltons[count]));

      this.hasCoreOrPromotionalDataBolton = true;
      this.dataBoltOnsCount++;
    }else if (boltons[count].category === 'DATA') {
      var dataBolton = new MyBolton(boltons[count]);
      this.myDataBoltonList.push(dataBolton);
      this.reasonForPendingRemoval = (this.reasonForPendingRemoval | dataBolton.reasonForPendingRemoval);
      this.dataBoltOnsCount++;
    }else {
      var myBolton = new MyBolton(boltons[count]);
      this.myboltonList.push(myBolton);
      this.reasonForPendingRemoval = (this.reasonForPendingRemoval | myBolton.reasonForPendingRemoval);
      this.otherBoltOnsCount++;
    }
  }

  this.error = boltons.error;
  this.collapsed = true;

  this.title = getTitle(this);

  if(this.myCoreOrPromotionalDataBoltonList.length == 2){
    var coreOrPromoBoltOns = this.myCoreOrPromotionalDataBoltonList;
    if(coreOrPromoBoltOns[0].category === 'CORE_DATA' && coreOrPromoBoltOns[1].category === 'CORE_DATA'
      && ((coreOrPromoBoltOns[0].status === 'Pending for addition' && coreOrPromoBoltOns[1].status === 'Pending for removal') ||
          (coreOrPromoBoltOns[1].status === 'Pending for removal' && coreOrPromoBoltOns[1].status === 'Pending for addition'))){
      this.hasSwappedCoreDataBoltOn = true;
    }
  }
}