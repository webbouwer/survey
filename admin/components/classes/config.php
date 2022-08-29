<?php require_once('protected.php');

    /* encryptdata */
    require_once('rwdata.php');

    //include('login.php');

    $activeConfig = new configList;

    class configList{

        private $source;
        private $filename;
        private $fields;
        private $datalist;

        public  function __construct(){

            $this->source = new rwdata;
            $this->filename = 'config.json';
            $this->datalist = array();

            // check file
            if (!(file_exists( $this->source->f . $this->filename ))) {

              $this->setDefaultData();

            }

            // check file data
            $arr = $this->source->dataFromFile( $this->filename );

            if( is_array($arr) && isset($arr['fields']) ){
                $this->datalist = $arr;
            }else{
                $this->setDefaultData();
            }

            if( isset($_REQUEST['action']) ){

              // save data
              if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'save' ){

                  // replace field value
                  if( isset($_REQUEST['data']['nr']) && isset($_REQUEST['data']['field']) && isset($_REQUEST['data']['content']) ){
                    $arr[ $_REQUEST['data']['nr'] ][ $_REQUEST['data']['field'] ] = $_REQUEST['data']['content'];
          	        $this->source->dataToFile( $arr, $this->filename );
                  }

              }

              // copy row data

              if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'copy' ){
                  // replace field value
                  if( isset($_REQUEST['data']['nr']) ){

                    $copy = $arr[ $_REQUEST['data']['nr'] ];

                    $copy['id'] = $copy['id'].'-'. $_REQUEST['data']['nr'];

                    $copy['profile'] = $copy['profile'].'-'. $_REQUEST['data']['nr'];
                    $copy['sender'] = 'copy-'. $_REQUEST['data']['nr'] .'- '. $copy['sender'];
                    $arr[] = $copy;

                    $this->source->dataToFile( $arr, $this->filename );

                  }
                  print json_encode($arr);
                }

              // delete row
              if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'delete' ){
                  // replace field value
                  if( isset($_REQUEST['data']['nr']) ){
                    unset( $arr[ $_REQUEST['data']['nr'] ] );
                    $this->source->dataToFile( $arr, $this->filename );
                  }
                  print json_encode($arr);
              }

              // add new
              if( $_REQUEST['action'] == 'new' ){

                // add new row with fields
                $this->defineFields();
                $new = $this->fields[1];
                $arr[] = $new;
                $this->source->dataToFile( $arr, $this->filename );

                print json_encode($arr);
              }

              if( $_REQUEST['action'] == 'list' ){
                print_r(json_encode($this->datalist));
              }

              // ajax login
              if( $_REQUEST['action'] == 'login' ){
                //echo json_encode($this->datalist);
                if( isset($_REQUEST['name']) && isset($_REQUEST['pass']) ){
                  //print_r(json_encode($arr));
                  $chk = 0;
                  $msg = '';
                  foreach($this->datalist as $key => $val){
                    if( $key != 'fields'){
                      foreach($this->datalist[$key] as $f => $c ){
                        if( $f == 'admin_name' && $c == $_REQUEST['name']){
                          if( $this->datalist[$key]['admin_pass'] == $_REQUEST['pass']){
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

                  header('Content-Type: application/json');
                  print json_encode($arr);
                  //print_r(json_encode($this->datalist[$key]))
                }

              }

            }


        }

        private function defineFields(){

            $this->fields = [ 'fields' =>
                    [
                    'id'=>'Profile id',
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
                      'id'  => '1',
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

        }

        private function setDefaultData(){

          $this->defineFields();
          $arr = $this->fields;
          $this->datalist = $arr;
	        $this->source->dataToFile( $arr, $this->filename );

        }

    }

?>
