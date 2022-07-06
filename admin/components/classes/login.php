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

  private function getDefaultData(){

      $arr = [ 'fields' =>
              [
              'profile'=>'Profile/Company',
              'sender'=>'Person name',
              'website_text'=>'Website link text',
              'website_link'=>'Website link',

              'email_type'=>'Email settings', // phpmailer basic/smtp/tls..
              'email_address'=>'Email address',
              'email_username'=>'Username',
              'email_password'=>'Password',
              'email_smtphost'=>'SMTP Host',
              'email_smtpport'=>'SMTP port',

              'contact_title'=>'Contact title',
              'contact_email'=>'Contact Email',
              'contact_phone'=>'Contact Phone',
              //'twitter'=>'Twitter',
              //'linkedin'=>'Linkedin',
              //'facebook'=>'Facebook',
              'address_title'=>'Address Title',
              'address_street'=>'Streetname + nr',
              'address_postbox'=>'Postbox',
              'address_city'=>'City',
              'address_region'=>'Region, Province',
              'address_state'=>'Country, State',

              'admin_email'=>'Admin Email',
              'admin_name'=>'Username',
              'admin_pass'=>'Password',
              'admin_lang'=>'Language',
              ],
              1 =>
              [
                'profile'=>'Profile Example 1',
                'sender'=>'Tester Profile',
                'website_text'=>'webbouwer.org',
                'website_link'=>'https://webbouwer.org',

                'email_type'=>'', // phpmailer basic/smtp/tls..
                'email_address'=>'support@webdesigndenhaag.net',
                'email_username'=>'',
                'email_password'=>'',
                'email_smtphost'=>'',
                'email_smtpport'=>'',

                'contact_title'=>'Contact us at',
                'contact_email'=>'support@webdesigndenhaag.net',
                'contact_phone'=>'0703647318',

                'address_title'=>'Profile office',
                'address_street'=>'Streetname 72',
                'address_postbox'=>'3727bh',
                'address_city'=>'Den Haag',
                'address_region'=>'Zuid Holland',
                'address_state'=>'The Netherlands',

                'admin_email'=>'support@webdesigndenhaag.net',
                'admin_name'=>'admin',
                'admin_pass'=>'admin',
                'admin_lang'=>'en',
              ],
          ];

      return $arr;
    //$this->datalist = $arr;
    //$this->source->dataToFile( $arr, $this->filename );

  }

}
