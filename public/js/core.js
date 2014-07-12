function UWCollabCtrl($scope) {
	var socket = io();
	$scope.messages = [];
	$scope.clientId;

	$scope.currentMessage;

	$scope.sendMessage = function() {
		var msg = {
			from: $scope.clientId,
			text: $scope.currentMessage
		}
		socket.emit('chat message', msg);
		console.log(msg);
	};

	socket.on('connected to server', function(data){
		$scope.$apply(function() {
			$scope.clientId = data;
		});
	});

	socket.on('server sent message', function(data){
		$scope.$apply(function() {
			$scope.messages.push(data);
		});
	});
}
