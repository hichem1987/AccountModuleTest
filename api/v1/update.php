<?php

//web service sign up
$app->post('/UpdateCustomer', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('uid'), $r->customer);
    $db = new DbHandler();
    $column_names = array('phone', 'email', 'country');
    $phone = $r->customer->phone;
    if (isset($r->customer->name)) {
        $name = $r->customer->name;
        $isUserNameExists = $db->getOneRecord("select 1 from customers_auth where name='$name'");
        array_push($column_names, 'name');
    } else {
        $isUserNameExists = false;
    }
    $country = $r->customer->country;

    if (!$isUserNameExists) {
        $table_name = "customers_auth";

        $result = $db->updateTable($r->customer, $column_names, $table_name, 'uid');
        if ($result != NULL) {
            $response["status"] = "success";
            $response["message"] = "your account updated successfully";
            $response["uid"] = $result["uid"];
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['phone'] = $phone;
            if (isset($name)) {
                $_SESSION['name'] = $name;
            }
            $_SESSION['country'] = $country;
            echoResponse(200, $response);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to update customer. Please try again";
            echoResponse(201, $response);
        }
    } else {
        if ($isUserNameExists) {
            $response["status"] = "error";
            $response["message"] = "A user with the provided NickName exists!";
            echoResponse(201, $response);
        }
    }
});
