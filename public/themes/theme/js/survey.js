/* public survey interaction */
jQuery(function($){

  function runSurvey(){

    var results;

    var firstq = 0;
    var url = window.location.search.substring(1);
    var varUrl = url.split('&');
    for (var i = 0; i < varUrl.length; i++)
    {
        var parameter = varUrl[i].split('=');
        if (parameter[0] == 'qa')
        {
            firstq = parameter[1];
        }
    }
    $('#panel0').find('input[value='+firstq+']').attr( 'checked','checked');


    $('.navbut[data-nr=0]').addClass('done');

    $('.navbut[data-nr=1]').addClass('active');

    $('.panel.active').slideDown();

    var setNextButton = function( box ){
      box.find('.button.next').removeClass('nonactive');
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
          $('div.surveyfoot .panelnav').slideUp();
          console.log(JSON.stringify(results));
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

    /*
    $('body').on('click touchstart', '.buttonrow .navbut.done', function(){
      let nr = $(this).data('nr');
      $(this).removeClass('done').addClass('active');
      results = surveyResult();
      gotoPanel( nr );
    });
    */
  }

  function surveyResult(){
    let result = {};
    let panels = $('.panel');
    let amount = panels.length;
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

  $(document).ready(function(){

    runSurvey();

  });

});
