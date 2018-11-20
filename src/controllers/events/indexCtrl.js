function indexCtrl($scope, $http) {
  // removed $auth from indexCtrl arguments
  $http({
    method: 'GET',
    url: '/api/events'
  }).then(result => {
    console.log('this is result', result, 'this is result.data', result.data, 'and this is $scope.allEvents', $scope.allEvents);
    $scope.allEvents = result.data;
    $scope.filteredEvents = $scope.allEvents;
  });

  $scope.handleFilterSubmit = function() {
    console.log('Filter form submitted!', $scope.searchTerm);
    $scope.filteredEvents = $scope.allEvents.filter(event =>
      event.title.toLowerCase().startsWith($scope.searchTerm.toLowerCase()) ||
      event.artist.toLowerCase().startsWith($scope.searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().startsWith($scope.searchTerm.toLowerCase())
    );
  };
}

export default indexCtrl;
