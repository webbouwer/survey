
jQuery(function($){

    getConfigDataTable = function( container ){

        $.ajax({
            type: 'POST',
            url: 'classes/dataconfig.php',
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
                        /*$.each(obj, function(fkey, fieldname) {
                            fielddata += fieldname+' ';
                        });
                        fielddata += '<br />';*/
                    }else{

                        $.each(obj, function( key, value) {
                            textdata += '<div id="nr'+idx+'" class="entry"><div class="element" data-nr="'+idx+'" data-field="'+key+'">'+fields[key]+': <span class="inputbox">'+value+'</span></div></div>';
                        });
                    }

                });
            }

            container.html('<div id="configlist">'+fielddata + '' +textdata+'</div><a href="../logout.php">logout</a>');

        })
        .fail( function( data ) {
            console.log('fail');
            console.log(data);
        });
    }

		saveConfigData = function( tosave ){

			//alert( JSON.stringify( tosave ) );

			var senddata =  { 'data': tosave, 'action': 'save' };
			$.ajax({
					type: 'POST',
					url: 'classes/dataconfig.php',
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

    //getConfigDataTable( $('body') );



		$('body').on('click', '#configlist .inputbox:not(.edit)', function() {

	    let txt = $(this).html().trim();
	    let inp = $('<input class="textinput" type="text" value="' + txt + '" />');

	    $(this).addClass('edit');
	    $(this).html(inp);
			$('body').find('#configlist .inputbox.edit input.textinput').select();
	  });

	  $('body').on('blur', '#configlist .inputbox.edit input.textinput', function() {
	    let txt = $(this).val();
			let toSave = { 'nr': $(this).parent().parent().data('nr'), 'field': $(this).parent().parent().data('field'), 'content': txt };
			saveConfigData( toSave );
	    $(this).parent().removeClass('edit').html(txt);
	  });


});
