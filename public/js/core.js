function UWCollabCtrl($scope) {

	$scope.sentMessages = [];

	$scope.currentMessage;

	$scope.sendMessage = function() {
		$scope.sentMessages.push($scope.currentMessage);
	};

}