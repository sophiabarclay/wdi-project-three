function mainCtrl($scope, $auth, $state, $transitions) {
  $scope.isAuthenticated = function() {
    if ($auth.isAuthenticated()) {
      $scope.username = $auth.getPayload().username;
      $scope.userId = $auth.getPayload().sub;
    }
    return $auth.isAuthenticated();
  };
  $scope.isVenue = function() {
    $scope.venue = $auth.getPayload().isVenue;
    console.log('$scope.isVenue', $scope.isVenue);
    return $scope.venue;
  };
  $scope.handleLogout = function() {
    $auth.logout()
      .then(() => $state.go('home'));
  };

  $transitions.onSuccess({}, () => {
    $scope.isHomepage = $state.$current.name === 'home';
  });
}



export default mainCtrl;
