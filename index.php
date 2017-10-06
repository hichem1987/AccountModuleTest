<!DOCTYPE html>
<html lang="en" ng-app="myApp">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="shortcut icon" href="https://www.codix.eu/img/favicon.png" type="image/x-icon">  
        <title>Codix Authentication App</title>
        <!-- Bootstrap -->
        <link href="app/css/libraries/bootstrap/bootstrap.min.css" rel="stylesheet">
        <link href="app/css/fontawesome/font-awesome.css" rel="stylesheet">
        <link href="app/css/global.css" rel="stylesheet">
        <link href="app/css/libraries/toaster/toaster.css" rel="stylesheet">
        <!-- Custom CSS -->
        <!-- inject:css -->
        <!-- endinject -->
        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]><link href= "css/bootstrap-theme.css"rel= "stylesheet" >

<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
    </head>

    <body ng-cloak="">
        <header>
            <div class="navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="bloc-1-container">
                                <div class="img-container">
                                    
                                    <a href="#" ng-if="!uid" title="home page"><img src="app/assets/img/codix.png" alt="logo website"/></a>
                                    <a href="#!/dashboard" ng-if="uid" title="home page"><img src="app/assets/img/codix.png" alt="logo website"/></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="bloc-2-container">
                                <div class="bloc-wrapper">
                                    <h1 class="noMargin">Codix Authentication App</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div>
            <main>
                <div class="container" >

                    <div data-ng-view="" id="ng-view" class="slide-animation"></div>

                </div>
            </main>
    </body>
    <toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
    <!-- Libs -->
    <script src="app/js/libraries/angular.min.js"></script>
    <script src="app/js/libraries/angular-route.min.js"></script>
    <script src="app/js/libraries/angular-cookies.min.js"></script>
    <script src="app/js/libraries/angular-animate.min.js"></script>
    <script src="app/js/libraries/angular-messages.min.js"></script>
    <script src="app/js/libraries/toaster.js"></script>
    <script src="app/js/app.js"></script>
    <script src="app/js/config/config.js"></script>
    <script src="app/js/services/data.service.js"></script>
    <script src="app/js/services/authentication.service.js"></script>
    <script src="app/js/services/countries.service.js"></script>
    <script src="app/js/directives/miscelineous.directive.js"></script>
    <script src="app/js/controllers/authCtrl.js"></script>
    <script src="app/js/controllers/editCtrl.js"></script>
    <!-- inject:js -->
    <!-- endinject -->
    <!--scripts from libraries-->
</html>

