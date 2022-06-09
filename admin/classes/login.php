<?php session_start();

$loginAdmin = new loginAdmin;

class loginAdmin{

  private $adminname  = 'admin';
  private $password   = 'admin';
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

        $this->result['chk'] = 1;
        // .. find adminname in archive...
        if( $_REQUEST['name'] != $this->adminname ){
          $this->result['chk'] = 0;
          $this->result['msg'] = 'Login name not correct';
        }
        if( $_REQUEST['pass'] != $this->password ){
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

      $_SESSION['adminname'] = $this->adminname;
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
