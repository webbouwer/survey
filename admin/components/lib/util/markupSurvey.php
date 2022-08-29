<?php /* markup html to send by email */
require_once('rwdata.php');

// markup functions
function markupEmailHTML( $content ){
  $html = $content;
  return $html;
}

function markupSurveyHTML( $activeid, $toname, $toemail, $pid, $profile, $sid, $survey ){


  // encrypt user and survey data
  $udata = array(
    "uid" => $activeid,
    "sid" => $sid,
    "pn" => $toname,
    "pe" => $toemail,
  );

  $magic = new rwdata(); // get rwdata encrypt class
  $sdata = urlencode( $magic->encryptstring( json_encode( $udata ) ) ) ; // encrypt and encode

  $thisurl = $magic->d;

  $html = '';
  $data = $survey;
  $sender = $profile;
  $participant_name = $toname;

  $html .= '<div class="surveyemail" data-mode="preview" data-activeid="'.$activeid.'" data-row="' . $sid . '" data-id="' . $data['id'] . '">';
  $html .= '<div class="topbar"><div class="header"><div class="logobox"><span>logo</span></div><div class="titletext"><h2>' . $data['title'] . '</h2></div></div>';
  $html .= '<div class="intro"><div class="introtitle"><h3>' . $data['subtitle'] . '</h3></div><div class="introtext">' . $data['desc'] . '</div></div></div>';
  $html .= '<div class="main"><div class="emailintro"><div class="greeting">' . $data['email_salut'] . ' '.$participant_name.',</div><div class="text">' . $data['email_text'] . '</div></div>';
  $html .= '<div class="surveyintro">' . $data['email_surveyintro'] . '</div>';

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

    $nr = 0; // set email survey only first question
    $quest = $qs[0];
    $panelpos = 'start active';

    $pnls .= '<div id="panel' . $count . '" class="panel ' . $panelpos . '" data-id="' . $nr . '" data-type="' . $quest['type'] . '">';
    $pnls .= '<div class="questionbox">' . $quest['question']  . '</div>';

    if ($quest['type'] != '') {
      $pnls .= '<div class="answerbox ' . $quest['type'] . '">';
      //console.log(quest.type);
      foreach( $quest['answers'] as $c => $a) {
        if ($quest['type'] == "polar") {
          //$pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
          $pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
        }
        if ($quest['type'] == "multi") {

          //$pnls .= '<label><input name="opt' . $nr . '[]" type="checkbox" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
          $pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';

        }
        if ($quest['type'] == "choice") {
          //$pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
          $pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
        }
        if ($quest['type'] == "value") {
          //$pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
          $pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
        }
        if ($quest['type'] == "scale") {
          //$pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
          $pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
        }
        if ($quest['type'] == "range") {

          //$pnls .= '<label><input name="opt' . $nr . '" type="radio" value="' . $c . '" /><div class="optdata" data-updated="">' . $a . '</div></label>';
          $pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';

        }
        if ($quest['type'] == "open") {
          //$pnls .= '<label><textarea name="opt' . $nr . '" value="' . $c . '" placaholder="' . $a . '" /></textarea></label>';
          $pnls .= '<div class="optdata" data-updated=""><a href="'.$thisurl. '?qa='.$c.'&s='.$sdata.'">' . $a . '</a></div>';
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
    //$pnls .= '<div id="lastpanel" class="panel end"><div class="donetitle"><h4>' . data.survey_complete_title . '</h4></div><div class="donetext">'.data.survey_complete_text.'</div></div>';


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
  if ($data['email_end'] != '') {
    $html .= '<div class="outro">' . $data['email_end'] . '</div>';
  }
  $html .= '<div class="endgreetings">' . $data['email_regards'] . ',</br />'.$sender['sender'].'</div>';
  $html .= '<div class="profilename">'.$sender['profile'].'</div>';
  $html .= '<div class="disclaimerbox">' . $data['survey_disclaimtext2'] . ' <a href="' . $data['survey_disclaimlink'] . '">' . $data['survey_disclaimlinktext'] . '</a></div>';
  $html .= '<div class="footer">';
  $html .= '<div class="column1">[profile contact info]</div><div class="column2">[profile organisation info]</div><div class="column3"><div class="logobox"><span>logo</span></div></div>';
  $html .= '</div>';
  $html .= '</div>'; // end bottombar

  return $html;
}


  //$html = 'Beste '.$toname.', hier komt een survey..';
  /*
  $html = '
  <div class="surveyemail" data-mode="preview" data-row="1" data-id="id">

  <div class="topbar">
  <div class="header"><div class="logobox"><span>logo</span></div><div class="titletext"><h2>Header Title</h2></div></div>
  <div class="intro"><div class="introtitle"><h3>Sub Title</h3></div><div class="introtext">Short description text</div></div>
  </div>

  <div class="main">

  <div class="emailintro">
  <div class="greeting">Dear '.$toname.',</div>
  <div class="text">This email is send as a follow up on our recent contact. We would like to ask you to help us validate and enhance our services. Would you be so kind to answer a few questions?</div>
  </div>

  <div class="surveyintro">Below is the first question. By answering you will be directed anonymously to our website with the complete survey. Thank you for your effort!</div>
  <div class="beforebox">This survey consists of 6 questions and takes about 48 seconds.</div>

  <div class="surveycontainer">

  <div class="surveyhead">
  <div class="paneltitle"><h1>Survey Example 1 Title</h1></div>
  <div class="infobox"></div>
  <div class="helpbox"></div>
  <div class="panelstarttext">Please share your thoughts about your experience with our services by answering the following questions.</div>
  </div>

  <div id="surveypanels">

  <div id="panel0" class="panel start active required" data-id="0" data-type="polar" style="display: block;">
  <div class="questionbox">Did you know surveys are one of the first practical applications of the personal computer? </div>
  <div class="answerbox polar">
  <label><input name="opt0" type="radio" value="0"><div class="optdata" data-updated="">No</div></label>
  <label><input name="opt0" type="radio" value="1"><div class="optdata" data-updated="">Yes</div></label>
  </div>
  <div class="tipsbox">This is a survey</div>
  </div>

  </div>

  <div class="surveyfoot">
  <div class="panelnav"><div class="buttonrow"><div class="navbut" data-nr="0"><span>1</span></div><div class="navbut" data-nr="1"><span>2</span></div><div class="navbut" data-nr="2"><span>3</span></div><div class="navbut" data-nr="3"><span>4</span></div><div class="navbut" data-nr="4"><span>5</span></div><div class="navbut" data-nr="5"><span>6</span></div></div></div>
  <div class="panelendtext">Info text inside survey box with questions</div>
  </div>

  </div>
  </div>

  <div class="bottombar">
  <div class="outro">Email Outro text (finnishing) below the survey section followed by the regards and sender person name</div>
  <div class="endgreetings">Best regards,<br>copy-1- Tester Profile</div>
  <div class="profilename">Profile Test2</div>
  <div class="disclaimerbox">Disclaim text 2 at the end of the page above the footer (contact) area <a href="#disclaimer">Disclaimer</a></div>
  <div class="footer">
  <div class="column1">[profile contact info]</div>
  <div class="column2">[profile organisation info]</div>
  <div class="column3"><div class="logobox"><span>logo</span></div>
  </div>
  </div>

  </div>

  </div>
  ';
  */
