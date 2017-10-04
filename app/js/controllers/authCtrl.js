app.controller('authCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'Data', 'AuthenticationService'
            , function ($scope, $rootScope, $routeParams, $location, $http, Data, AuthenticationService) {
                //initially set those objects to null to avoid undefined error
                $scope.login = {};
                $scope.signup = {};
                $scope.updateCustomer = {};
                $scope.doLogin = function (customer) {

                    if (customer.rememberme) {
                        AuthenticationService.SetCredentials(customer.email, customer.password);
                    }
                    Data.post('login', {
                        customer: customer
                    }).then(function (results) {
                        Data.toast(results);
                        if (results.status == "success") {
                            $location.path('dashboard');
                        }
                    });
                };
                $scope.signup = {email: '', password: '', name: '', phone: '', country: ''};
                $scope.signUp = function (customer) {
                    Data.post('signUp', {
                        customer: customer
                    }).then(function (results) {
                        Data.toast(results);
                        if (results.status == "success") {
                            $location.path('dashboard');
                        }
                    });
                };
                $scope.logout = function () {
                    Data.get('logout').then(function (results) {
                        AuthenticationService.ClearCredentials();
                        Data.toast(results);
                        $location.path('login');
                    });
                }
                $scope.countries = [
                    {name: 'Bulgaria', code: 'BG'},
                    {name: 'France', code: 'FR'},
                    {name: 'Tunisia', code: 'TN'},
                    {name: 'Vietnam', code: 'VN'},
                    {name: 'Mauritius', code: 'MU'}
                ];
            }]);