<?php

class DbHandler {

    private $conn;

    function __construct() {
        require_once 'dbConnect.php';
        // opening db connection
        $db = new dbConnect();
        $this->conn = $db->connect();
    }

    /**
     * Fetching single record
     */
    public function getOneRecord($query) {
        $r = $this->conn->query($query . ' LIMIT 1') or die($this->conn->error . __LINE__);
        return $result = $r->fetch_assoc();
    }

    /**
     * Creating new record
     */
    public function insertIntoTable($obj, $column_names, $table_name) {

        $c = (array) $obj;
        $keys = array_keys($c);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the obj received. If blank insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $c[$desired_key];
            }
            $columns = $columns . $desired_key . ',';
            $values = $values . "'" . $$desired_key . "',";
        }
        $query = "INSERT INTO " . $table_name . "(" . trim($columns, ',') . ") VALUES(" . trim($values, ',') . ")";
        $r = $this->conn->query($query) or die($this->conn->error . __LINE__);

        if ($r) {
            $new_row_id = $this->conn->insert_id;
            return $new_row_id;
        } else {
            return NULL;
        }
    }

    public function updateTable($obj, $column_names, $table_name,$table_key) {
        $id = (int) $obj->$table_key;
        $obj = (array) $obj;
        $keys = array_keys($obj);
        $columns = '';
        $values = '';
        foreach ($column_names as $desired_key) { // Check the customer received. If key does not exist, insert blank into the array.
            if (!in_array($desired_key, $keys)) {
                $$desired_key = '';
            } else {
                $$desired_key = $obj[$desired_key];
            }
            $columns = $columns . $desired_key . "='" . $$desired_key . "',";
        }
        $query = "UPDATE ".$table_name." SET " . trim($columns, ',') . " WHERE ".$table_key."=$id";
        if (!empty($obj)) {
            $r = $this->conn->query($query) or die($this->conn->error . __LINE__);
//            $success = array('status' => "Success", "msg" => "$table_name " . $id . " Updated Successfully.", "data" => $obj);
            return $obj;
        } 
    }

    public function getSession() {
        if (!isset($_SESSION)) {
            session_start();
        }
        $sess = array();
        if (isset($_SESSION['uid'])) {
            $sess["uid"] = $_SESSION['uid'];
            $sess["name"] = $_SESSION['name'];
            $sess["phone"] = $_SESSION['phone'];
            $sess["email"] = $_SESSION['email'];
            $sess["country"] = $_SESSION['country'];
        } else {
            $sess["uid"] = '';
            $sess["name"] = 'Guest';
            $sess["email"] = '';
        }
        return $sess;
    }

    public function destroySession() {
        if (!isset($_SESSION)) {
            session_start();
        }
        if (isset($_SESSION['uid'])) {
            unset($_SESSION['uid']);
            unset($_SESSION['name']);
            unset($_SESSION['email']);
            unset($_SESSION['phone']);
            unset($_SESSION['country']);
            $info = 'info';
            if (isSet($_COOKIE[$info])) {
                setcookie($info, '', time() - $cookie_time);
            }
            $msg = "Logged Out Successfully...";
        } else {
            $msg = "Not logged in...";
        }
        return $msg;
    }

}

?>
