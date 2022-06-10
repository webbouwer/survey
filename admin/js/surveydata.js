/*
 * #surveylist
 * JQuery
 * util/js/pagelayers.js
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
jQuery(function($){

    $(document).ready(function(){

    var surveyData;

    var surveyDataUrl = 'classes/datasurvey.php'; // protected

    getSurveyDataTable = function( container = false ){

        $.ajax({
            type: 'POST',
            url: surveyDataUrl,
            //data: {json: JSON.stringify(json_data)},
            dataType: 'json',

        }).done( function( data ) {

            //console.log('done');
            //console.log(data);

            var fielddata = '';
            var textdata = '';

            if( data['fields'] ){

                surveyData = [];
								let fields = data['fields'];
                surveyData['fields'] = fields;
                $.each(data, function(idx, obj) {

                    surveyData[idx] = [];

                    if(idx == 'fields'){
                        let fieldrow = ''; // header columns
                        $.each(obj, function(fkey, fieldname) {
                          if( fkey == 'id' || fkey == 'title' || fkey == 'desc')
                            fieldrow += '<th class="fieldname">'+fieldname+'</th>';
                        });
                        fielddata += '<tr class="fieldrow">'+fieldrow+'';
                        fielddata += '<th><button type="button" class="small new">Add new</button></th>';
                        fielddata += '</tr>';
                    }else{
                        textdata += '<tr id="nr'+idx+'" data-nr="'+idx+'" class="entry">'; // data columns
                        $.each(obj, function( key, value) {
                          surveyData[idx][key] = value;
                          if( key == 'id' || key == 'title' || key == 'desc')
                            textdata += '<td class="element" data-nr="'+idx+'" data-field="'+key+'"><span class="inputbox">'+value+'</span></td>';
                        });
                        textdata += '<td><button type="button" class="small view">view</button>';
                        textdata += '<button type="button" class="small copy">copy</button>';
                        textdata += '<button type="button" class="small delete">delete</button></td>';
                        textdata += '</tr>';
                    }

                });
                if( !container ){
                  //console.log(surveyData);
                  return surveyData;
                }else{
                  container.html('<table id="surveylist">'+fielddata + '' +textdata +'</table>');
                }

            }

        })
        .fail( function( data ) {
            console.log('failed to collect data');
            //console.log(data);
        });
    }

		function saveSurveyData( tosave ){

			var senddata =  { 'data': tosave, 'action': 'save' };
      //console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: surveyDataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
					//console.log('done');
			})
			.fail( function( data ) {
					console.log('failed to save data');
			});

		}

    function copySurveyData( tocopy ){

			var senddata =  { 'data': tocopy, 'action': 'copy' };
      //console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: surveyDataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#surveylist').parent();
        getSurveyDataTable( container );
				//console.log('copied');
			})
			.fail( function( data ) {
					console.log('failed to copy');
			});

		}

    function deleteSurveyData( todelete ){

			var senddata =  { 'data': todelete, 'action': 'delete' };
      //console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: surveyDataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#surveylist').parent();
        getSurveyDataTable( container );
				//console.log('deleted');
			})
			.fail( function( data ) {
					console.log('failed to delete');
			});

		}

    function newSurveyData(){

			var senddata =  { 'data': {}, 'action': 'new' };
			$.ajax({
					type: 'POST',
					url: surveyDataUrl,
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#surveylist').parent();
        getSurveyDataTable( container );
				//console.log('new survey added');
			})
			.fail( function( data ) {
					console.log('failed to create new survey');
			});

		}


    function editSurvey( idx ){

      var fields = surveyData['fields'];
      var row = surveyData[idx];

      let html = '<div id="editbox">';

      html += '<div class="title">'+fields['title']+':'+row.title+'</div>';

      let json = JSON.parse(row['json']); //JSON.stringify();

      $.each(json, function( key, value) {

        html += '<div id="nr'+idx+'" class="entry"><div class="element" data-nr="'+idx+'" data-field="'+key+'">'+key+': <span class="inputbox">'+JSON.stringify(value)+'</span></div></div>';

      });
      html += '</div>';
      return html;
    }


    function viewSurvey(rowid){

      let survey = editSurvey( rowid )
      addOverlay('surveyview', survey);

    }

    function copySurvey(row){
      var dialog = confirm('copy: '+surveyData[row]['id']+'?');
      if (dialog) {
        let toCopy = { 'nr': row };
  			copySurveyData( toCopy );
      }
    }

    function deleteSurvey(row){
      var dialog = confirm('delete: '+surveyData[row]['id']+'?');
      if (dialog) {
        let toDelete = { 'nr': row };
        deleteSurveyData( toDelete );
      }
    }





    // inline edit
		$('body').on('click touchstart', '#surveylist .inputbox:not(.edit)', function() {

	    let txt = $(this).html().trim();
	    let inp = $('<input class="textinput" type="text" value="' + txt + '" />');

	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#surveylist .inputbox.edit input.textinput').select();
	  });

	  $('body').on('blur', '#surveylist .inputbox.edit input.textinput', function() {
	    let txt = $(this).val();
			let toSave = { 'nr': $(this).parent().parent().data('nr'), 'field': $(this).parent().parent().data('field'), 'content': txt };
			saveSurveyData( toSave );
	    $(this).parent().removeClass('edit').html(txt);

      if( toSave.field == 'id'){ //id changed
        let container = $('#surveylist').parent();
        setTimeout( function(){
          getSurveyDataTable( container );
        }, 10);
      }

	  });

    $('body').on('keyup','#surveylist .inputbox.edit input.textinput',function(){ // selector ? [contenteditable=true]
        if(event.keyCode==13){
            $(this).blur();
        }
    });

    $('body').on('click touchstart', '#surveylist .entry button.view', function() {
      let row =$(this).closest('tr').data('nr');
      viewSurvey(row);
    });

    $('body').on('click touchstart', '#surveylist .entry button.copy', function() {
      let row =$(this).closest('tr').data('nr');
      copySurvey(row);
    });

    $('body').on('click touchstart', '#surveylist .entry button.delete', function() {
      let row =$(this).closest('tr').data('nr');
      deleteSurvey(row);
    });

    $('body').on('click touchstart', '#surveylist button.new', function() {
      newSurveyData();
    });




    $('body').on('click touchstart', '.closeOverlay', function() {
      removeOverlay();
    });

  }); // end ready

});
