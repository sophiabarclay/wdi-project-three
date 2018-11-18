function newCtrl($scope, $http, $state, $auth) {
  $scope.handleSubmit = function() {
    console.log('$auth.getPayload is', $auth.getPayload());
    $scope.event.createdBy = $auth.getPayload().sub;
    $http({
      method: 'POST',
      url: '/api/events',
      data: $scope.event
    }).then(result => $state.go('eventsShow', {
      id: result.data._id
    }));
  };
}

export default newCtrl;
