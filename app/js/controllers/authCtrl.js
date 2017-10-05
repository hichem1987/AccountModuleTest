app.controller('authCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$http', 'Data', 'AuthenticationService', 'countries'
            , function ($scope, $rootScope, $routeParams, $location, $http, Data, AuthenticationService, countries) {
                //initially set those objects to null to avoid undefined error
                $scope.login = {};
                $scope.signup = {};
                $scope.updateCustomer = {};
//                do login function
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
//                sign up
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
//                log out function
                $scope.logout = function () {
                    Data.get('logout').then(function (results) {
                        $rootScope.uid = '';
                        AuthenticationService.ClearCredentials();
                        Data.toast(results);
                        window.location.replace('#!/login');
                    });
                }
//                list countries from the service
                $scope.countries = countries.listCountries;
            }]);