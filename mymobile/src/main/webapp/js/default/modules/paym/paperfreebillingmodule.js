angular.module("paperFreeBillingModule", ['ngRoute'])
  .controller("paperFreeBillingController.getStatus", ['$scope', 'paperFreeBillingService',
  function($scope, paperFreeBillingService) {
    paperFreeBillingService.getStatus(function(paperFreeBillingResponse) {
      $scope.paperFreeBilling = new PaperFreeBilling($scope, paperFreeBillingResponse);
    });
  }
])  
  .controller("paperFreeBillingController.setStatus", ['$scope', 'paperFreeBillingService',
  function($scope, paperFreeBillingService) {
    $scope.paperFreeBillingSelected = function(paperFree) {
      $scope.$paperFreeBilling = !$scope.paperFreeBilling;
      /* fix for checkbox for IE8.. to be moved to some other place*/
      var checkboxID=document.getElementById('setPaperFreeBilling');
      var customCheckboxName=document.getElementById('checkbox');
      if(checkboxID.checked){
          customCheckboxName.className += ' checkbox-checked';
        }
      else{
          customCheckboxName.className = 'custom-checkbox';
        }   
    }
    $scope.submitPaperFreeBilling = function() {
      $scope.status = 'loading';
      paperFreeBillingService.setStatus(function(paperFreeBillingResponse) {
        $scope.paperFreeBilling = new PaperFreeBilling($scope, paperFreeBillingResponse);
      });
    }

  }
]);