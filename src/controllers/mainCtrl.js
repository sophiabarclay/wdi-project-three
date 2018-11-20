function mainCtrl($scope, $auth, $state, $transitions) {
  $scope.isAuthenticated = function() {
    if ($auth.isAuthenticated()) {
      $scope.username = $auth.getPayload().username;
      $scope.userId = $auth.getPayload().sub;
    }
    return $auth.isAuthenticated();
  };
  $scope.handleLogout = function() {
    $auth.logout()
      .then(() => $state.go('home'));
  };
<<<<<<< HEAD
  $transitions.onSuccess({}, () => {
    $scope.isHomepage = $state.$current.name === 'home';
  });
=======
  // $transitions.onSuccess({}, () => {
  //   $scope.isHomepage = $state.$current.name === 'home';
  // });
>>>>>>> development
}



export default mainCtrl;
