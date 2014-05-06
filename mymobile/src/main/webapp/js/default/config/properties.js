defaultProperties = {
	"templateURL": ASSET_URL + "templates/default",
	"assetsURL": ASSET_URL,
	"mymobileBaseUrl": MYMOBILE_BASE_URL,
	errorMessage : "This information is not available at the moment. Please try again later.",
	customErrorMessage: {
		paperFreeBillingSetupError : "Sorry, we could not switch you to paper-free billing. Please try again later.",
		paperFreeBillingFetchError : "Your paper-free billing preference is not available at the moment. Please try again later.",
		viewpaymentdetails : "Your payment details are not available at the moment. Please try again later.",
		pinCreationFailure : "Sorry, there was an error updating your PIN information. Please try again later.",
		pinResetFailure : "Sorry, there was an error updating your PIN information. Please try again later.",
		pinChangeFailure : "Sorry, there was an error updating your PIN information. Please try again later.",
		changePaymentDetailsError : "Sorry, there was an error updating your payment details. Please try again later.",
		pinAttemptsExceeded: "You have incorrectly entered your PIN three times.",
		pinAttemptsExceeded_secondLine: "Your payment details are now locked, in order to proceed please logout and try again later.",
		offerDetailsError: "There was an error updating your offer preference. Please try again later."
	},
	serviceEndpoints : {
		"common" : {
			"phoneDetails" : MYMOBILE_BASE_URL + "api/default/phonedetails",
            "myOrders" : MYMOBILE_BASE_URL + "api/myorders",
			"mobileNumbers":MYMOBILE_BASE_URL + "api/userdetails/mobilenumbers",
			"billingAddress":MYMOBILE_BASE_URL + "api/userdetails/billingaddress",
			"offers" : MYMOBILE_BASE_URL + "api/offers"
		},
		"paym" : {
			"validatePin": MYMOBILE_BASE_URL + "api/paymonthly/validatepin",
			"paymentType": MYMOBILE_BASE_URL + "api/paymonthly/paymenttype",
			"paymentdetials": {
				"changepaymentdetails": {
					"creditcard": MYMOBILE_BASE_URL + "api/paymonthly/paymentdetails/creditcard/change",
					"directdebit": MYMOBILE_BASE_URL + "api/paymonthly/paymentdetails/directdebit/change"
				}
			},
			"getPaperFreeBilling": MYMOBILE_BASE_URL + "api/paymonthly/paperfreebilling",
			"setPaperFreeBilling": MYMOBILE_BASE_URL + "api/paymonthly/setuppaperfreebilling",
			"createPin": MYMOBILE_BASE_URL + "api/paymonthly/security/pin/create",
			"resetPin": MYMOBILE_BASE_URL + "api/paymonthly/security/pin/reset",
			"changePin": MYMOBILE_BASE_URL + "api/paymonthly/security/pin/change",
			"getpendingtariff":MYMOBILE_BASE_URL + "api/paymonthly/mypendingtariff",
			"getswappabletravelboltons": MYMOBILE_BASE_URL + "api/paymonthly/swappabletravelbolton",
			"getswappableboltons": MYMOBILE_BASE_URL + "api/paymonthly/swappabledataboltons",
            "getswappableo2travelboltons": MYMOBILE_BASE_URL + "api/paymonthly/swappabletravelbolton"

		},
		"payg" : {
	        "topuphistory" : MYMOBILE_BASE_URL + "api/payandgo/topup/history",
	        "rewards" : MYMOBILE_BASE_URL + "api/payandgo/rewards"
	    }
	},

	constants: {
		mylatestbill:{
			contentUrl : "templates/default/common/overlay.html"
		},
		billsummarydetails:{
			contentUrl : "_assets/templates/default/paym/paperfreebilloverlay.html"
		},
		dataallowance:{
			heading : "Data Allowance",
			text : "data alowances"
		},
		minuteallowance:{
			heading : "Minute Allowance",
			text : "Minutes allowances" 
		},
		phoneDetailsIMEI:{
			heading: "What is the IMEI number?",
			text: "The International Mobile Equipment Identifier is unique to your phone and will be useful to the police if your phone is ever lost or stolen."
		},
		phoneDetailsPUK:{
			heading: "What is the PUK number?",
			text: "The PUK is your Personal Unblocking Key. If you enter your PIN number incorrectly three times the phone will be blocked, but you can use this code to unlock it."
		}

	},

	widgets: {
		common:{
			phonedetails: {
				title: "Phone details",
				titleSize: "small",
				iconUrl: null,
				showBgImage:false
			},

            myorders: {
                title: "Recent orders",
                titleSize: "small",
                iconUrl: null,
                showBgImage:false,
                orderStatus: {
                    "IN_PROGRESS" : "In Progress",
                    "CANCELLED" : "Cancelled",
                    "COMPLETE" : "Complete"
                }
            },

            "offers": {
                title: "Offers just for you",
                titleSize: "small"
            }
		},
		paym: {
			mylatestbill: {
				title: "Latest bill",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_bill.png",
				showBgImage:true,
				iconClass: "mylatestbill-icon"
			},

			phoneplan : {
				title: "Phone Plan",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_phoneplan.png",
				iconClass: "phoneplan-icon"
			},
			
			changeCreditCardDetails: {
				title: "Enter your new credit card details",
				titleSize: "medium",
				showBgImage:false
			},
			
			viewpaymentdetails: {
				title: "Payment details",
				titleSize: "medium",
				iconUrl: "_assets/img/highend/icon_paymentdetails.png",
				showBgImage:true,
				iconClass: "paymentdetails-icon"
			},

			myrecentcharges: {
				title: "Recent charges",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_recentcharges.png",
				showBgImage:false,
				iconClass: "myrecentcharges-icon"
			},

			myallowances: {
				title: "Allowances",
				titleSize: "large",
				grouped : "stacked-first-unit",
				iconUrl: "_assets/img/highend/icon_allowances.png",
				showBgImage:false,
				iconClass: "myallowances-icon"
			},
			mytariff: {
				title: "Tariff",
				titleSize: "medium",
				hideIcon: true,
				iconUrl: null
			},

			myboltons: {
				title: "Bolt Ons",
				titleSize: "medium",
				grouped : "stacked-last-unit",
				hideIcon: true,
				iconUrl: null
			},

			myupgradeoptions: {
				title: "Upgrade options",
				titleSize: "large",
				iconUrl: "_assets/img/highend/icon_upgrade.png",
				showBgImage:true,
				iconClass: "myupgradeoptions-icon"
			},

			billsummarydetails: {
				titleSize: "medium"
			},

			tariffsummarydetails: {
				title: "Tariff",
				titleSize: "medium"
			},
			pendingtariffsection: {
				title: "Your new tariff",
				titleSize: "medium"
			},

			pendingtariffsummarydetails: {
				title: "Tariff",
				titleSize: "medium"
			},

			pendingtariffboltons: {
				title: "Including these additional Bolt Ons",
				titleSize: "small"
			},

			tariffdetails: {
				title: "Tariff details",
				titleSize: "small"
			},

			coreorpromoboltonsummarydetails: {
				title: "Data allowance Bolt On",
				titleSize: "small"
			},

			dataallowance : {
				title : "UK data",
				iconType : "donutchart",
				callToAction : "none",
				summaryTemplate : "allowancesummary.html",
				noAllowanceMessage : "There is no UK data allowance included with your tariff. You'll be charged at your standard rate for any data you use.",
				threshold : 80,
				warningMessage : {
					CAPPED : "You've almost used all your data allowance. Once it's all used up, you'll be unable to use any more data.",
					OVERAGE_WITH_BUNDLE : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at your standard rate for any data you use.",
					WEB_DAILY : "You've almost used all your data allowance. Once it's all used up, you'll be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
				},
				criticalMessage : {
					CAPPED : "You've used all of your data allowance. Add a data Bolt On to continue using data.",
					OVERAGE_WITH_BUNDLE : "You've used all of your data allowance. You'll be charged for data at your standard rate for any data you use.",
					WEB_DAILY : "You've used all of your data allowance. You'll now be charged for data at our standard calling rates, see <a class=\"inline-custom-link\" href=\"#/callingplan\">Calling plan</a>."
				}
			},

			minutesallowance : {
				title : "Minutes",
				iconType : "donutchart",
				callToAction : "none",
				summaryTemplate : "allowancesummary.html",
				noAllowanceMessage : "There is no minutes allowance included with your tariff. You'll be charged at your standard rate for any minutes you use.",
				threshold : 80,
				warningMessage : "You are getting close to your minutes allowance limit.",
				criticalMessage : "You have used all your minutes allowance."
			},

			messagesallowance : {
				title : "Messages",
				iconType : "donutchart",
				callToAction : "none",
				summaryTemplate : "allowancesummary.html",
				noAllowanceMessage : "There is no messages allowance included with your tariff. You'll be charged at your standard rate for any messages you send.",
				threshold : 80,
				warningMessage : "You are getting close to your messages allowance limit.",
				criticalMessage : "You have used all your messages allowance."
			},

			allowanceslink : {
				title : "Allowances",
				iconType : "img",
				iconUrl: ASSET_URL + "img/highend/icon_allowances.png",
				callToAction : "new-page",
				newPageRoute : "/allowances",
				widgetText : "Tarrif, Bolt Ons and Calling Plan"
			},

			billingaddress: {
				title: "Billing addresses",
				titleSize: "medium"
			}
		},

		payg: {
			"paygtariff" : {
				title : "Tariff",
				titleSize : "large",
				iconType : "img",
				iconUrl: ASSET_URL + "img/default/icon_tariff.png",
				callToAction : "new-page",
				newPageRoute : "/tariff",
				widgetText : "Tariff",
				iconClass: "payg-icon"
			},
            "balanceandallowance": {
                title : "Current balance",
                titleSize : "large",
                iconType : "img",
                iconUrl: ASSET_URL + "img/highend/icon_allowances.png",
                showBgImage:true,
                iconClass: "payg-icon-balance-allowance"

            },
            "boltons" : {
                title : "Bolt Ons",
                titleSize : "large",
                iconType : "img",
                iconUrl: ASSET_URL + "img/highend/icon_boltons.png",
                iconClass: "payg-icon-boltons"
             },
             "rewards" : {
                title : "My O2 Rewards",
                titleSize : "small",
                callToAction : "new-page",
                newPageRoute : "/tariff",
                signupLink : "http://payandgorewards.o2.co.uk/",
                o2rewardsLink : "http://payandgorewards.o2.co.uk/"
             },
            "tariffdetails" : {
                title : "Tariff",
                titleSize : "medium",
                status: {
                    "ACTIVE": 'Active',
                    "PENDING_RECHARGE": 'Awaiting top up',
                    "PENDING_REMOVAL": {
                        "nextPaymentDateInPast" : "To be removed",
                        "nextPaymentDateNotInPast" : "To be removed on anniversary date"
                    },
                    "OTHER": "N/A"
                }
            },
            "boltonsdetail" : {
				title: "Your additional Bolt Ons",
				titleSize: "medium"
			},
			"callingplan" : {
                title: "Calling plan",
                titleSize: "small"
            }
		}
	},
	phoneDetailsMessage : {
		gprsAndMMSSupported : "Your mobile device is capable of having mobile internet (GPRS WAP) and picture messaging (MMS).",
		onlyGPRSSupported: "Your mobile device is capable of having mobile internet (GPRS WAP).",
		onlyMMSSupported: "Your mobile device is capable of having picture messaging (MMS).",
		gprsAndMMSNotSupported: "Your mobile device is not capable of having mobile internet(GPRS WAP) and picture messaging. Please contact Customer Service for help with this."
	}
}
