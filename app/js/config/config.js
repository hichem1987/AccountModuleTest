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
                    controller: 'logoutCtrl'
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
                            return   Data.get('session').then(function (results) { return results });
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
                    Data.get('session').then(function (results) {
                        if (results.uid) {
                            $rootScope.authenticated = true;
                            $rootScope.uid = results.uid;
                            $rootScope.name = results.name;
                            $rootScope.email = results.email;
                        } else {
//                    if(true){
//                        
//                    } else {
                            var nextUrl = next.$$route.originalPath;
                            if (nextUrl == '/signup' || nextUrl == '/login') {
                                $rootScope.globals = $cookieStore.get('globals') || {};
                                console.log($rootScope.globals);
                                console.log(Object.keys($rootScope.globals).length);
                                console.log(parseInt(Object.keys($rootScope.globals).length));
                                if (($rootScope.globals) && (parseInt(Object.keys($rootScope.globals).length) >= 0) ) {
                                    console.log (typeof $rootScope.globals );
                                    console.log("check here");
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
                                $location.path("/login");
                            }
                        }
//                }
                    });
                });
            }]);