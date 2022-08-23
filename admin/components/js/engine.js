/**/
jQuery(function($) {

    /**/
    var surveyEngine = function(src) {

      var root = this;

      // settings
      var source = {
        'datalist': {}, // datalist of surveys
        'htmlbundle': {},
        'profiles': {}, // contact profiles to use for sending
        'themes': {}, // themes for this survey
      };

      var settings = {
        'survey': {}, // active survey data
        'theme': {}, // active theme data
        'profile': {}, // active profile data
        'mode': '', // edit, preview/test, preview email, send
        'boxid': 'contentcontainer', // html parent element the survey goes into
      };

      var types = {
        '0': 'polar', // var1 | var2
        '1': 'choice', // var1 or var2 or var3
        '2': 'range', // between var1 and var2
        '3': 'value', // select value between var1 to var10
        '4': 'multi', // select multiple options (checkbox)
        '5': 'open' // input text (min max chars.)
      };

      this.init = function() {

        $.extend(source, src);
        if (source.datalist != {}) {
          this.surveyData();
        }
        // else find default data

      };

      // preview - viewer
      this.previewSurvey = function( rownr = false ) {

  			settings.mode = 'preview';

  			if( rownr && source.htmlbundle[rownr] !== 'undefined' ){

  				let html = source.htmlbundle[rownr].page_start;
  				html += source.htmlbundle[rownr].page_top;
  				html += source.htmlbundle[rownr].page_header;
  				html += source.htmlbundle[rownr].page_intro;
  				html += source.htmlbundle[rownr].page_survey_start;
  				html += source.htmlbundle[rownr].page_survey_main;
  				//html += source.htmlbundle[rownr].page_survey_end;
  				html += source.htmlbundle[rownr].page_outro;
  				html += source.htmlbundle[rownr].page_footer;
  				html += source.htmlbundle[rownr].page_end;

  				$('#'+settings.boxid).html(html);
  				console.log(settings.mode);
  				console.log(source.datalist[rownr]);
  			}

      }

      // edit - editor
      this.editSurvey = function() {

      }
      // email - mailer
      this.mailSurvey = function() {

      }

      // data collect
      this.surveyData = function() {

        // testdata console.log(JSON.stringify(source.datalist));
        let container = $('#' + settings.boxid);

        let html = {};
        $.each(source.datalist, function(row, data) {

          if (row != 'fields') {
            root.surveyDataToHTML(row, data);
            //console.log(JSON.stringify(	);
            //console.log( source.htmlbundle[data.rownr].page_header );
          }

        });

      }

      // theme class
      this.surveyDataToHTML = function(rownr, data) {

        let prvwpnls = '<div class="paneltitle">' + data.survey_title + '</div>';
        if (data.survey_start != '') {
          prvwpnls += '<div class="panelstarttext">' + data.survey_start + '</div>';
        }

  			prvwpnls += '<div id="surveypanels">'; // start surveypanels

        if (data.json.length > 0) {

          let qs = JSON.parse(data.json);

          let count = 0;
          $.each(qs, function(nr, quest) {

            prvwpnls += '<div id="panel' + count + '" class="panel">';
            prvwpnls += '<div class="questionbox">' + quest.question + '</div>';

            if (quest.type != '') {
              prvwpnls += '<div class="answerbox ' + quest.type + '">';

              //console.log(quest.type);

              $.each(quest.answers, function(c, a) {

                if (quest.type == "polar") {
                  prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
                }

                if (quest.type == "multi") {
                  prvwpnls += '<label><input name="opt' + nr + '" type="checkbox" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
                }
                if (quest.type == "choice") {
                  prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
                }
                if (quest.type == "value") {
                  prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
                }
                if (quest.type == "range") {
                  prvwpnls += '<label><input name="opt' + nr + '" type="radio" value="' + c + '" /><div class="optdata" data-updated="">' + a + '</div></label>';
                }
                if (quest.type == "open") {
                  prvwpnls += '<label><textarea name="opt' + nr + '" value="' + c + '" placaholder="' + a + '" /></textarea></label>';
                }
              });
              prvwpnls += '</div>';
            }
            prvwpnls += '</div>';
            count++;
          });
  				prvwpnls += '</div>'; // end surveypanels
          if (data.survey_end != '') {
            prvwpnls += '<div class="panelendtext">' + data.survey_end + '</div>';
          }


        }

        source.htmlbundle[rownr] = {

          'page_start': '<div class="surveycontainer" data-row="' + rownr + '" data-id="' + data.id + '">',
          'page_top': '<div class="topbar"><div class="logobox"><span>logo</span></div><div class="titletext"><h2>' + data.title + '</h2></div></div>',
          'page_header': '<div class="header"><div class="introtitle"><h3>' + data.intro_title + '</h3></div><div class="introtext">' + data.intro_text + '</div></div>',
          'page_intro': '<div class="introsubtext">' + data.intro_subtext + '</div>',

          'page_survey_start': '<div class="main"><div class="beforebox">[survey generated info text]</div>',
          'page_survey_main': '<div class="surveycontainer">'+prvwpnls+'</div>',
          'page_survey_end': '<div class="afterbox">' + data.survey_end + '</div></div>',

          'page_outro': '<div class="outro">' + data.outro_text + '</div><div class="disclaimerbox">' + data.survey_disclaimtext2 + ' <a href="' + data.survey_disclaimlink + '">' + data.survey_disclaimlinktext + '</a></div>',
          'page_footer': '<div class="bottombar"><div class="column1">[profile contact info]</div><div class="column2">[profile organisation info]</div><div class="column3"><div class="logobox"><span>logo</span></div></div></div>',
          'page_end': '</div>',

          // 'edit_start'
          // 'edit_top'
          // 'edit_header'
          // 'edit_intro'
          // 'edit_survey'
          // 'edit_footer'
          //'edit_end': '</div>'

          'email_start': '<div class="surveycontainer" data-row="' + rownr + '" data-id="' + data.id + '">',
          'email_top': '<div class="topbar"><div class="logobox"><span>logo</span></div><div class="titletext"><h2>' + data.title + '</h2></div></div>',
          'email_header': '<div class="header"><div class="subtitle"><h3>' + data.subtitle + '</h3></div><div class="desc">' + data.desc + '</div></div>',
          'email_intro': '<div class="intro"><div class="salut">' + data.email_salut + ' [participant name],</div><div class="emailtext">' + data.email_text + '</div><div class="surveyintro">' + data.email_surveyintro + '</div></div>',

          'email_survey_start': '<div class="main"><div class="beforebox">[survey generated info text]</div>',
          'email_survey_main': '<div class="surveycontainer"></div>',
          'email_survey_end': '<div class="afterbox">' + data.email_end + '</div></div>',

          'email_outro': '<div class="outro"><div class="salut">' + data.email_regards + ', <div class="personname">[profile person name]</div><div class="organisationname">[profile organisation name]</div></div><div class="disclaimerbox">' + data.survey_disclaimtext1 + ' <a href="' + data.survey_disclaimlink + '">' + data.survey_disclaimlinktext + '</a></div></div>',
          'email_footer': '<div class="bottombar"><div class="column1">[profile contact info]div><div class="column2">[profile organisation info]</div><div class="column3"><div class="logobox"><span>logo</span></div></div></div>',
          'email_end': '</div>',

        };

      }

      // theme class
      this.surveyTheme = function() {
        //
      }


      this.init();

    }

    $(document).ready(function() {

      var datasource = {
        'datalist': surveydefault,
        //'profiles': {}, // contact profiles to use for sending
        //'themes': {}, // themes for this survey
      };

      var surveyboard = new surveyEngine(datasource);

  		surveyboard.previewSurvey(2);

  		$('body').on('click touchstart', '#datalist .entry button.view', function() {
        let row =$(this).closest('tr').data('nr');
        surveyboard.previewSurvey(row);
      });
  		$('body').on('click touchstart', '#datalist .entry button.edit', function() {
        let row =$(this).closest('tr').data('nr');
        surveyboard.editSurvey(row);
      });

    });

  });
