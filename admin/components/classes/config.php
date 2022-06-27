<?php require_once('protected.php');

    /* encryptdata */
    require_once('rwdata.php');

    $activeData = new dataList;

    class dataList{

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
              if( $_REQUEST['action'] == 'list' ){
                print_r(json_encode($this->datalist));
              }
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
                  print_r(json_encode($arr));
                  //print_r(json_encode($this->datalist[$key]))
                }
              }
            }


        }

        private function setDefaultData(){

            $arr = [ 'fields' =>
                    [
                    'profile'=>'Profile name',
                    'sender'=>'Person name',
                    'email'=>'Profile mailaddress',
                    'website'=>'Website link',
                    
                    'contacttitle'=>'Contact Title',
                    'contactemail'=>'Contact Email',
                    'contactphone'=>'Contact Phone',
                    //'twitter'=>'Twitter',
                    //'linkedin'=>'Linkedin',
                    //'facebook'=>'Facebook',
                    'addresstitle'=>'Adress Title',
                    'addressstreet'=>'Adress Streetname + number',
                    'addresspostbox'=>'Adress Postbox',
                    'addressregion'=>'Adress Region/Province',
                    'addresscity'=>'Adress City',

                    'admin_mail'=>'Admin Emailaddress',
                    'admin_name'=>'Username',
                    'admin_pass'=>'Password',
                    'admin_lang'=>'Language',
                    ],
                    1 =>
                    [
                      'profile'=>'Profile Example 1',
                      'sender'=>'Tester Profile',
                      'email'=>'support@webdesigndenhaag.net',
                      'website'=>'webbouwer.org',

                      'contacttitle'=>'Contact us at',
                      'contactemail'=>'support@webdesigndenhaag.net',
                      'contactphone'=>'0703647318',

                      'addresstitle'=>'Profile office',
                      'addressstreet'=>'Streetname 72',
                      'addresspostbox'=>'3727bh',
                      'addressregion'=>'Zuid Holland',
                      'addresscity'=>'Den Haag',

                      'admin_email'=>'support@webdesigndenhaag.net',
                      'admin_name'=>'admin',
                      'admin_pass'=>'admin',
                      'admin_lang'=>'en',
                    ],
                ];
          $this->datalist = $arr;
	        $this->source->dataToFile( $arr, $this->filename );

        }
    }



/*
    $rw = new rwdata;
    $filename = 'contacts.json';

    if( isset($_POST['data']) ){
        // save
        $data = json_decode($_POST['data']);
        $rw->dataToFile( $data, $filename );

    }


    $arr = $rw->dataFromFile( $filename );

    if( is_array($arr) && isset($arr['fields']) ){
        $array = $arr;
    }else{

        $array = [ 'fields' =>
                    [
                    'fname'=>'Voornaam',
                    'lname'=>'Achternaam',
                    'mobile'=>'Mobiel',
                    'phone'=>'Telefoon',
                    'email'=>'Email',
                    'bname'=>'Bedrijfsnaam',
                    'street'=> 'Straatnaam',
                    'streetnr'=> 'nummer',
                    'postcode'=> 'postcode',
                    'place'=> 'plaats',
                    'state'=> 'land'
                    ],
                ];

	   $rw->dataToFile( $array, $filename );
    }

    echo json_encode($array);



	//print_r($arr);
*/
/*

    // variable data array to store
    $filename = 'contacts.json';


    // array to json & write encrypted string to file
	$rw->dataToFile( $array, $filename );

    // get filedata & decrypt json string to array
    $arr = $rw->dataFromFile( $filename );

	//output
	print_r($arr);

	// check data/contacts.json

*/
?>
