/**/
var surveyEngine = function( src ) {

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
            'mode': 'preview', // edit, preview/test, preview email, send
            'boxid': 'surveycontainer', // html parent element the survey goes into
          };

          var types = {
            '0': 'polar', // var1 | var2
            '1': 'choice',// var1 or var2 or var3
            '2': 'range', // between var1 and var2
            '3': 'value', // select value between var1 to var10
            '4': 'multi', // select multiple options (checkbox)
            '5': 'open'		// input text (min max chars.)
          };

          this.init = function() {

            $.extend(source, src);
            if (source.datalist != {}) {
              this.surveyData();
            }
						// else find default data

          };

          // preview
          this.previewSurvey = function() {

					}

          // data collect
          this.surveyData = function() {

            // testdata console.log(JSON.stringify(source.datalist));
						let container = $('#'+settings.boxid);

						let html = {};
						$.each( source.datalist, function( idx, data){

							if( data.json.length > 0 ){
								container.append(JSON.stringify(data.json));
							}

							let survey = root.surveyDataToHTML(data);

						});

          }

					// theme class
          this.surveyDataToHTML = function( data ) {

						/*
						rownr
						id
						title
						subtitle
						des
						email_salut
						email_regards
						email_text
						email_surveyintro
						email_end
						intro_title
						intro_text
						intro_subtext
						survey_title
						survey_start
						survey_end
						survey_help
						survey_helplink
						survey_disclaimtext1
						survey_disclaimtext2
						survey_disclaimlinktext
						survey_disclaimlink
						outro_text
						json
						*/

						let output = {

							// 'page_start'
							// 'page_top'
							// 'page_header'
							// 'page_intro'
							// 'page_survey'
							// 'page_footer'
							// 'page_end'

							// 'email_start'
							// 'email_top'
							// 'email_header'
							// 'email_intro'
							// 'email_survey'
							// 'email_footer'
							// 'email_end'

							// 'edit_start'
							// 'edit_top'
							// 'edit_header'
							// 'edit_intro'
							// 'edit_survey'
							// 'edit_footer'
							// 'edit_end'

						};


						if( data.json.length > 0 ){
						}



          }

          // theme class
          this.surveyTheme = function() {
            //
          }


          this.init();

        }

        /*
        $(document).ready(function() {

          var datasource = {
            'datalist': surveydefault,
            //'profiles': {}, // contact profiles to use for sending
            //'themes': {}, // themes for this survey
          };

          var surveyboard = new surveyEngine(datasource);


        });
        */

});
