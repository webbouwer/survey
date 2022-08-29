jQuery(function($) {


  $(document).ready(function() {


    var profilelist;
    var surveylist;

    var surveyboard = new surveyEngine();

    markupEmailForm = function(container) {

      let formtypes = {
        'email': 'Basic email',
        'survey': 'Survey email'
      };
      let selectTypeBox = makeTypeSelectBox('formtype', formtypes);

      var formhtml = $('<div class="emailform"></div>');

      formhtml.append('<div class="formrow"><label class="formfield"><span>What to send</span>' + selectTypeBox + '</label></div>');

      formhtml.append('<input id="action" name="action" type="hidden" value="email">' +
        '<input id="surveyid" name="surveyid" type="hidden" value="">' +
        '<input id="profileid" name="profileid" type="hidden" value="">' +
        '<div class="formrow"><label class="formfield"><span>From name</span><input id="fromName" name="fromName" type="text" placeholder="From Name"></label></div>' +
        '<div class="formrow"><label class="formfield"><span>From email</span><input id="fromEmail" name="fromEmail" type="text" placeholder="From Email-address"></label></div>' +
        '<div class="formrow"><label class="formfield"><span>Recipient name</span><input id="toName" name="toName" type="text" placeholder="To Name"></label></div>'
        //formhtml.append('<label class="formfield"><select id="toEmail" name="toEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select><label>');
        +
        '<div class="formrow"><label class="formfield"><span>Recipient Email</span><input id="toEmail" name="toEmail" type="email" placeholder="To Email-adres"></label></div>' +
        '<div class="formrow"><label class="formfield"><span>Subject</span><input id="subjectContent" name="subjectContent" type="text" placeholder="Subject"></label></div>' +
        '<div class="formrow"><label class="formfield"><span>Message</span><textarea id="htmlContent" name="htmlContent" placeholder="Email content"></textarea></label></div>');

      formhtml.append('<div class="formpreview"><button class="previewemailbutton">Preview Email</button><button class="previewsurveybutton">Preview Survey</button></div>');

      formhtml.append('<div class="formend"><button class="sendbutton">Send</button></div>');

      container.html(formhtml);

      setProfileSelect();

    }


    var setProfileSelect = function(idx = false) {

      //var profilelist;
      var profileselect = {};
      var selectProfileBox = '';

      let configDataUrl = 'components/classes/config.php'; // protected

      $.ajax({
        type: 'POST',
        url: configDataUrl,
        data: {
          'action': 'list',
          'name': 'check'
        },
        dataType: 'json',
      }).done(function(data) {

        if (data['fields']) {

          profilelist = data;
          surveyboard.profiledata = data;
          let fields = data['fields'];
          $.each(data, function(idx, obj) {
            if (idx != 'fields') {
              profileselect[idx] = obj['email_address'];
            }
          });
        }

        var slcbx = '<select id="formprofile" name="formprofile">';
        var cnt = 0;
        var slc = false;
        $.each(profileselect, function(val, txt) {
          let selected = '';
          if (!idx && cnt == 0) { // first selected
            slc = val;
            selected = 'selected="selected"';
          }
          if (idx && idx == val) { // first selected
            slc = val;
            selected = 'selected="selected"';
          }
          slcbx += '<option value="' + val + '" ' + selected + '>' + txt + '</option>';
          cnt++;
        });
        slcbx += '</select>';

        if( $('.formrow.profileselect').length > 0 ){
          $('.formrow.profileselect').remove();
        }

        selectProfileBox = '<div class="formrow profileselect"><label class="formfield"><span>Select Profile</span>' + slcbx + '</label></div>';
        $('.formrow:first-child').after(selectProfileBox);
        $('input[name="profileid"]').val(slc);
        $('input[name="fromName"]').val(profilelist[slc]['profile']);
        $('input[name="fromEmail"]').val(profilelist[slc]['email_address']);

      });

    }

    var setSurveySelect = function(idx = false) {

      //var surveylist;
      var surveyselect = {};
      var selectSurveyBox = '';

      let surveyDataUrl = 'components/classes/datalist.php'; // protected

      $.ajax({
        type: 'POST',
        url: surveyDataUrl,
        data: {
          'action': 'list',
          'name': 'check'
        },
        dataType: 'json',
      }).done(function(data) {

        if (data['fields']) {
          surveylist = data;
          surveyboard.surveydata = data;
          let fields = data['fields'];
          $.each(data, function(idx, obj) {
            if (idx != 'fields') {
              surveyselect[idx] = obj['title'];
            }
          });
        }

        var slcbx = '<select id="formsurvey" name="formsurvey">';

        var cnt = 0;
        var slc = false;
        $.each(surveyselect, function(val, txt) {
          let selected = '';
          if (!idx && cnt == 0) { // first selected
            slc = val;
            selected = 'selected="selected"';
          }
          if (idx && idx == val) { // first selected
            slc = val;
            selected = 'selected="selected"';
          }
          slcbx += '<option value="' + val + '" ' + selected + '>' + txt + '</option>';
          cnt++;
        });
        slcbx += '</select>';

        selectSurveyBox = '<div class="formrow surveyselect"><label class="formfield"><span>Select Survey</span>' + slcbx + '</label></div>';
        $('#formsurvey').closest('.formrow').remove();
        $('.formrow:nth-child(2)').after(selectSurveyBox);

        $('input[name="surveyid"]').val(slc);
        $('input[name="subjectContent"]').val(surveylist[slc]['title']);
        $('textarea[name="htmlContent"]').val(surveylist[slc]['desc']);

      });

    }


    // start engine ..

    /*
    basicEmailForm = function() {
    }

    surveyEmailForm = function() {
    }
    */

    var makeTypeSelectBox = function(name, options) {

      if (name && options) {
        //let slcbx = '<select id="fromEmail" name="fromEmail"><option value="support@webdesigndenhaag.net" selected="selected">support@webdesigndenhaag.net</option><option value="project@oddsized.org">project@oddsized.org</option></select>';
        let slcbx = '<select id="' + name + '" name="' + name + '">';
        let selected = '';
        $.each(options, function(val, txt) {
          if (val == options[0]) { // first selected
            selected = 'selected="selected"';
          }
          slcbx += '<option value="' + val + '" ' + selected + '>' + txt + '</option>';
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
        console.log(JSON.stringify(senddata));

        $.ajax({
            type: 'POST',
            url: 'components/classes/sendemail.php',
            data: senddata,
            dataType: 'json',
          }).done(function(data) {
            $('.emailform').slideUp(500, function() {
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

      // check email type
      if( form.find('#formtype').children("option:selected").val() == 'email'){
          // alert('basic email preview');
          // clear survey id
          form.find('#surveyid').val('');
      }/*
      else{
        if(form.find('#surveyid') != ''){
          surveyboard.surveyID = form.find('#surveyid').val();
          surveyboard.profileID = form.find('#profileid').val();
        }
      }
      */
      // validate input
      let chk = validateEmailForm(form);

      if (chk.status == 'input') {
        let msg = '';
        $.each(chk, function(k, v) {
          if (k != 'status' && k != 'tosend') {
            form.find('#' + k).addClass('incorrect');
            msg += '<div>- ' + v + '</div>';
          }
        });
        //alert('Email check: ' + JSON.stringify(chk));
        setMessagebox(msg, 3600);
      }

      if (chk.status == 'send') {

        let toSend = chk.tosend;

        if(toSend.formtype == 'survey' && toSend.surveyid != '' && toSend.profileid != ''){

          $.extend(toSend, {
            'survey': surveylist[toSend.surveyid],
            'profile': profilelist[toSend.profileid],
          });

        }
        //console.log( JSON.stringify(toSend) );
        setMessagebox('Sending email..');
        setTimeout(function() {
          sendHTMLEmail(toSend);
        }, 500);
      }

    }

    $('body').on('click', '.emailform .previewemailbutton', function() {

        if( $('#formtype').children("option:selected").val() == 'email'){
            alert('basic email preview');
        }else{
          if($('#surveyid').val() != ''){

            surveyboard.surveyID = $('#surveyid').val();
            surveyboard.profileID = $('#profileid').val();
            surveyboard.surveyEmailPreview();

          }
        }

    });

    $('body').on('click', '.emailform .previewsurveybutton', function() {
        if($('#surveyid').val() != ''){

          surveyboard.surveyID = $('#surveyid').val();
          surveyboard.profileID = $('#profileid').val();
          surveyboard.surveyPagePreview();

        }
    });

    $('body').on('click', '.emailform .sendbutton', function() {

      let form = $(this).closest('.emailform');
      checkBeforeSend(form);

    });

    $('body').on('click touchstart', '.closeOverlay', function() {
      removeOverlay();
    });



    $('body').on('change', '#formtype', function() {

          if( this.value == 'survey'){
            $('body').find('.emailform').addClass('survey');
            setSurveySelect();
            $('input[name="action"]').val('survey');

          $('body').on('change', '#formsurvey', function() {
              setSurveySelect(this.value);
            });
          }else{
            $('body').find('.emailform').removeClass('survey');
            $('input[name="action"]').val('email');
            $('input[name="subjectContent"]').val('');
            $('textarea[name="htmlContent"]').val('');
          }
    });

    $('body').on('change', '#formprofile', function() {
      setProfileSelect(this.value);
    });

    markupEmailForm($('#maincontent')); //

    // switch to survey at start
    let opt = $('#formtype');
    opt[0].selectedIndex = 1; // make selection
    opt[0].focus(); // set the focus
    opt.trigger('change');
    opt[0].blur();

  }); // end ready

});
