<?php require_once('index.php');
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
              // copy row data
              if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'copy' ){

                  // replace field value
                  if( isset($_REQUEST['data']['nr']) ){
                    $copy = $arr[ $_REQUEST['data']['nr'] ];
                    $copy['id'] = $copy['id'].'-copy';
                    $arr[] = $copy;
          	        $this->source->dataToFile( $arr, $this->filename );
                  }

              }
              // delete row data
              if( isset($_REQUEST['data']) && $_REQUEST['action'] == 'delete' ){

                  // replace field value
                  if( isset($_REQUEST['data']['nr']) ){
                    unset( $arr[ $_REQUEST['data']['nr'] ] );
          	        $this->source->dataToFile( $arr, $this->filename );
                  }
              }

              // add new
              if( $_REQUEST['action'] == 'new' ){

                  // add new row with fields
                  $this->defineFields();
                  $new = $this->fields[1];
                  $arr[] = $new;
          	      $this->source->dataToFile( $arr, $this->filename );

              }


            }

            // remove data

            //echo json_encode($this->datalist);
            print_r(json_encode($arr));

        }

        private function defineFields(){

          $json = [
            "0"=> [
              "question"=> "Vraag 1 .. , welk antwoord kies je?",
              "type"  => "range",
              "tips"  => "This is a survey",
              "answers"=> [
                  "0"=> "Mee eens",
                  "1"=> "Maakt niet uit",
                  "2"=> "Niet mee eens"
              ]
            ],
            "1"=> [
              "question"=> "Vraag 2, welk antwoord kies je?",
              "type"  => "select",
              "tips"  => "Answer this question",
              "answers"=> [
                  "0"=> "Antwoord 1",
                  "1"=> "Antwoord 2",
                  "2"=> "Antwoord 3",
                  ]
              ]

          ];

          $surveysetup = json_encode($json, true);

          $this->fields = [
                  'fields' =>
                  [
                  'id'=>'Id',
                  'title'=>'Title',
                  'desc'=>'Short desc',
                  'salut'=>'Salutation',
                  'introtext'=>'Intro text',
                  'infotext'=>'Info text',
                  'usage'=>'Help text',
                  'endtext'=>'Outro text',
                  'json'=>'Survey Data',
                  ],
                  1 =>
                  [
                  'id'=>'id',
                  'title'=>'title',
                  'desc'=>'Short description text',
                  'salut'=>'Salutation',
                  'introtext'=>'Introduction text following the title in the intro section',
                  'infotext'=>'Main Info text followed by the survey section',
                  'usage'=>'Overall usage notes and tips text for help section',
                  'endtext'=>'Outro text (finnishing) below the survey section',
                  'json'=>$surveysetup,

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
