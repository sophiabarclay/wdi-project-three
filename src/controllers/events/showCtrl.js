import mapLib from '../../lib/map';

function showCtrl($state, $scope, $http, $auth) {
  $scope.comment = {};
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  }).then(result => {
    $scope.event = result.data;
    $scope.alreadyAttending = result.data.attendees.includes($auth.getPayload().sub);
    console.log('$scope.event', $scope.event);
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

  $scope.handleDelete = function() {
    $http({
      method: 'DELETE',
      url: `/api/events/${$scope.event._id}`
    })
      .then(() => {
        $state.go('eventsIndex');
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
  $scope.handleClickAttending = function() {
    $http({
      method: 'POST',
      url: `/api/events/${$state.params.id}/attendees`
    })
      .then(result => {
        // console.log('===========!!>', $auth.getPayload().sub);
        $scope.alreadyAttending = result.data.attendees.includes($auth.getPayload().sub);
      });
  };
}


export default showCtrl;
