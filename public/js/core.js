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
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
		socket.emit('chat message', msg);
		$scope.currentMessage = "";
	};

	$scope.fromMe = function(from) {
		return from === $scope.clientId;
	};

	socket.on('connected to server', function(data){
		$scope.$apply(function() {
			$scope.clientId = data;
		});
	});

	socket.on('server sent message', function(data){
		$scope.$apply(function() {
			$scope.messages.push(data);
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			var objDiv = document.getElementById("message-list");
			objDiv.scrollTop = objDiv.scrollHeight + 100;
		});
	});
}
