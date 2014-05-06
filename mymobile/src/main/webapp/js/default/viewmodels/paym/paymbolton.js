function PaymBolton(obj) {
  this.id = obj.id;
  this.name = obj.name;
  this.status = getStatus(obj.status);
  this.boltOnFee = obj.monthlyFee ? obj.monthlyFee.valueInPence : null;
  this.startDate = obj.startDate;
  this.endDate = obj.expiryDate;
  this.billingInterval = getBillingInterval(obj.billingInterval);
  this.description = obj.description;
  this.category = obj.category;
  this.displayCategory = getPayMDisplaybleCategoryText(obj.category);
  this.reasonForPendingRemoval = showReasonForPendingRemoval(obj.expiryDate, this.status);
  this.internationalFavourite = obj.internationalFavourite;
  this.tugo = obj.tugo;
  this.action = getBoltonAction(obj);
  this.cancelToken = obj.cancelToken;
  this.immediate = obj.immediate;
  this.exclusiveGroups = obj.exclusiveGroups;
}

function getBoltonAction(obj) {
    if(obj.family) {
        return {caption: 'Manage', url: 'family'};
    } else if(obj.status ==='ACTIVE' && obj.o2Travel) {
        return {caption: 'Swap', url: ''};
    } else if(isRemovableBolton(obj)) {
        return {caption: 'Remove', url: 'paymonthly/mytariffandboltons/removebolton?boltonIdToRemove=' + obj.id};
    } else if(obj.status === 'PENDING_ADDITION' && obj.cancelToken != null && !obj.immediate && !obj.o2WebDaily) {
        return {caption: 'Cancel', url: 'paymonthly/mytariffandboltons/cancelboltonchange?boltonIdToCancel=' + obj.id};
    } else {
        return null;
    }
}

function isRemovableBolton(obj) {
    return obj.status === "ACTIVE"
            && obj['default'] === false
            && (obj.classification !== 'Family Subscription')
            && (obj.classification !== 'Family Discount')
            && (obj.classification !== 'Bar')
            && (obj.classification !== 'Billing Option')
            && (obj.classification !== 'Insurance')
            && (obj.classification !== 'Supplementary Service')
            && (obj.classification !== 'Subscription Discount')
            && (obj.monthlyFee ? obj.monthlyFee.valueInPence !== 0 : false)
            && obj.oneOff === false
            && obj.tugo === false;
}

function getPayMDisplaybleCategoryText(category) {
  var CategoryTextMap = {
    "ADDITIONAL": "Additional Bolt Ons",
    "CALLING_ABROAD": "Calling abroad from the UK",
    "CALLING_FROM_ABROAD": "Calling when abroad",
    "CALLING_IN_EUROPE": "Calling when in Europe",
    "DATA": "Data",
    "DATA_ABROAD": "Using your phone abroad",
    "CORE_DATA": "Data Allowance",
    "SUPPORT": "Support",
    "MESSAGING": "Messaging",
    "PROMOTIONAL": "Promotional",
    "YOUR_FAMILY": "Your Family"
  }
  return CategoryTextMap[category] ? CategoryTextMap[category] : category;
}

function showReasonForPendingRemoval(expiryDate, status){
  if('Pending for removal' === status) {
    var today = new Date();
    today.setHours(0,0,0,0);
    var expiry =  new Date(expiryDate);
    return expiryDate ? (expiry < today) : false;
  }
  return false;
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

function getIsMutexWithAnyPendingAdditionBoltOn(boltonListToProcess, otherBoltonList) {
  var allBoltonsList = merge(boltonListToProcess, otherBoltonList);
  each(boltonListToProcess, function(currentBolton) {
    if (currentBolton.status === 'Pending for removal' && currentBolton.cancelToken != null && !currentBolton.immediate) {
      currentBolton.action = {
        caption: 'Cancel',
        url: 'paymonthly/mytariffandboltons/cancelboltonchange?boltonIdToCancel=' + currentBolton.id
      }
      each(currentBolton['exclusiveGroups'], function(exclusiveGroup1) {
        each(allBoltonsList, function(otherBolton) {
          each(otherBolton['exclusiveGroups'], function(exclusiveGroup2) {
            if (currentBolton.id != otherBolton.id && exclusiveGroup1 === exclusiveGroup2) {
              if (!otherBolton.o2WebDaily && otherBolton.status === 'Pending for addition') {
                currentBolton.action = null;
              }
            }
          });
        });
      });
    }
  });
}

function PaymBoltons(boltons) {
  this.myboltonList = [];
  this.myCoreOrPromotionalDataBoltonList = [];
  this.myDataBoltonList = [];
  this.dataBoltOnsCount=0;
  this.otherBoltOnsCount=0;
  this.reasonForPendingRemoval = false;
  this.groupedMyBoltonList = [];
  this.groupedMyDataBoltonList = [];

  for (var count = 0; count < boltons.length; count++) {
    if (boltons[count].category === 'CORE_DATA' || boltons[count].category === 'PROMOTIONAL') {
      if (boltons[count].category === 'CORE_DATA') {
        this.hasCoreDataBolton = true;
      }
      if (boltons[count].status == 'ACTIVE'){
        this.hasActiveCoreOrPromotionalDataBolton = true;
      }
      this.myCoreOrPromotionalDataBoltonList.push(new PaymBolton(boltons[count]));

      this.hasCoreOrPromotionalDataBolton = true;
      this.dataBoltOnsCount++;
    }else if (boltons[count].category === 'DATA') {
      var dataBolton = new PaymBolton(boltons[count]);
      this.myDataBoltonList.push(dataBolton);
      this.reasonForPendingRemoval = (this.reasonForPendingRemoval | dataBolton.reasonForPendingRemoval);
      this.dataBoltOnsCount++;
    }else {
      var myBolton = new PaymBolton(boltons[count]);
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

  //for core or promotional boltons add cancel action
  getIsMutexWithAnyPendingAdditionBoltOn(this.myCoreOrPromotionalDataBoltonList, this.myboltonList);
  //for core or additional boltons add cancel action
  getIsMutexWithAnyPendingAdditionBoltOn(this.myboltonList, this.myCoreOrPromotionalDataBoltonList);

  this.allBoltonsList = [];
  this.myDataBoltonAndOtherBoltonsList = [];
  for (var i = 0; i < this.myCoreOrPromotionalDataBoltonList.length; i++) {
    this.allBoltonsList.push(this.myCoreOrPromotionalDataBoltonList[i]);
  };
  for (var i = 0; i < this.myDataBoltonList.length; i++) {
    this.allBoltonsList.push(this.myDataBoltonList[i]);
    this.myDataBoltonAndOtherBoltonsList.push(this.myDataBoltonList[i]);
  };
  for (var i = 0; i < this.myboltonList.length; i++) {
    this.allBoltonsList.push(this.myboltonList[i]);
    this.myDataBoltonAndOtherBoltonsList.push(this.myboltonList[i]);
  };

  this.groupedMyBoltonList = groupBy(this.myboltonList, "category");
  this.groupedMyDataBoltonList = groupBy(this.myDataBoltonList, "category");
}