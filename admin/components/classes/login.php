<?php session_start();

$loginAdmin = new loginAdmin;

class loginAdmin{

  private $defaultname  = 'admin';
  private $defaultpassword   = 'admin';
  private $result     = array();
  private $redirect   = '../login.php';


  public  function __construct(){

    if( !isset( $_SESSION['adminname'] ) ){

      $this->loginAdmin();

    }

  }


  public  function loginAdmin(){

    $this->result['chk'] = 1;

    if( isset($_POST['name']) && isset($_POST['pass']) ){


        // .. find adminname in archive...

        if( $_REQUEST['name'] != $this->defaultname ){
          $this->result['chk'] = 0;
          $this->result['msg'] = 'Login name not correct';
        }
        if( $_REQUEST['pass'] != $this->defaultpassword ){
          $this->result['chk'] = 0;
          $this->result['msg'] = $list; //'Login password not correct';
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


  public function logoutAdmin(){

    unset($_SESSION['adminname']);
    session_destroy();
    $this->redirect = 'login.php';
    header('location: '.$this->redirect);
    exit();

  }

}
