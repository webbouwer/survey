jQuery(function($){

    getSurveyDataTable = function( container ){

        $.ajax({
            type: 'POST',
            url: 'classes/data.php',
            //data: {json: JSON.stringify(json_data)},
            dataType: 'json',
        }).done( function( data ) {

            console.log('done');
            console.log(data);

            var fielddata = '';
            var textdata = '';

            if( data['fields']){

								let fields = data['fields'];
                $.each(data, function(idx, obj) {

                    if(idx == 'fields'){
                        let fieldrow = '';
                        $.each(obj, function(fkey, fieldname) {
                          if( fkey != 'json')
                            fieldrow += '<th class="fieldname">'+fieldname+'</th>';
                        });
                        fielddata += '<tr class="fieldrow">'+fieldrow+'<th>Actions</th></tr>';
                    }else{
                        textdata += '<tr id="nr'+idx+'" class="entry">';
                        $.each(obj, function( key, value) {
                          if( key != 'json')
                            textdata += '<td class="element" data-nr="'+idx+'" data-field="'+key+'"><span class="inputbox">'+value+'</span></td>';
                        });
                        textdata += '<td>view | copy | delete</td></tr>';
                    }

                });

            }

            container.html('<table id="surveylist">'+fielddata + '' +textdata +'</table>');

        })
        .fail( function( data ) {
            console.log('fail');
            console.log(data);
        });
    }

		saveSurveyData = function( tosave ){

			//alert( JSON.stringify( tosave ) );

			var senddata =  { 'data': tosave, 'action': 'save' };

      console.log( senddata.data );

			$.ajax({
					type: 'POST',
					url: 'classes/data.php',
					data: senddata,
					dataType: 'json',
			}).done( function( data ) {
					console.log('done');
					//console.log(data);
					//displayList(data); //(for admins)
					//alert( JSON.stringify( data ) );

			})
			.fail( function( data ) {
					console.log('fail');
					//console.log(data);
			});

		}



		$('body').on('click', '#surveylist .inputbox:not(.edit)', function() {

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
	  });


});
