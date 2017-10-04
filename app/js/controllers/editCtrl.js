/* 
 * Hichem hamdaoui codix authentification project
 */
app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, Data, customer) {
    var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0;
    $rootScope.title = (customerID > 0) ? 'Edit User' : 'Add Customer';
    $scope.buttonText = (customerID > 0) ? 'Update User' : 'Add New Customer';
    console.log("editctrl");
    console.log($routeParams);
    console.log(customer);
    var original = customer;
    original.uid = customerID;
    $scope.customer = angular.copy(original);
    $scope.customer.uid = customerID;

    $scope.isClean = function () {
        return angular.equals(original, $scope.customer);
    }
    $scope.updateCustomer = function (customer) {
        var user ;
         user = customer;
        if(user.name === original.name){
            console.log('names');
            console.log(user.name);
            console.log(original.name);
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
});

