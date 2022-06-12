<?php session_start();

//require_once('rwdata.php');

$loginAdmin = new loginAdmin;

class loginAdmin{

  private $defaultname  = 'admin';
  private $defaultpassword   = 'admin';
  private $result     = array();
  private $redirect   = '../login.php';

  //private $source;
  //private $filename;
  //private $fields;
  //private $datalist;

  public  function __construct(){

    if( !isset( $_SESSION['adminname'] ) ){

      $this->loginAdmin();

    }

  }


  public  function loginAdmin(){

    $this->result['chk'] = 1;

    if( isset($_POST['name']) && isset($_POST['pass']) ){


        // .. find adminname in archive...
        //$this->matchAccount( $_REQUEST['name'], $_REQUEST['pass'] );

        if( $_REQUEST['name'] != $this->defaultname ){
          $this->result['chk'] = 0;
          $this->result['msg'] = 'Login name not correct';
        }
        if( $_REQUEST['pass'] != $this->defaultpassword ){
          $this->result['chk'] = 0;
          $this->result['msg'] = 'Login password not correct';
        }

        if( $this->result['chk'] == 0 ){
          $this->redirect = $this->redirect.'?msg='.$this->result['msg'];
        }

    } else if( !isset( $_SESSION['adminname'] ) ){

      $this->result['chk'] = 0;
      $this->result['msg'] = '';

    }

    if( $this->result['chk'] == 0 ){

      header('location: '.$this->redirect);
      exit();

    }else{

      $_SESSION['adminname'] = $this->defaultname;
      header('location: ../admin');
      exit();

    }

  }
/*
  public function matchAccount( $name, $pass ){

    $this->source = new rwdata;
    $this->filename = 'config.json';
    $this->datalist = array();
    $arr = $this->source->dataFromFile( $this->filename );
    if( is_array($arr) && isset($arr['fields']) ){
      $this->datalist = $arr;

      while (list($key, $val) = each($this->datalist)){
        if($val != 'fields'){
          $nm = array_search( $name , $this->datalist[$key] );
          if( $nm == 'admin_name' ){
            $this->result['chk'] = 0;
            $this->result['msg'] = 'Login name correct';
            $pw = array_search( $pass , $this->datalist[$key] );
            if( $pw == 'admin_pass' ){
                $this->result['chk'] = 1;
                $this->result['msg'] = 'Login correct';
            }else{
              $this->result['chk'] = 0;
              $this->result['msg'] = 'Login password not correct';
            }
            break;
          }

        }
      }


    }
  }
*/
  public function logoutAdmin(){

    unset($_SESSION['adminname']);
    session_destroy();
    $this->redirect = 'login.php';
    header('location: '.$this->redirect);
    exit();

  }

}
