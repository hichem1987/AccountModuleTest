app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/login', {
                    title: 'Login',
                    templateUrl: 'partials/login.html',
                    controller: 'authCtrl'
                })
                .when('/logout', {
                    title: 'Logout',
                    templateUrl: 'partials/login.html',
                    controller: 'authCtrl'
                })
                .when('/signup', {
                    title: 'Signup',
                    templateUrl: 'partials/signup.html',
                    controller: 'authCtrl'
                })
                .when('/dashboard', {
                    title: 'Dashboard',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'authCtrl'
                })
                .when('/', {
                    title: 'Login',
                    templateUrl: 'partials/login.html',
                    controller: 'authCtrl',
                    role: '0'
                })
                .when('/edit-customer/:customerID', {
                    title: 'Edit Customers',
                    templateUrl: 'partials/edit-customer.html',
                    controller: 'editCtrl',
                    resolve: {
                        customer: function (Data, $route) {
                            var customerID = $route.current.params.customerID;
                            return   Data.get('session').then(function (results) {
                                results.phone = parseInt(results.phone);
                                return results;
                            });
                        }
                    }
                })
                .otherwise({
                    redirectTo: '/login'
                });
    }])
        .run(['$rootScope', '$location', 'Data', '$cookieStore', '$http',
            function ($rootScope, $location, Data, $cookieStore, $http) {
                $rootScope.$on("$routeChangeStart", function (event, next, current) {
                    $rootScope.authenticated = false;
                    var nextUrl = next.$$route.originalPath;
                    if (nextUrl == '/logout' ) {
                        $rootScope = {};
                    } else {
                        Data.get('session').then(function (results) {
                            if (results.uid) {
                                $rootScope.authenticated = true;
                                $rootScope.uid = results.uid;
                                $rootScope.name = results.name;
                                $rootScope.email = results.email;
                                if (nextUrl == '/signup' || nextUrl == '/login' || (nextUrl == '/')) {
                                    $location.path('dashboard');
                                }
                            } else {
                                if ((nextUrl == '/signup') || (nextUrl == '/login') || (nextUrl == '/')) {
                                    $rootScope.globals = $cookieStore.get('globals') || {};
                                    if (($rootScope.globals) && (parseInt(Object.keys($rootScope.globals).length) > 0)) {
                                        Data.post('login', {
                                            customer: $rootScope.globals.currentUser
                                        }).then(function (results) {
                                            Data.toast(results);
                                            if (results.status == "success") {
                                                $location.path('dashboard');
                                            } else {
                                                return false;
                                            }
                                        });
                                    }
                                } else {
                                    return true;
                                }
                            }
//                }
                        });
                    }
                });
            }]);