<?php

require_once 'dbHandler.php';
require_once 'passwordHash.php';
require '.././libs/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

// User id from db - Global Variable
$user_id = NULL;

require_once 'authentication.php';
require_once 'update.php';

/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields, $request_params) {
    $error = false;
    $error_fields = "";
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }

    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["status"] = "error";
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' is missing or empty';
        echoResponse(200, $response);
        $app->stop();
    }
}

function updateCustomer($customer) {
    if ($this->get_request_method() != "POST") {
        $this->response('', 406);
    }
//    $customer = json_decode(file_get_contents("php://input"), true);
    $id = (int) $customer['id'];
    $column_names = array('name', 'city', 'country');
    $keys = array_keys($customer['customer']);
    $columns = '';
    $values = '';
    foreach ($column_names as $desired_key) { // Check the customer received. If key does not exist, insert blank into the array.
        if (!in_array($desired_key, $keys)) {
            $$desired_key = '';
        } else {
            $$desired_key = $customer['customer'][$desired_key];
        }
        $columns = $columns . $desired_key . "='" . $$desired_key . "',";
    }
    $query = "UPDATE angularcode_customers SET " . trim($columns, ',') . " WHERE customerNumber=$id";
    if (!empty($customer)) {
        $r = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
        $success = array('status' => "Success", "msg" => "Customer " . $id . " Updated Successfully.", "data" => $customer);
        $this->response($this->json($success), 200);
    } else
        $this->response('', 204); // "No Content" status
}

function echoResponse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);

    // setting response content type to json
    $app->contentType('application/json');

    echo json_encode($response);
}

$app->run();
?>