/* validate email */


function validateEmailForm(form) {

  let chk = {
    'status': 'send'
  };
  // get form vars

  let formtype = form.find('#formtype').val();
  let fromName = form.find('#fromName').val();
  let fromEmail = form.find('#fromEmail').val();
  let toName = form.find('#toName').val();
  let toEmail = form.find('#toEmail').val();
  let subjectContent = form.find('#subjectContent').val();
  let htmlContent = form.find('#htmlContent').val();
  let surveyid = form.find('#surveyid').val();
  let profileid = form.find('#profileid').val();

  form.find('input, textarea').removeClass('incorrect');
  if (!isTextAndNum(fromName)) {
    chk.status = 'input';
    $.extend(chk, {
      'fromName': 'The from-name is not correct text'
    });
  }
  if (!isEmail(fromEmail)) {
    chk.status = 'input';
    $.extend(chk, {
      'fromEmail': 'The sender email is not correct'
    });
  }
  if (!isTextAndNum(toName)) {
    chk.status = 'input';
    $.extend(chk, {
      'toName': 'The recipient name is empty or not correct text'
    });
  }
  if (!isEmail(toEmail)) {
    chk.status = 'input';
    $.extend(chk, {
      'toEmail': 'The recipient email is not correct'
    });
  }
  if (!isTextAndNum(subjectContent)) {
    chk.status = 'input';
    $.extend(chk, {
      'subjectContent': 'The subject is not correct text'
    });
  }
  if (htmlContent == '') {
    chk.status = 'input';
    $.extend(chk, {
      'htmlContent': 'The content is empty'
    });
  }
  if (formtype == 'survey' && profileid == '') {
    chk.status = 'input';
    $.extend(chk, {
      'profileid': 'Their is no profile available'//, try selecting another profile or copy current profile, remove the old and try again'
    });
  }
  if (formtype == 'survey' && surveyid == '') {
    chk.status = 'input';
    $.extend(chk, {
      'surveyid': 'Their is no survey data available'//, try selecting another survey or copy current survey, remove the old and try again'
    });
  }



  let toSend = {
    'fromname': fromName, //'Webman tester',
    'fromemail': fromEmail, //'support@webdesigndenhaag.net',
    'toname': toName, // recipient name,
    'toemail': toEmail, //'project@oddsized.org',
    'subject': subjectContent, //'Test email v2',
    'htmlcontent': htmlContent, //'<div><h1>Test email verstuurd met javascript en php</h1></div>',
    'formtype': formtype, // survey or email,
    'surveyid': surveyid, // survey id
    'profileid': profileid, // profile id
  };

  $.extend(chk, {
    'tosend': toSend
  });
  return chk;
}



function isEmail(email) {
  //https://emailregex.com/
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function isTextAndNum(txt) {
  //var regex = /[0-9a-zA-Z' ']{5,}/;
  //return regex.test(txt);
  return txt;
}
