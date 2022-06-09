jQuery(function($){

    var surveyData;

    getSurveyDataTable = function( container ){

        $.ajax({
            type: 'POST',
            url: 'classes/datasurvey.php',
            //data: {json: JSON.stringify(json_data)},
            dataType: 'json',
        }).done( function( data ) {

            console.log('done');
            //console.log(data);

            var fielddata = '';
            var textdata = '';

            if( data['fields']){

                surveyData = [];
								let fields = data['fields'];
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

            }

            console.log(surveyData);

            container.html('<table id="surveylist">'+fielddata + '' +textdata +'</table>');

        })
        .fail( function( data ) {
            console.log('fail');
            console.log(data);
        });
    }

		saveSurveyData = function( tosave ){

			var senddata =  { 'data': tosave, 'action': 'save' };
      console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: 'classes/datasurvey.php',
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
					console.log('done');
			})
			.fail( function( data ) {
					console.log('fail');
			});

		}

    copySurveyData = function( tocopy ){

			var senddata =  { 'data': tocopy, 'action': 'copy' };
      console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: 'classes/datasurvey.php',
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#surveylist').parent();
        getSurveyDataTable( container );
				console.log('copied');
			})
			.fail( function( data ) {
					console.log('failed to copy');
			});

		}

    deleteSurveyData = function( todelete ){

			var senddata =  { 'data': todelete, 'action': 'delete' };
      console.log( senddata.data );
			$.ajax({
					type: 'POST',
					url: 'classes/datasurvey.php',
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#surveylist').parent();
        getSurveyDataTable( container );
				console.log('deleted');
			})
			.fail( function( data ) {
					console.log('failed to delete');
			});

		}

    newSurveyData = function(){

			var senddata =  { 'data': {}, 'action': 'new' };
			$.ajax({
					type: 'POST',
					url: 'classes/datasurvey.php',
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
        // reload table
        let container = $('#surveylist').parent();
        getSurveyDataTable( container );
				console.log('new survey added');
			})
			.fail( function( data ) {
					console.log('failed to create new survey');
			});

		}


    function viewSurvey(row){

      let cnt = 'view: '+surveyData[row]['id'];
      addOverlay('surveyview', cnt);

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


    /* global */
    var pagelayers = [];

    function addOverlay( id, content = 'Oooops something is missing..' )
    {

      let layer = $('<div id="'+id+'" style="display:none;" class="overLayScreen"><div class="framecontainer outermargin"><div class="contentbox">'+content+'</div><button type=button class="closeOverlay"><span>close</span></button></div></div>');

      if( $('body').find('.overLayScreen').length > 0){
        $('body').find('.overLayScreen').fadeOut(500, function(){
          $(this).remove();
          $('body').append(layer);
          layer.fadeIn(500);
        });
      }else{
        $('body').append(layer);
        layer.fadeIn(500);
      }

    }

    function removeOverlay(){
      $('body').find('.overLayScreen').fadeOut(500, function(){
        $(this).remove();
      });
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


});
