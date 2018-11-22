function registerCtrl($scope, $state, $auth, Flash) {
  $scope.handleRegister= function() {
    console.log('Registering user!');
    $auth.signup($scope.user)
      .then(() => $state.go('login'))
      .catch(err => {
        console.log('There was an error registering', err);
        Flash
          .create('danger', 'Password does not match all fields. Must contain uppercase, lowercase and numeric characters, as well as being at least 8 characters long.');
      });
  };
}

export default registerCtrl;
