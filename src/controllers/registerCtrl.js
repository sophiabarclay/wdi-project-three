function registerCtrl($scope, $state, $auth) {
  $scope.handleRegister= function() {
    console.log('Registering user!');
    $auth.signup($scope.user)
      .then(() => $state.go('login'))
      .catch(err => console.log('There was an error registering', err));
  };
}

export default registerCtrl;
