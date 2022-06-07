<?php
include('config.php');
/*
define('WP_USE_THEMES', false);
require('../wp-blog-header.php');
if(!is_user_logged_in())
{
    exit('You do not have access');
}

include( 'wp/wp-load.php');
global $current_user;
get_currentuserinfo();
// print_r($current_user);
*/




?>
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="survey.css">
    <title><?php echo _ADMINTITLE; ?></title>
  </head>

  <body>
    <div id="pagecontainer">

    <h1><?php echo _QUESTIONLISTBYMAIL; ?></h1>
    <form action="send.php" method="post">

      <input id="action" name="action" type="hidden" value="start" />
      <input id="sid" name="sid" type="hidden" value="<?php echo uniqid(); ?>" />

      <div>
        <p><?php echo _SELECTSURVEYLIST; ?></p>

        <p>
          <?php
          makeSurveySelectBox();
          ?>
          <!--
          <select id="sr" name="sr">
            <option value="0" selected="selected"><?php echo _SELECTSURVEY; ?></option>
            <option value="1">Lijst 1</option>
            <option value="2">Lijst 2</option>
          </select>
        -->
        </p>
      </div>

      <div id="previewbox"></div>

      <input id="pn" name="pn" type="text" placeholder="<?php echo _NAME; ?>" />
      <input id="pe" name="pe" type="email" placeholder="<?php echo _EMAIL; ?>" />
      <input id="go" name="go" type="submit" value="<?php echo _SEND; ?>" />

    </form>

  </div>

  <!-- javascript data<lijst>.json -->
  <script>

    window.addEventListener('load', function(event) {
      let selected = document.getElementById('sr').value;
      if( selected != 0 ){
        getFormData(selected);
      }
    });

    document.getElementById('sr').onchange = function() {
      getFormData(this.value);
    };

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

          for (let q in jsondata.questions) {

             html += '<div>'+jsondata.questions[q].question+'</div>';

             for (let a in jsondata.questions[q].answers) {
                html += '<div>'+jsondata.questions[q].answers[a]+'</div>';
             }

          }

          document.getElementById("previewbox").innerHTML = html; //JSON.stringify(jsondata);

        }

        loadJSON(source);
      } else {
        document.getElementById("previewbox").innerHTML = '';
      }
    }

  </script>

  </body>

</html>
