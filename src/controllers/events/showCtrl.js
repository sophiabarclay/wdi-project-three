import mapLib from '../../lib/map';

function showCtrl($state, $scope, $http) {
  $scope.comment = {};
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  }).then(result => {
    $scope.event = result.data;
    // mapLib.create('map-element', [51.515, -0.072], 6);
  });

  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/events/${$state.params.id}/comments`,
      data: $scope.comment
    }).then(result => {
      $scope.event = result.data;
      $scope.comment.text = null;
    });
  };

  $scope.deleteComment = function(comment) {
    $http({
      method: 'DELETE',
      url: `/api/events/${$state.params.id}/comments/${comment._id}`
    }).then(result => $scope.event = result.data);
  };

  $scope.deleteme = function() {
    console.log($scope.comment);
  };

  $scope.handleDelete = function() {
    $http({
      method: 'DELETE',
      url: `/api/events/${$scope.event._id}`
    }).then(() => $state.go('eventsIndex'));
  };

  $scope.findPlaces = function() {
    console.log('Am I running?');
    $http({
      method: 'GET',
      url: `https://nominatim.openstreetmap.org/search/${$scope.searchTerm}?format=json&limit=7`
    }).then(result => {
      $scope.searchResults = result.data;
    });
  };

  $scope.$watch('event', function(){
    if($scope.event){
      $http({
        method: 'GET',
        url: `https://nominatim.openstreetmap.org/search/${$scope.event.address}?format=json&limit=1`
      }).then(result => {
        $scope.searchResults = result.data;
        console.log('this is $scope.searchResults ', $scope.searchResults[0].lon);
        mapLib.create('map-element', [$scope.searchResults[0].lat, $scope.searchResults[0].lon], 13);
        mapLib.addMarker([$scope.searchResults[0].lat, $scope.searchResults[0].lon], $scope.event.title);
      });
    }
  });
}


export default showCtrl;
