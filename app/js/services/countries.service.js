/* 
 * Hichem hamdaoui codix authentification project
 */
app.factory('countries', function () {
    var obj = {};
    var listOfCountries;
    listOfCountries = [
        {name: 'Bulgaria', code: 'BG'},
        {name: 'France', code: 'FR'},
        {name: 'Tunisia', code: 'TN'},
        {name: 'Vietnam', code: 'VN'},
        {name: 'Mauritius', code: 'MU'}
    ];
    obj.listCountries = listOfCountries;
    return obj;
});

