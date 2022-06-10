/*
 * #emailform
 * JQuery
 * admin/js/adminview.js
 * admin/js/surveydata.js
 * admin/js/configdata.js
 * - admin/classes/datasurvey.php
 * - admin/classes/dataconfig.php
 * - - admin/classes/rwdata.php
 * - - - admin/classes/data/data.json
 * - - - admin/classes/data/config.json
 *
*/
jQuery(function($) {

  $(document).ready(function(){

  //var configs = getConfigDataTable();
  //console.log(configs);
  //var surveys = getSurveyDataTable();
  //console.log(surveys);

  markupEmailForm = function( container ) {


    var formhtml = $('<div class="emailform"></div>');

    formhtml.append('<input id="action" name="action" type="hidden" value="input">');
    formhtml.append('<label class="formfield"><span>From name</span><input id="fromName" name="fromName" type="text" placeholder="Naam"></label>');
    formhtml.append('<label class="formfield"><span>From email</span><select id="fromEmail" name="fromEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select></label>');
    formhtml.append('<label class="formfield"><span>Recipient name</span><input id="toName" name="toName" type="text" placeholder="Naam"></label>');
    //formhtml.append('<label class="formfield"><select id="toEmail" name="toEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select><label>');
    formhtml.append('<label class="formfield"><span>Recipient Email</span><input id="toEmail" name="toEmail" type="email" placeholder="Email-adres"></label>');
    formhtml.append('<label class="formfield"><span>Subject</span><input id="subjectContent" name="subjectContent" type="text" placeholder="Subject"></label>');
    formhtml.append('<label class="formfield"><span>Message</span><textarea id="htmlContent" name="htmlContent" placeholder="Email content"></textarea></label>');
    formhtml.append('<button class="sendbutton">Send</button>');

    container.append(formhtml);

  }

  function checkBeforeSend(form) {

    let chk = validateEmailForm(form);

    if (chk.status == 'input') {
      $.each(chk, function(k, v) {
        if (k != 'status' && k != 'tosend') {
          form.find('#' + k).addClass('incorrect');
        }
      });
      alert('Email check: ' + JSON.stringify(chk));
    }

    if (chk.status == 'send') {
      alert('Email submit: ' + JSON.stringify(chk.tosend));
      //sendHTMLEmail( toSend );
    }

  }


  sendHTMLEmail = function(tosend = false) {

    if (tosend) {
      //alert( JSON.stringify( tosave ) );
      var senddata = {
        'data': tosend,
        'action': 'send'
      };
      $.ajax({
          type: 'POST',
          url: 'classes/sendemail.php',
          data: senddata,
          dataType: 'json',
        }).done(function(data) {
          console.log('email send');
          console.log(data);
          //displayList(data); //(for admins)
          //alert( JSON.stringify( data ) );

        })
        .fail(function(data) {
          console.log('sending failed');
          console.log(data);
        });

    } else {

      var data = {
        "status": "failed",
        "msg": "Error: Not enough or incorrect data to send an email."
      };
      console.log('sending failed');
      console.log(data);

    }

  }


  $('body').on('click', '.emailform .sendbutton', function() {

    let form = $(this).closest('.emailform');
    checkBeforeSend(form);

  });

});// end ready

});
