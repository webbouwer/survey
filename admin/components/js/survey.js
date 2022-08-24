
function runSurvey(){

  var results;

  $('.panel:first').slideDown();
  $('.navbut:first').addClass('active');

  var setNextButton = function( box ){
    if( box.find('.button.next').length < 1 ){
      let text = 'Next';
      if(box.next().hasClass('end')){
        text = 'Finnish';
      }
      box.append('<div class="button next"><span>'+text+'</span></div>');
    }
  }

  var gotoPanel = function( id ){
    $('.panel').removeClass('active').slideUp();
    $('.panel[data-id='+id+']').addClass('active').slideDown();
  }

  var nextPanel = function( panel ){

    panel.removeClass('active').slideUp();
    let next = panel.next();
    let id = panel.data('id');
    let nxtid = next.data('id');

    $('.navbut[data-nr='+id+']').removeClass('active');
    $('.navbut[data-nr='+id+']').addClass('done');

    if( !panel.hasClass('end') ){
      $('.navbut[data-nr='+nxtid+']').addClass('active');
      next.addClass('active').slideDown();
    }
    if( next.hasClass('end') ){
        //alert(JSON.stringify(results));
    }

  }

  var onAnswerSelect = function( panel ){
    let id = panel.data('id');
    let type = panel.data('type');
    let next = panel.next();
    if( type == 'multi' || type == 'open'){
      setNextButton( panel );
    }else{
      results = surveyResult();
      nextPanel(panel);
    }
  }

  $('body').on('click touchstart', '.answerbox label input', function(){
    let panel = $(this).closest('.panel');
    onAnswerSelect( panel );
  });

  $('body').on('blur', '.answerbox label textarea', function(){
    let panel = $(this).closest('.panel');
    onAnswerSelect( panel );
  });

  $('body').on('click touchstart', '.button.next', function(){
    let panel = $(this).closest('.panel');
    results = surveyResult();
    nextPanel(panel);
  });

  $('body').on('click touchstart', '.buttonrow .navbut.done', function(){
    let nr = $(this).data('nr');
    $(this).removeClass('done').addClass('active');
    results = surveyResult();
    gotoPanel( nr );
  });

}

/*
    var answers = [];
    $('body').on('click', '.answerbox label input', function(){
      let panel = $(this).closest('.panel');
      onAnswerSelect( panel );
    });
    $('body').on('blur', '.answerbox label textarea', function(){
      let panel = $(this).closest('.panel');
      onAnswerSelect( panel );
    });


    var onAnswerSelect = function( panel ){
         let id = panel.data('id');
         let type = panel.data('type');
         let next = panel.next();
         if( type == 'multi' || type == 'open'){
             setNextButton( panel );
         }else{
              answers[id] = panel.find('input[type=radio]:checked').val();
              panel.removeClass('active');
              next.addClass('active');
         }
    }

    var setNextButton = function( box ){
      if( box.find('.button.next').length < 1 ){
        box.append('<div class="button next"><span>Next</span></div>');
      }
    }

      $('body').on('click touchstart', '.button.next', function(){

        let box = $(this).closest('.panel');
        let next = $(this).closest('.panel').next();

        if( box.find('textarea').length > 0 ){

          answers[box.data('id')] = box.find('textarea').val();

        }else{

          var checkboxes = box.find('input[type=checkbox]:checked').val();
          var slct = [];

          for(c=0;c<checkboxes.length; c++){
            slct.push(checkboxes[c]);
          }

          answers[box.data('id')] = slct;

        }

        box.removeClass('active');
        if( !box.hasClass('end') ){
          next.addClass('active');
        }
        if( next.hasClass('end') ){
            alert(JSON.stringify(answers));
        }

      });

*/


function surveyResult(){
  let result = {};
  let panels = $('.panel');
  $.each( panels, function(nr, quest) {

      let id = $(quest).data('id');
      let chk = 0;
      if( $(quest).find('input[type=checkbox]:checked').length > 0 ){
        let multi = [];
        let chkd = $(quest).find('input[type=checkbox]:checked');
        $.each( chkd, function( n, answer){
          multi[n] = $(answer).val();
        });
        result[id] = multi;
        chk = 1;
      }
      if( $(quest).find('input[type=radio]:checked').length > 0 ){
        result[id] = $(quest).find('input[type=radio]:checked').val();
        chk = 1;
      }
      if( $(quest).find('textarea').length > 0 ){
        result[id] = $(quest).find('textarea').val();
        chk = 1;
      }
      if( chk == 1){
        $('div.navbut[data-id='+id+']').addClass('done');
      }
  });
  return result;

}

function buildSurvey( idx, data ){

  var fields = data['fields'];
  var data = data[idx];
  let html = '';

  html += '<div class="surveypage" data-row="' + idx + '" data-id="' + data.id + '">';

  html +=  '<div class="topbar"><div class="header"><div class="logobox"><span>logo</span></div><div class="titletext"><h2>' + data.title + '</h2></div></div>';

  html +=  '<div class="intro"><div class="introtitle"><h3>' + data.intro_title + '</h3></div><div class="introtext">' + data.intro_text + '</div></div></div>';

  html +=  '<div class="main"><div class="introsubtext">' + data.intro_subtext + '</div>';


  let prvwpnls = '<div class="surveyhead"><div class="paneltitle"><h1>' + data.survey_title + '</h1></div>';
  prvwpnls += '<div class="infobox"></div>';
  prvwpnls += '<div class="helpbox"></div>';

  if (data.survey_start != '') {
    prvwpnls += '<div class="panelstarttext">' + data.survey_start + '</div>';
  }
  prvwpnls +='</div>'; // end survey box head

  if (data.json.length > 0) {

    prvwpnls += '<div id="surveypanels">'; // start surveypanels
    let qs = JSON.parse(data.json);
    let total = qs.length;
    let count = 1;

    $.each(qs, function(nr, quest) {
      let panelpos = '';
      if(count == 1){
        panelpos = 'start active';
      }
      prvwpnls += '<div id="panel' + count + '" class="panel '+panelpos+'" data-id="'+nr+'" data-type="'+quest.type+'">';
      prvwpnls += '<div class="questionbox">' + quest.question + '</div>';
      if (quest.type != '') {
        prvwpnls += '<div class="answerbox ' + quest.type + '">';
        //console.log(quest.type);
        $.each(quest.answers, function(c, a) {
          if (quest.type == "polar") {
            prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
          }
          if (quest.type == "multi") {
            prvwpnls += '<label><input name="opt' + nr + '[]" type="checkbox" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
          }
          if (quest.type == "choice") {
            prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
          }
          if (quest.type == "value") {
            prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
          }

          if (quest.type == "scale") {
            prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
          }
          /*
          if (quest.type == "range") {
            prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
          }
          */
          if (quest.type == "open") {
            prvwpnls += '<label><textarea name="opt' + nr + '" value="' + c + '" placaholder="' + a + '" /></textarea></label>';
          }
        });
        prvwpnls += '</div>';
      }
      prvwpnls += '</div>';
      count++;
    });

    prvwpnls += '<div id="lastpanel" class="panel end"><div class="donetitle"><h4>' + data.survey_complete_title + '</h4></div><div class="donetext">'+data.survey_complete_text+'</div></div>';

    prvwpnls += '</div>'; // end surveypanels
  }else{
    prvwpnls += '<div class="nosurveydata">Something is wrong with the survey data. See if you can edit the data and try this preview again.</div>';
  }
  prvwpnls += '<div class="surveyfoot">';

  prvwpnls += '<div class="panelnav"><div class="buttonrow">';
  let t = JSON.parse(data.json).length;
  for(n=0;n<t;n++){
    prvwpnls += '<div class="navbut" data-nr="'+n+'"><span>'+n+'</span></div>';
  }
  prvwpnls += '</div></div>';

  if (data.survey_end != '') {
    prvwpnls += '<div class="panelendtext">' + data.survey_end + '</div>';
  }
  prvwpnls += '</div>';

  html +=  '<div class="beforebox">[survey generated info text]</div>';

  html +=  '<div class="surveycontainer">'+prvwpnls+'</div>'; // survey panels box

  html += '<div class="afterbox">';
  if (data.survey_disclaimtext1 != '') {
    html += '<div class="disclaimtext1">' + data.survey_disclaimtext1 + '</div>';
  }
  if (data.survey_after != '') {
    html += '<div class="aftertext">' + data.survey_after + '</div>';
  }
  html += '</div>'; //end afterbox
  html += '</div>'; // end main

  html += '<div class="bottombar">';

  if (data.outro_text != '') {
  html += '<div class="outro">' + data.outro_text + '</div>';
  }
  html += '<div class="disclaimerbox">' + data.survey_disclaimtext2 + ' <a href="' + data.survey_disclaimlink + '">' + data.survey_disclaimlinktext + '</a></div>';

  html += '<div class="footer">';
  html += '<div class="column1">[profile contact info]</div><div class="column2">[profile organisation info]</div><div class="column3"><div class="logobox"><span>logo</span></div></div>';
  html += '</div>';
  html += '</div>'; // end bottombar

  return html;
}
