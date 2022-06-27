jQuery(function($) {

  $(document).ready(function(){

  markupEmailForm = function( container ) {

    var formtypes = {'email':'Basic email','survey': 'Survey email'};

    var formhtml = $('<div class="emailform"></div>');

    let selectTypeBox = makeSelectBox('formtype', formtypes);

    formhtml.append('<div class="formrow"><label class="formfield"><span>What to send</span>'+selectTypeBox+'</label></div>');

    formhtml.append('<div class="formrow"><label class="formfield"><span>Select Profile</span></label></div>');

    formhtml.append('<input id="action" name="action" type="hidden" value="input">'
    +'<div class="formrow"><label class="formfield"><span>From name</span><input id="fromName" name="fromName" type="text" placeholder="From Name"></label></div>'
    +'<div class="formrow"><label class="formfield"><span>From email</span><input id="fromEmail" name="fromEmail" type="text" placeholder="From Email-address"></label></div>'
    +'<div class="formrow"><label class="formfield"><span>Recipient name</span><input id="toName" name="toName" type="text" placeholder="To Name"></label></div>'
    //formhtml.append('<label class="formfield"><select id="toEmail" name="toEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select><label>');
    +'<div class="formrow"><label class="formfield"><span>Recipient Email</span><input id="toEmail" name="toEmail" type="email" placeholder="To Email-adres"></label></div>'
    +'<div class="formrow"><label class="formfield"><span>Subject</span><input id="subjectContent" name="subjectContent" type="text" placeholder="Subject"></label></div>'
    +'<div class="formrow"><label class="formfield"><span>Message</span><textarea id="htmlContent" name="htmlContent" placeholder="Email content"></textarea></label></div>');

    formhtml.append('<div class="formend"><button class="sendbutton">Send</button></div>');

    container.html(formhtml);

  }

  basicEmailForm = function(){

  }

  surveyEmailForm = function(){

  }

  makeSelectBox = function( name, options ){
    if(name && options){
      //let slcbx = '<select id="fromEmail" name="fromEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select>';
      let slcbx = '<select id="'+name+'" name="'+name+'">';
      let selected = '';
      $.each(options, function( val, txt ){
        if(val == options[0] ){ // first selected
          selected = 'selected="selected';
        }
        slcbx += '<option value="'+val+'" '+selected+'">'+txt+'</option>';
      });
      slcbx += '</select>';
      return slcbx;
    }
    return false;
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




  $('body').on('click', '.emailform .sendbutton', function() {

    let form = $(this).closest('.emailform');
    checkBeforeSend(form);

  });

  markupEmailForm( $('#maincontent') ); //

});// end ready

});
