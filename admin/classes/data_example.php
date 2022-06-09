<?php
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
            $this->filename = 'data.json';
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


            }

            // remove data

            //echo json_encode($this->datalist);
            print_r(json_encode($arr));

        }

        private function setDefaultData(){

          $arr = [ 'fields' =>
                  [
                  'id'=>'survey id',
                  'name'=>'survey name',
                  'title'=>'Survey title',
                  'shortdesc'=>'Short desc',
                  'json'=>'Data',
                  ],
                  1 =>
                  [
                    'id'=>'547',
                    'name'=>'Howdoyoudo',
                    'title'=>'Survey how do you do?',
                    'shortdesc'=>'A tiny survey on your current state of life.',
                    'json'=>'',
                    ],
                    2 =>
                    [
                      'id'=>'548',
                      'name'=>'Getmoving',
                      'title'=>'Survey on transportation',
                      'shortdesc'=>'A survey about your experience with transportation.',
                      'json'=>'',
                      /*'mobile'=>'0641611661',
                      'phone'=>'',
                      'email'=>'webbouwer@webdesigndenhaag.net',
                      'bname'=>'Webdesign Den Haag',
                      'street'=> 'Fultonstraat',
                      'streetnr'=> '77',
                      'postcode'=> '2562xc',
                      'place'=> 'Den Haag',
                      'state'=> 'Nederland'
                      */
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
