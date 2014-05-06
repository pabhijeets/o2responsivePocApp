angular.module("rewardsModule", ['ngRoute'])
.controller("rewardsController.getRewards", ['$scope', 'rewardsService',
	function($scope, rewardsService) {
		rewardsService.getRewards(function(rewardsResponse) {
			$scope.rewards = new Rewards($scope, rewardsResponse).rewards;
		});
	}
]);