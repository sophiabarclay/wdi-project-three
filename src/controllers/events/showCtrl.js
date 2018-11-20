function showCtrl($state, $scope, $http) {
  $scope.comment = {};
  $http({
    method: 'GET',
    url: `/api/events/${$state.params.id}`
  }).then(result => {
    $scope.event = result.data;
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

  // SB clickAttending
  // $scope.handleClickAttending = function() {
  // };
}

export default showCtrl;
