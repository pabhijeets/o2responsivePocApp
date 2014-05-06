angular.module("offersModule", ['ngRoute'])
.controller("offersController.getOffers", ['$scope', '$rootScope', 'offersService',
	function($scope, $rootScope, offersService) {
        $scope.getOffers = function(){
            $scope.offerAcceptanceStatus = "loading";
            offersService.getOffers(function(offersResponse) {
                $scope.offers = new Offers($scope, offersResponse).offers;
                $scope.useCommon = true;
            },
            function(){
                $scope.offers = new Offers($scope, []).offers;
            });
        };

        $scope.getOffers();

        $scope.setOfferPreferences = function(selectedOfferId, selectedAction, url, newWindow){
           offerPreference = new OfferPreference(selectedOfferId, selectedAction);
           offersService.setOfferPreferences(offerPreference, function(){
                if(selectedAction=="negative"){
                    $scope.offerAcceptanceStatus = "negative";
                }else if(selectedAction=="positive"){
                    $scope.offerAcceptanceStatus = "positive";
                }
                $($.find('.overlay-close')[0]).bind("click", function(){
                    if(url!=undefined){
                        if(newWindow == true){
                            window.open(url, "_blank");
                            window.location.replace(MYMOBILE_BASE_URL+ "myoffers/offers?disambiguation_id="+$rootScope.disambiguationId);
                        }else{
                            window.location.replace(MYMOBILE_BASE_URL + url);
                        }
                    }else{
                        window.location.replace(MYMOBILE_BASE_URL+ "myoffers/offers?disambiguation_id="+$rootScope.disambiguationId);
                    }
                });
           }, function(){
                $scope.offerAcceptanceStatus = "error";
           });
        };
	}
]);