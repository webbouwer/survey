<?php require("admin/components/classes/rwdata.php");

$magic = new rwdata(); // get rwdata encrypt class
$udata = $magic->decryptstring( $_GET['s'] ); // decrypt and decode

$filename = 'datalist.json';
$data = file_get_contents( 'admin/components/data/' . $filename );
$json = $magic->decryptstring( $data );
$list = json_decode( $json, true );
$activesurvey = json_decode( $udata, true );
$surveydata = $list[$activesurvey['sid']];

//print_r($list[$activesurvey['sid']]);

function surveyPageHTML( $uid, $idx, $toname, $data ) {


  $html = '';

  $html .= '<div class="surveypage" data-mode="preview" data-activeid="'.$uid.'" data-row="' . $idx . '" data-id="' . $data['id'] . '">';
  $html .= '<div class="topbar"><div class="header"><div class="logobox"><img src="public/themes/theme/media/logo.png" /></div><div class="titletext"><h2>' . $data['title'] . '</h2></div></div>';
  $html .= '<div class="intro"><div class="introtitle"><h3>' . $data['intro_title'] . '</h3></div><div class="introtext">' . $data['intro_text'] . '</div></div></div>';
  $html .= '<div class="main"><div class="introsubtext">' . $data['intro_subtext'] . '</div>';

  $count = 0;
  $pnls = '';
  $qs = json_decode( $data['json'], true); //$data['json'];
  if(count($qs) > 0) {

    $total = count($qs);

    $pnls .= '<div class="surveyhead"><div class="paneltitle"><h1>' . $data['survey_title'] . '</h1></div>';
    $pnls .= '<div class="infobox"></div>';
    $pnls .= '<div class="helpbox"></div>';

    if ($data['survey_start'] != '') {
      $pnls .= '<div class="panelstarttext">' . $data['survey_start'] . '</div>';
    }
    $pnls .= '</div>'; // end survey box head
    $pnls .= '<div id="surveypanels">'; // start surveypanels

    foreach( $qs as $nr => $quest ){

      $panelpos = '';
      if($nr == 0){
        $panelpos = 'done';
      }
      if($nr == 1){
        $panelpos = 'start active';
      }
      $pnls .= '<div id="panel' . $count . '" class="panel ' . $panelpos . '" data-id="' . $nr . '" data-type="' . $quest['type'] . '">';
      $pnls .= '<div class="questionbox">' . $quest['question']  . '</div>';

      if ($quest['type'] != '') {
        $pnls .= '<div class="answerbox ' . $quest['type'] . '">';
        //console.log(quest.type);
        foreach( $quest['answers'] as $c => $a) {
          if ($quest['type'] == "polar") {
            $pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
            //$pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
          }
          if ($quest['type'] == "multi") {

            $pnls .= '<label><input name="opt' . $nr . '[]" type="checkbox" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
            //$pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';

          }
          if ($quest['type'] == "choice") {
            $pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
            //$pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
          }
          if ($quest['type'] == "value") {
            $pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
            //$pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
          }
          if ($quest['type'] == "scale") {
            $pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
            //$pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
          }
          if ($quest['type'] == "range") {

            $pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
            //$pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';

          }
          if ($quest['type'] == "open") {
            $pnls .= '<label><textarea name="opt' . $nr . '" value="' . $c . '" placaholder="' . $a . '" /></textarea></label>';
            //$pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
          }
        };
        $pnls .= '</div>';
        $pnls .= '<div class="tipsbox">' . $quest['tips'] . '</div>';
      }

      if ( $quest['type'] == "open" || $quest['type'] == "multi") {
        $text = 'Next';
        $pnls .= '<div class="button next"><span>' . $text . '</span></div>';
      }
      $pnls .= '</div>';
      $count++;
    }

    $pnls .= '<div id="lastpanel" class="panel end"><div class="donetitle"><h4>' . $data['survey_complete_title'] . '</h4></div><div class="donetext">'.$data['survey_complete_text'].'</div></div>';


    $pnls .= '</div>'; // end surveypanels


    $pnls .= '<div class="surveyfoot">';
    $pnls .= '<div class="panelnav"><div class="buttonrow">';

    $t = $total;
    for ($n = 0; $n < $t; $n++) {
      $pnls .= '<div class="navbut" data-nr="' . $n . '"><span>' . ($n + 1) . '</span></div>';
    }
    $pnls .= '</div></div>';

    if ($data['survey_end'] != '') {
      $pnls .= '<div class="panelendtext">' . $data['survey_end'] . '</div>';
    }
    $pnls .= '</div>';

    $takestime = ($total * 8) / 60;
    $timeunit = 'minutes';
    if ($takestime < 1) {
      $timeunit = 'seconds';
      $takestime = $takestime * 60;
    } else if ($takestime == 1) {
      $timeunit = 'minute';
    }

    $html .= '<div class="beforebox">This survey consists of ' . $total . ' questions and takes about ' . $takestime . ' ' . $timeunit . '.</div>';

  } else {
    $pnls .= '<div class="nosurveydata">Something is wrong with the survey data. See if you can edit the data and try this preview again.</div>';
  }


  $html .= '<div class="surveycontainer">' . $pnls . '</div>'; // survey panels box
  //data.survey_disclaimtext1 . '</div>';

  $html .= '</div>'; // end main

  $html .= '<div class="bottombar">';
  if ($data['outro_text'] != '') {
    $html .= '<div class="outro">' . $data['outro_text'] . '</div>';
  }
  //$html .= '<div class="endgreetings">' . $data['email_regards'] . ',</br />'.$sender['sender'].'</div>';
  //$html .= '<div class="profilename">'.$sender['profile'].'</div>';
  $html .= '<div class="disclaimerbox">' . $data['survey_disclaimtext2'] . ' <a href="' . $data['survey_disclaimlink'] . '">' . $data['survey_disclaimlinktext'] . '</a></div>';
  $html .= '<div class="footer">';
  $html .= '<div class="column1">[profile contact info]</div><div class="column2">[profile organisation info]</div><div class="column3"><div class="logobox"><span>logo</span></div></div>';
  $html .= '</div>';
  $html .= '</div>'; // end bottombar

  return $html;

}
