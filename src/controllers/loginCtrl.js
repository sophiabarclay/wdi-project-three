function loginCtrl($scope, $state, $auth, Flash) {
  $scope.handleLogin = function() {
    console.log('Logging in!');
    $auth.login($scope.user)
      .then(result => {
        // SB Flash
        Flash
          .create('success', result.data.message);
        $state.go('eventsIndex');
      })
      .catch(err => {
        console.log('There was an error', err);
        // SB Flash
        Flash
          .create('danger', 'Login failed: ' + err.data.message);
      });
  };
}

export default loginCtrl;
