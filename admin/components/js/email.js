jQuery(function($) {

  $(document).ready(function(){

  markupEmailForm = function( container ) {

    var formhtml = $('<div class="emailform"></div>');

    formhtml.append('<div class="content-title"><h1>Versturen</h1></div><div class="content-intro"><p>Vul in en verstuur</p></div>');

    formhtml.append('<div id="messagebox"></div>');

    formhtml.append('<input id="action" name="action" type="hidden" value="input">');
    formhtml.append('<div class="formrow"><label class="formfield"><span>From name</span><input id="fromName" name="fromName" type="text" placeholder="Naam"></label></div>');
    formhtml.append('<div class="formrow"><label class="formfield"><span>From email</span><select id="fromEmail" name="fromEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select></label></div>');
    formhtml.append('<div class="formrow"><label class="formfield"><span>Recipient name</span><input id="toName" name="toName" type="text" placeholder="Naam"></label></div>');
    //formhtml.append('<label class="formfield"><select id="toEmail" name="toEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select><label>');
    formhtml.append('<div class="formrow"><label class="formfield"><span>Recipient Email</span><input id="toEmail" name="toEmail" type="email" placeholder="Email-adres"></label></div>');
    formhtml.append('<div class="formrow"><label class="formfield"><span>Subject</span><input id="subjectContent" name="subjectContent" type="text" placeholder="Subject"></label></div>');
    formhtml.append('<div class="formrow"><label class="formfield"><span>Message</span><textarea id="htmlContent" name="htmlContent" placeholder="Email content"></textarea></label></div>');

    formhtml.append('<div class="formend"><button class="sendbutton">Send</button></div>');

    container.html(formhtml);

  }

  sendHTMLEmail = function(tosend = false) {

    if (tosend) {
      //alert( JSON.stringify( tosave ) );
      var senddata = {
        'data': tosend,
        'action': 'send',
        'name': 'send' // protected
      };
      console.log( JSON.stringify(senddata) );

      $.ajax({
          type: 'POST',
          url: 'components/classes/sendemail.php',
          data: senddata,
          dataType: 'json',
        }).done(function(data) {
          $('.emailform').slideUp(500, function(){
            $('input,textarea').val('');
            $(this).slideDown(500);
          });
          setMessagebox(data['msg'], 3600);
        })
        .fail(function(data) {
          setMessagebox(data['msg'], 6000);
        });

    } else {

      var data = {
        "status": "failed",
        "msg": "Error: Not enough or incorrect data to send an email."
      };
      setMessagebox(data['msg'], 6000);

    }

  }


    function checkBeforeSend(form) {

      let chk = validateEmailForm(form);

      if (chk.status == 'input') {
        let msg = '';
        $.each(chk, function(k, v) {
          if (k != 'status' && k != 'tosend') {
            form.find('#' + k).addClass('incorrect');
            msg += '<div>- '+v+'</div>';
          }
        });
        //alert('Email check: ' + JSON.stringify(chk));
        setMessagebox(msg, 3600);
      }

      if (chk.status == 'send') {
        toSend = chk.tosend;
        //console.log( JSON.stringify(toSend) );
        setMessagebox('Sending email..');
        setTimeout( function(){
          sendHTMLEmail( toSend );
        }, 500);
      }

    }

  function setMessagebox(msg, time = false){
    if( $('body').find('#messagebox .formmessage').length < 1){
      $('#messagebox').append('<div class="formmessage"></div>');
    }
    $('body').find('#messagebox .formmessage').fadeOut( 300, function(){
      $('body').find('#messagebox .formmessage').html(msg).fadeIn(500);
    });
    if( time ){
      setTimeout( function(){
        $('body').find('#messagebox .formmessage').fadeOut(500);
      }, time);
    }
  }


  $('body').on('click', '.emailform .sendbutton', function() {

    let form = $(this).closest('.emailform');
    checkBeforeSend(form);

  });

  markupEmailForm( $('#maincontent') ); //

});// end ready

});
