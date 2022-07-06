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
            $this->filename = 'datalist.json';
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
                    $copy['title'] = $copy['title'].'-'. $_REQUEST['data']['nr'];
                    $copy['desc'] = 'copy-'. $_REQUEST['data']['nr'] .'- '. $copy['desc'];
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
/*        $json = [
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

          ];*/
          $json = [

          			"0"=> [
          				"question"=> "Did you know surveys are one of the first practical applications of the personal computer? ",
          				"type"=> "polar",
          				"tips"=> "This is a survey",
          				"answers"=> [
          					"0"=> "No",
          					"1"=> "Yes"
          				]
          			],
          			"1"=> [
          				"question"=> "Which of the types listed below are polar questions like the first one? ",
          				"type"=> "multi",
          				"tips"=> "Multiple answers are possible",
          				"answers"=> [
          					"0"=> "Are you going? (inversion)",
          					"1"=> "Are you staying or going? (inversion with an alternative)",
          					"2"=> "You're going, aren't you? (tag)"
          				]
          			],
          			"2"=> [
          				"question"=> "So, the question 'You like it, don't you?' is",
          				"type"=> "choice",
          				"tips"=> "Choose one answer",
          				"answers"=>[
          					"0"=> "a polar inversion",
          					"1"=> "a polar inversion with an alternative",
          					"2"=> "a tagged polar"
          				]
          			],
          			"3"=> [
          				"question"=> "This is the fourth question; do you like it?",
          				"type"=> "value",
          				"tips"=> "Value from 1 to 5",
          				"answers"=> [
          					"0"=> "1",
          					"1"=> "2",
          					"2"=> "3",
          					"3"=> "4",
          					"4"=> "5"
          				]
          			],
          			"4"=> [
          				"question"=> "Can you define your joy level knowing this survey is almost over? ",
          				"type"=> "scale",
          				"tips"=> "Scale from 1 to 10",
          				"answers"=> [
          					"0"=> "1",
          					"1"=> "2",
          					"2"=> "3",
          					"3"=> "4",
          					"4"=> "5",
          					"5"=> "6",
          					"6"=> "7",
          					"7"=> "8",
          					"8"=> "9",
          					"9"=> "10"
          				]
          			],
          			"5"=> [
          				"question"=> "Yes, you 've made it, no question more. You can leave a notice of your love in the textbox below. Or should we make this a question too? ;)",
          				"type"=> "open",
          				"tips"=> "Space to write those words",
          				"max"=> 100,
          				"answers"=> [
          					"0"=> "Please express your passion for this survey app within a 100 words",
          				]
          			]
          		];



          $setup = json_encode($json, true);

          $this->fields = [
                  'fields' =>
                  [
                  'id'=>'Id',
                  'title'=>'Title',
                  'subtitle'=>'Sub Title',
                  'desc'=>'Short desc',

                  'email_salut'=>'Salutation',
                  'email_regards'=>'Regard',
                  'email_text'=>'Email start',
                  'email_surveyintro'=>'Email survey intro',
                  'email_end'=>'Email end',

                  'survey_title'=>'Survey title',
                  'survey_start'=>'Info text',
                  'survey_end'=>'Info text',
                  'survey_help'=>'Help text',
                  'survey_helplink'=>'Help link',
                  'survey_disclaimtext1'=>'Disclaim text 1',
                  'survey_disclaimtext2'=>'Disclaim text 2',
                  'survey_disclaimlinktext'=>'Link text',
                  'survey_disclaimlink'=>'Disclaimer link',
                  'survey_end'=>'Outro text',

                  'json'=>'Survey Data',
                  ],
                  1 =>
                  [
                  'id'=>'id',
                  'title'=>'Header Title',
                  'subtitle'=>'Sub Title',
                  'desc'=>'Short description text',

                  'email_salut'=>'Dear',
                  'email_regards'=>'Best regards',
                  'email_text'=>'This email is send as a follow up on our recent contact. We would like to ask you to help us validate and enhance our services. Would you be so kind to answer a few questions?',
                  'email_surveyintro'=>'Below is the first question. By answering you will be directed anonymously to our website with the complete survey. Thank you for your effort!',
                  'email_end'=>'Email Outro text (finnishing) below the survey section followed by the regards and sender person name',

                  'survey_title'=>'Survey Example 1 Title',
                  'survey_start'=>'Please share your thoughts about your experience with our services by answering the following questions.',
                  'survey_end'=>'Info text below survey box with questions',
                  'survey_help'=>'Overall usage notes and tips text for help sectio',
                  'survey_helplink'=>'https://..#surveyhelp',
                  'survey_disclaimtext1'=>'Disclaimer text 1 the below the end text underneath the survey box',
                  'survey_disclaimtext2'=>'Disclaim text 2 at the end of the page above the footer (contact) area',
                  'survey_disclaimlinktext'=>'Disclaimer',
                  'survey_disclaimlink'=>'#disclaimer',
                  'survey_end'=>'Outro text (finnishing) below the survey section',

                  'json'=>$setup,

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
