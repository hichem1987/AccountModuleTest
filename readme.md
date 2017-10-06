### Presentation
web app project realized fellowing internal requirements for the test. The project is called Codix Authentication App.
This web App allow the Sign Up/ Sign IN with the possibility of "remember me" functionnality using cookies.
For the backend the technology used is PHP5.6 . For frontend, it is AngularJs 1.6.
Backend and frontend communicate through Rest Web services. Gulp and Bootstrap CSS framework are used in this project.
### Prerequisites
NodeJs Installation
PHP/Mysql web server (example Wamp as software and apache as web server) 
To configure the Database connexion for the backend, Set your configuration in the file
```
api/config.php
```
database structure is on the path below
```
sql/angularcode_customers.php
```
### Command lines necessary to deploy the project
```
npm install
gulp install
```
### Command lines necessary to run the project for dev environment
```
gulp default
```
### Command lines necessary to run the project for prod environment
```
gulp prod
```
Several other Gulp tasks are set in the project
### Functionnalities existing in this Project
Sign In Interface
Sign Up interface
Dashboard Interface
Update Account Interface

