import mapLib from '../../lib/map';

function showCtrl($state, $scope, $http, $auth) {
  $scope.comment = {};
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  }).then(result => {
    $scope.event = result.data;
    $scope.alreadyAttending = result.data.attendees.includes($auth.getPayload().sub);
    mapLib.create('map-element', [51.515, -0.072], 6);
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

  $scope.panMap = function(country) {
    mapLib.panTo(country.latlng);
    mapLib.clearMarkers();
    mapLib.addMarker(country.latlng, `<strong>${country.name}</strong><img src=${country.flag} />`);
  };

  $scope.findPlaces = function() {
    $http({
      method: 'GET',
      url: `https://nominatim.openstreetmap.org/search/${$scope.searchTerm}?format=json&limit=5`
    }).then(result => {
      $scope.searchResults = result.data;
    });
  };

  $scope.goTo = function(place) {
    console.log('Clicked on', place);
    $scope.searchTerm = null;
    mapLib.panTo([place.lat, place.lon]);
    mapLib.addMarker([place.lat, place.lon], place.display_name);
    $scope.searchResults = null;
  };

  $scope.findUser = function() {
    navigator.geolocation.getCurrentPosition(function(result) {
      mapLib.panTo([result.coords.latitude, result.coords.longitude]);
      mapLib.addMarker([result.coords.latitude, result.coords.longitude], '🌟');
    });
  };

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
