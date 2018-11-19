function editCtrl($scope, $state, $http) {
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  }).then(result => $scope.event = result.data);
  $scope.handleSubmit = function() {
    $http({
      method: 'PUT',
      url: `/api/events/${$state.params.id}`,
      data: $scope.event
    }).then(() => $state.go('eventsShow', { id: $state.params.id }));
  };
}

export default editCtrl;
