<?php
// markup functions
function markupEmailHTML( $content ){
  $html = $content;
  return $html;
}

function markupSurveyHTML( $toname, $profile, $survey ){
  //$html = 'Beste '.$toname.', hier komt een survey..';

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
  return $html;
}
