properties = {
	"serviceEndpoints" : {
		"getUserDetails" : MYMOBILE_BASE_URL+"api/userdetails",
		"paym" : {
			"getAvailableBoltons" : MYMOBILE_BASE_URL+"api/paymonthly/boltons/getavailableboltons",
			"addBoltons" : MYMOBILE_BASE_URL+"api/paymonthly/boltons/addboltons",
			"getDataAllowances" : MYMOBILE_BASE_URL+"api/paymonthly/myallowance/data",
			"getMinutesAllowances" : MYMOBILE_BASE_URL+"api/paymonthly/myallowance/minutes",
			"getMessagesAllowances" : MYMOBILE_BASE_URL+"api/paymonthly/myallowance/messages",
			"getBoltonsSummary" : MYMOBILE_BASE_URL+"api/paymonthly/myboltonssummary",
			"getBillDetails" : MYMOBILE_BASE_URL+"api/paymonthly/mybilldetails",
			"getTariff" : MYMOBILE_BASE_URL+"api/paymonthly/mytariffandboltons/tariffsummary",
			"getCallingPlan" : MYMOBILE_BASE_URL+"api/paymonthly/mytariff/callingplan",
			"getRecentCharges" : MYMOBILE_BASE_URL+"api/paymonthly/recentcharges",
            "getUpgradeEligibility" : MYMOBILE_BASE_URL+"api/paym/upgradeeligibility",
            "getCCAPhonePlan" : MYMOBILE_BASE_URL+"api/paym/ccaphoneplan"
		},
		"payg" : {
			"getBalanceAndAllowance" : MYMOBILE_BASE_URL+"api/payandgo/balanceandallowance",
			"getBoltons" : MYMOBILE_BASE_URL+"api/payandgo/boltons",
            "getTariffDetails" : MYMOBILE_BASE_URL+"api/payandgo/tariffdetails"
		}
	},
	"thresholdBalance": 200,
	"errorMessage" : "This information is not available at the moment. Please try again later.",
    "headings" : {
        "home" : "My O2",
        "allowances" : "Allowances",
        "callingplan" : "Call and text charges",
        "adddataboltons" : "Add data Bolt Ons",
        "balanceInformation" : "Balance Information",
        "dataInformation" : "Data information",
        "paygcallingplan" : "Call and text charges",
        "upgradeoptions": "Upgrade options",
        "anniversarydateinfo" : "Anniversary date",
        "phoneplan" : "Phone Plan",
        "phoneplaninformation" : "Phone plan information"
    },

    "paygBalanceAndAllowanceWarningMessage" : {
		"simplicityNoAllowance" : {
			"zeroBalance" : "Your balance is zero. Top up to get your next monthly allowance.",
			"balanceLessThanThreshold" : "Your balance is running low. Top up to get your next monthly allowance."
		},
		"pendingRecharge" : "Your balance was too low to get your monthly allowance. Top up to get your allowance.",
		"simplicityPaidFor" : {
			"inArrears" : "Your anniversary date has passed. Your balance was too low, top up to cover the cost of your tariff next month.",
			"notInArrears" : "You need enough balance on <next-payment-date> to cover the cost of your tariff next month."
		},
		"active" : {
			"inArrears" : "Your anniversary date has passed. Top up to receive your monthly allowance today.",
			"notInArrears" : "Top up by your anniversary date to get your next monthly allowance."
		}
	},

    "image" : {
		"alertUrl" : "icon_alert",
		"warningUrl" : "icon_warning"
	},

	"templateURL": ASSET_URL + "templates/highend",
	"assetsURL": ASSET_URL,
	"imagesURL": ASSET_URL + 'img/highend',

	"mylatestbill" : {
		title : "Latest bill",
		iconType : "img",
		iconUrl: "icon_bill",
		callToAction : "open-close",
		nextBillMessage : {
			BILL_DATE_NOT_TODAY : "Your next <billType> will arrive in <span class=\"bold\"><b><daysToNextBill></b></span>, on <span class=\"bold\"><b><nextbillDate></b></span>.",
			BILL_DATE_TODAY : "Your next <billType> will arrive today."
		},
		noBillMessage : "Your latest <billType> amount will appear here once your first bill has been produced on <span class=\"bold\"><time id=\"firstBillDateValue\"><nextbillDate></time></span>.",
		inTreatmentBillMessage : {
			summary : "<div class=\"grid-row\"><o2svg svgclass='alert-icon-intreatment' nonsvgclass='alert-icon-intreatment' name=\"'icon_warning'\" fallbackext='png'></o2svg><span id=\"inTreatmentBillSummaryMessage\" class=\"alert-message-comment\">Have you paid your latest bill?</span></div>",
			detail : "If you haven't paid your bill, please do it now to keep using your phone. If you have already paid, thank you. Our records take a little while to update."
		}
	},

	"myrecentcharges" : {
		title : "Recent charges",
		iconType : "img",
		iconUrl: "icon_recentcharges",
		callToAction : "open-close"
	},

	"mytariff" : {
		title : "Tariff",
		iconType : "img",
		iconUrl: "icon_tariff",
		callToAction : "open-close"
	},

	"myboltons" : {
		title : "Bolt Ons",
		iconType : "img",
		iconUrl: "icon_boltons",
		callToAction : "open-close"
	},

	"callingplan" : {
		title : "Call and text charges",
		iconType : "img",
		iconUrl: "icon_callingplan",
		callToAction : "new-page",
		newPageRoute : "/callingplan"
	},

	"myphoneplan" : {
		title : "Phone Plan",
		iconType : "img",
		iconUrl: "icon_phoneplan",
		callToAction : "new-page",
		newPageRoute : "/phoneplan"
	},

	"myupgradeoptions" : {
		title : "Upgrade options",
		iconType : "img",
		iconUrl: "icon_upgrade",
		callToAction : "new-page",
		newPageRoute : "/upgradeoptions"
	},

	"paygmytariff" : {
		title : "Tariff",
		iconType : "img",
		iconUrl: "icon_tariff",
		callToAction : "open-close"
	},

	"paygbalanceandallowance" : {
		title : "Current balance",
		iconType : "img",
		iconUrl: "icon_allowances",
		callToAction : "open-close",
		openByDefault : true
	},

	"dataallowance" : {
		title : "UK Data",
		iconType : "donutchart",
		callToAction : "none",
		summaryTemplate : "allowancesummary.html",
		noAllowanceMessage : "There is no UK data allowance included with your tariff. You'll be charged at your standard rate for any data you use.",
		threshold : 80,
		warningMessage : {
			CAPPED : "You've almost used all your data allowance. Once it's all used up, you'll be unable to use any more data.",
			OVERAGE_WITH_BUNDLE : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at your standard rate.",
			WEB_DAILY : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
		},
		criticalMessage : {
			CAPPED : "You've used all of your data allowance.",
			OVERAGE_WITH_BUNDLE : "You've used all of your data allowance.  You'll be charged for data at your standard rate.",
			WEB_DAILY : "You've used all of your data allowance. You'll now be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
		}
	},

	"minutesallowance" : {
		title : "Minutes",
		iconType : "donutchart",
		callToAction : "none",
		summaryTemplate : "allowancesummary.html",
		noAllowanceMessage : "There is no minutes allowance included with your tariff. You'll be charged at your standard rate for any minutes you use.",
		threshold : 80,
		warningMessage : "You are getting close to your minutes allowance limit.",
		criticalMessage : "You have used all your minutes allowance."
	},

	"messagesallowance" : {
		title : "Messages",
		iconType : "donutchart",
		callToAction : "none",
		summaryTemplate : "allowancesummary.html",
		noAllowanceMessage : "There is no messages allowance included with your tariff. You'll be charged at your standard rate for any messages you send.",
		threshold : 80,
		warningMessage : "You are getting close to your messages allowance limit.",
		criticalMessage : "You have used all your messages allowance."
	},

	"allowanceslink" : {
		title : "Allowances",
		iconType : "img",
		iconUrl: "icon_allowances",
		callToAction : "new-page",
		newPageRoute : "/allowances"
	},

	"paygcallingplan" : {
		title : "Call and text charges",
		iconType : "img",
		iconUrl: "icon_callingplan",
		callToAction : "new-page",
		newPageRoute : "/paygcallingplan"
	},

	"paygboltons" : {
		title : "Bolt Ons",
		iconType : "img",
		iconUrl: "icon_boltons",
		callToAction : "open-close",
		allowanceText : {
			NOT_APPLICABLE : "N/A",
			PENDING_RECHARGE : "Top up to use this Bolt On.",
			BLACKBERRY_DATA_ROAMING_VALID : "You have <EU> of European and <ROW> of Rest of the World data left.",
			BLACKBERRY_DATA_ROAMING_INVALID : "Unable to display."
		},
		statusText : {
			PENDING_ADDITION_PERIODIC_PAYMENT_DUE : "To be added on anniversary date",
			PENDING_ADDITION : "To be added",
			PENDING_REMOVAL_PERIODIC_PAYMENT_DUE : "To be removed on anniversary date",
			PENDING_REMOVAL : "To be removed",
			PENDING_RECHARGE : "Pending recharge. Balance too low",
			ACTIVE : "Ready for you to use",
			UNKNOWN : "N/A"
		}
	},

    "upgradeEligibility" : {
        paid: {
            LEASING: [
                "To get a brand new smartphone today, you can fast track upgrade to O2 Refresh by paying <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> – this includes a 25% discount on your remaining line rental. Or you can wait until the <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> to upgrade for free.",
                "Just take your current phone to an O2 shop or call us free from your mobile on 202 so we can send you an envelope to return it to us. Make sure it's sent back in good working condition to avoid any additional charges."
            ],
            HANDSET_SIMO: [
                "To get a brand new smartphone today, you can fast track upgrade to O2 Refresh by paying <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> – this includes a 25% discount on your remaining line rental. Or you can wait until the <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> to upgrade for free.",
                "To fast track to O2 Refresh, visit our upgrade shop."
            ],
            CCA : [
                "You can pay <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> now to pay off your Phone Plan and choose a new phone or you can wait until <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> for your free upgrade.",
                "To upgrade visit the upgrade shop."
            ],
            HANDSET_SIMO_STAFF: [
                "To get a brand new smartphone today, you can fast track upgrade to O2 Refresh by paying <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> – this includes a 25% discount on your remaining line rental. Or you can wait until the <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> to upgrade for free.",
                "To upgrade now call us on 202 from your mobile."
            ],
            CCA_STAFF : [
                "You can pay <span class=\"bold\">{{paidUpgradeOption.upgradeCost | currencyFormatter:true}}</span> now to pay off your Phone Plan and choose a new phone or you can wait until <span class=\"bold\">{{freeUpgradeOption.eligibilityDate | dateFormatter}}</span> for your free upgrade.",
                "To upgrade now call us on 202 from your mobile."
            ]
        },

        free: {
            LEASING: [
                "You can upgrade now. As an existing customer you'll always get our very best deals.",
                "Just take your current phone to an O2 shop or call us free from your mobile on 202 so we can send you an envelope to return it to us. Make sure it's sent back in good working condition to avoid any additional charges."
            ],
            HANDSET_SIMO: [
                "You can upgrade now. As an existing customer you'll always get our very best deals.",
                "To fast track to O2 Refresh, visit our upgrade shop."
            ],
            CCA : [
                "You can upgrade now. As an existing customer you'll always get our very best deals on a new phone and tariff.",
                "To fast track to O2 Refresh, visit our upgrade shop."
            ],
            HANDSET_SIMO_STAFF: [
                "You can upgrade now. As an existing customer you'll always get our very best deals.",
                "To upgrade now call us on 202 from your mobile."
            ],
            CCA_STAFF : [
                "You can upgrade now. As an existing customer you'll always get our very best deals on a new phone and tariff.",
                "To upgrade now call us on 202 from your mobile."
            ]
        },
        noUpgrade: {
            MBB: "Mobile broadband customers are not eligible for upgrades.",
            IS_IN_TREATMENT: "You've got an unpaid bill - you can pay this off here. Once that's been sorted, come back here and we'll check to see if you can upgrade then.",
            IS_SIM_SWAPPED: "Sorry, you can't upgrade at the moment as you've recently changed your sim card. For your security, we ask that you wait at least 24 hours before upgrading. Please try again later.",
            IS_ORDER_IN_PROGRESS: "We're sorting out your upgrade order. As soon as we're done, we'll update your tariff details and let you know when you can upgrade next.",
            DEFAULT: "We're having some problems with our systems. Try again later and we should be able to get your upgrade date.",
            TARIFF_DOES_NOT_SUPPORT_UPGRADE: "To discuss your upgrade options, please contact Customer Service from your mobile on 202 or 0844 809 0202.",
            IS_SERVICE_BARRED: "Sorry you can't upgrade at this time. For more information contact Customer Service on 0844 809 0202.",
            UPGRADE_ENTITLEMENT_SERVICE_UNAVAILABLE: "The Upgrade Entitlement service is not available to the requester."
        },
        NO_FREE_TODAY: "You are not eligible for free upgrade today.",
        NOT_ELIGIBLE: "You are not eligible for upgrade today."

    }

};
