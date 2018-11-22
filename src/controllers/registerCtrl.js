function registerCtrl($scope, $state, $auth, Flash) {
  $scope.handleRegister= function() {
    console.log('Registering user!');
    $auth.signup($scope.user)
      .then(() => $state.go('login'))
      .catch(err => {
        console.log('There was an error registering', err);
        Flash
          .create('danger', 'Password does not match all fields or passwords do not match. Must contain uppercase, lowercase and numeric characters, and be at least 8 characters long.');
      });
  };
}

export default registerCtrl;
