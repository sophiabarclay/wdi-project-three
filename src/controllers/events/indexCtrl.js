function indexCtrl($scope, $http) {
  // removed $auth from indexCtrl arguments
  $http({
    method: 'GET',
    url: '/api/events'
  }).then(result => {
    $scope.allEvents = result.data;
    $scope.filteredEvents = $scope.allEvents;
  });

  $scope.handleFilterSubmit = function() {
    console.log('Filter form submitted!', $scope.searchTerm);
    $scope.filteredEvents = $scope.allEvents.filter(event =>
      event.name.toLowerCase().startsWith($scope.searchTerm.toLowerCase())
    );
  };
}

export default indexCtrl;
