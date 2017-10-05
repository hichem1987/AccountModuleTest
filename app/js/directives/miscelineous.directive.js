app.directive('focus', function() {
    return function(scope, element) {
        element[0].focus();
    }      
});

app.directive('passwordMatch', [function () {
    return {
        restrict: 'A',
        scope:true,
        require: 'ngModel',
        link: function (scope, elem , attrs,control) {
            var checker = function () {
 
                //get the value of the first password
                var e1 = scope.$eval(attrs.ngModel); 
 
                //get the value of the other password  
                var e2 = scope.$eval(attrs.passwordMatch);
                if(e2!=null)
                return e1 == e2;
            };
            scope.$watch(checker, function (n) {
 
                //set the form control to valid if both 
                //passwords are the same, else invalid
                control.$setValidity("passwordNoMatch", n);
            });
        }
    };
}]);
app.directive("ngUnique", function(AuthService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      element.bind('blur', function (e) {
        if (!ngModel || !element.val()) return;
        var keyProperty = scope.$eval(attrs.ngUnique);
        var currentValue = element.val();
        AuthService.checkUniqueValue(keyProperty.key, keyProperty.property, currentValue)
          .then(function (unique) {
            //Ensure value that being checked hasn't changed
            //since the Ajax call was made
            if (currentValue == element.val()) {
              console.log('unique = '+unique);
              ngModel.$setValidity('unique', unique);
              scope.$broadcast('show-errors-check-validity');
            }
          });
      });
    }
  }
});