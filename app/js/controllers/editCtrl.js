/* 
 * Hichem hamdaoui codix authentification project
 */
app.controller('editCtrl', ['$scope', '$location', '$routeParams', 'Data', 'customer', 'countries',
    function ($scope, $location, $routeParams, Data, customer, countries) {
        var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0;
        var original = customer;
        original.uid = customerID;
        $scope.customer = angular.copy(original);
        $scope.customer.uid = customerID;

        $scope.isClean = function () {
            return angular.equals(original, $scope.customer);
        }
        $scope.updateCustomer = function (customer) {
            var user;
            user = customer;
            if (user.name === original.name) {
                delete user.name;
            }
            Data.post('UpdateCustomer', {
                customer: user
            }).then(function (results) {
                Data.toast(results);
                if (results.status == "success") {
                    $location.path('dashboard');
                }
            });
        }
        //                list countries from the service
        $scope.countries = countries.listCountries;
    }]);

