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

        require_once('rwdata.php');
        $source = new rwdata;
        $source->f = 'components/data/'; // ! change data folder for not logged in
        $filename = 'config.json';

        if (!(file_exists( $source->f . $filename ))) {

          if( $_REQUEST['name'] != $this->defaultname ){
            $this->result['chk'] = 0;
            $this->result['msg'] = 'Login name not correct';
          }else if( $_REQUEST['pass'] != $this->defaultpassword ){
            $this->result['chk'] = 0;
            $this->result['msg'] = 'Login password not correct'; // $list; //
          }

        }else{

          $datalist = $source->dataFromFile( $filename );
          $chk = 0;
          $msg = '';
          foreach($datalist as $key => $val){
            if( $key != 'fields'){
              foreach($datalist[$key] as $f => $c ){
                if( $f == 'admin_name' && $c == $_REQUEST['name']){
                  if( $datalist[$key]['admin_pass'] == $_REQUEST['pass']){
                    $chk = 1;
                    $msg = 'Login!';
                    $_SESSION['adminname'] = $_REQUEST['name'];
                    break;
                  }else{
                    $msg = 'Password does not match';
                    break;
                  }
                }else{
                  $msg = 'Name does not match';
                }
              }
            }
          }
          $arr = ['chk' => $chk, 'msg' => $msg];
          $this->result['chk'] = $chk;
          $this->result['msg'] = $msg;

          //$this->result['msg'] = $arr;
        }

        if( $this->result['chk'] == 0 ){
          $this->redirect = $this->redirect.'?msg='.$this->result['msg'];
        }

    } else if( !isset( $_SESSION['adminname'] ) ){

      $this->result['chk'] = 0;
      $this->result['msg'] = 'No session..';

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
