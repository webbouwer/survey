<?php
include('config.php');

//https://www.php.net/manual/en/timezones.europe.php
$timezone = date_default_timezone_set('Europe/Amsterdam');
$date = date('Y-m-d', time());

/*** check requests ***/
if( isset($_GET['qa']) && isset($_GET['s']) ){ // participant survey id

  $action = 1; // participant complete survey

  // incoming from email
  $udata = json_decode( decrypt($key, urldecode( $_GET['s'] ) ) );
  $sid = $udata->sid;
  $sr = $udata->sr;
  $toname = $udata->pn;
  $toemail = $udata->pe;
  $senddate = $udata->ed;
  $qa1 = $_GET['qa'];

  $expiredate = date('Y-m-d', strtotime('+7 days', strtotime($senddate)));

  $date_diff=( strtotime( $expiredate ) - strtotime( $date ) ) / 86400;

  if( strtotime( $date ) > strtotime( $expiredate ) ){
    //round($date_diff, 0) < 1
    // expired
    $action = 3;
  }
}

/************ sending survey data by email ***********/
if( isset($_POST['sid']) && isset($_POST['action']) ){
  $action = 2; // participant send survey
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="survey.css">
    <title>Form</title>
</head>
<body>

<div id="pagecontainer">

<?php if($action == 1){ ?>

  <form action="survey.php" method="post">
    <input id="action" name="action" type="hidden" value="start" />
    <input id="sid" name="sid" type="hidden" value="<?php echo $sid; ?>" />

    <div id="userbox">
    Survey nr. <?php echo $sr; ?> - id <?php echo $sid; ?></br>
    name: <?php echo $toname; ?> <br />
    email: <?php echo $toemail; ?> <br />
    expires: <?php echo round($date_diff, 0)." days left"; ?> <br />
    </div>

    <!-- first question answer: <?php echo $qa1; ?><br /> -->
    <div id="surveybox"></div>

    <div id="completebox" style="clear:both;">
      <p><?php echo _TEXT_CLICKTOCOMPLETE; ?></p>
      <input id="complete" name="complete" type="submit" value="<?php echo _COMPLETE; ?>" />
    </div>

  </form>

  <!-- javascript data<lijst>.json -->
  <script>

    var slc = '<?php echo $sr; ?>';

    var getFormData = function(slc) {

      if (slc > 0) {

        var source = '<?php echo $thislink; ?>/lib/list'+ slc + '.json';

        async function loadJSON(source) {

          fetch(source)
            .then(r => r.json().then(data => ({
              status: r.status,
              body: data
            })))
            .then(obj => extendData(obj));

        }

        async function extendData(json) {

          var jsondata = json.body;
          console.log(jsondata);

          let html = '<h2>'+jsondata.title+'</h2>';
          let qc = 0;
          let qa1 = <?php echo $qa1; ?>;
          for (let q in jsondata.questions) {

             html += '<div class="questionbox"><h3>'+jsondata.questions[q].question+'</h3>';
             let ac = 0;
             for (let a in jsondata.questions[q].answers) {
                if( qc == 0 && ac == qa1 ){
                  html += '<div class="answerbox"><label><input type="radio" checked="checked" name="section_' + q + '" value="' + a + '"><div>';
                  html += jsondata.questions[q].answers[a];
                  html += '</div></label></div>';
                  //html += '<div style="color:green;">'+jsondata.questions[q].answers[a]+'</div>';
                }else{
                  html += '<div class="answerbox"><label><input type="radio" name="section_' + q + '" value="' + a + '"><div>';
                  html += jsondata.questions[q].answers[a];
                  html += '</div></label></div>';//'<div>'+jsondata.questions[q].answers[a]+'</div>';
                }
                ac++;
             }
             qc++;
             html += '</div>';
          }

          document.getElementById("surveybox").innerHTML = html; //JSON.stringify(jsondata);

        }

        loadJSON(source);
      } else {
        document.getElementById("surveybox").innerHTML = _MSG_NOTAVAILABLE;
      }
    }

    getFormData(slc);

  </script>
<?php
}
?>

<?php if($action == 2){




  echo '<p>'._TEXT_THANKYOUCOMPLETESEND.'</p>';
  // redirect
} ?>

<?php if($action == 3){
  echo '<p>'._LINKISEXPIRED.'</p>';
}?>
</div>
</body>
</html>
